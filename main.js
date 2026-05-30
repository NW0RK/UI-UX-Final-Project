import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { spawn, execFile } from 'child_process';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow = null;
const activeGames = new Map();

// --- SteamGridDB Configuration ---
const BUILTIN_API_KEY = '2c62a4e1707f21a61e1bd30f4eafd6dc';
const getConfigPath = () => path.join(app.getPath('userData'), 'nexus-config.json');
const getArtworkCacheDir = () => {
  const dir = path.join(app.getPath('userData'), 'artwork');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
};

function getApiKeyFromConfig() {
  try {
    const configPath = getConfigPath();
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      if (config.steamgriddbApiKey) return config.steamgriddbApiKey;
    }
  } catch (e) { /* ignore */ }
  return BUILTIN_API_KEY;
}

function steamgriddbFetch(endpoint) {
  return new Promise((resolve, reject) => {
    const apiKey = getApiKeyFromConfig();
    const url = `https://www.steamgriddb.com/api/v2${endpoint}`;
    const req = https.get(url, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.success) resolve(parsed);
          else reject(new Error(parsed.errors?.[0] || 'API error'));
        } catch (e) {
          reject(new Error('Invalid API response'));
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(10000, () => { req.destroy(); reject(new Error('Request timeout')); });
  });
}

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(destPath);
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(destPath); });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      reject(err);
    });
  });
}

function getGameCacheDir(gameId) {
  const dir = path.join(getArtworkCacheDir(), gameId.replace(/[^a-zA-Z0-9_-]/g, '_'));
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function getCachedArtworkPaths(gameId) {
  const cacheDir = getGameCacheDir(gameId);
  const result = {};
  const types = ['grid', 'hero', 'logo', 'icon'];
  const extensions = ['png', 'jpg', 'jpeg', 'webp'];
  for (const type of types) {
    for (const ext of extensions) {
      const filePath = path.join(cacheDir, `${type}.${ext}`);
      if (fs.existsSync(filePath)) {
        result[type] = `file://${filePath}`;
        break;
      }
    }
  }
  return Object.keys(result).length > 0 ? result : null;
}

function sanitizeForPath(str) {
  return str.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
}

// --- Window Creation ---
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    frame: false,
    backgroundColor: '#0a0a0f',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  if (process.env.NODE_ENV === 'development' || !app.isPackaged) {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));
  }

  mainWindow.on('closed', () => { mainWindow = null; });
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// --- IPC: Window Controls ---
ipcMain.on('window-minimize', () => { if (mainWindow) mainWindow.minimize(); });
ipcMain.on('window-maximize', () => {
  if (mainWindow) {
    mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
  }
});
ipcMain.on('window-close', () => { if (mainWindow) mainWindow.close(); });

ipcMain.handle('power-off', async () => {
  const command = process.platform === 'win32'
    ? { file: 'shutdown.exe', args: ['/s', '/t', '0'] }
    : process.platform === 'darwin'
      ? { file: 'osascript', args: ['-e', 'tell app "System Events" to shut down'] }
      : { file: 'shutdown', args: ['-h', 'now'] };

  return new Promise((resolve) => {
    execFile(command.file, command.args, (err) => {
      if (err) {
        console.error('Shutdown failed:', err);
        resolve({ success: false, error: err.message });
        return;
      }
      resolve({ success: true });
    });
  });
});

// --- IPC: Database ---
const getDbPath = () => path.join(app.getPath('userData'), 'nexus-ps5-db.json');

ipcMain.handle('load-database', () => {
  const dbPath = getDbPath();
  try {
    if (fs.existsSync(dbPath)) {
      return JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    }
  } catch (err) { console.error('Error loading database:', err); }
  return null;
});

ipcMain.handle('save-database', (event, data) => {
  const dbPath = getDbPath();
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
    return { success: true };
  } catch (err) {
    console.error('Error saving database:', err);
    return { success: false, error: err.message };
  }
});

// --- IPC: File Dialogs ---
ipcMain.handle('select-directory', async () => {
  if (!mainWindow) return null;
  const result = await dialog.showOpenDialog(mainWindow, { properties: ['openDirectory'] });
  return result.canceled ? null : result.filePaths[0];
});

ipcMain.handle('select-executable', async () => {
  if (!mainWindow) return null;
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [{ name: 'Executables', extensions: ['exe', 'bat', 'cmd'] }]
  });
  return result.canceled ? null : result.filePaths[0];
});

// --- IPC: Executable Scanner ---
function scanDirDepth(dirPath, currentDepth, maxDepth, filesList) {
  if (currentDepth > maxDepth) return;
  try {
    const files = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const file of files) {
      const fullPath = path.join(dirPath, file.name);
      if (file.name.startsWith('.') || ['node_modules', '$RECYCLE.BIN', 'System Volume Information', 'Windows', 'Common Files'].some(ex => file.name.includes(ex))) continue;
      if (file.isDirectory()) {
        scanDirDepth(fullPath, currentDepth + 1, maxDepth, filesList);
      } else if (file.isFile() && file.name.toLowerCase().endsWith('.exe')) {
        const nameLower = file.name.toLowerCase();
        if (['unins', 'setup', 'install', 'crash', 'unity', 'helper', 'config', 'tool', 'update', 'patcher', 'dxwebsetup', 'vcredist'].some(ex => nameLower.includes(ex))) continue;
        filesList.push({ name: path.basename(file.name, '.exe'), path: fullPath });
      }
    }
  } catch (err) { /* ignore */ }
}

ipcMain.handle('scan-executables', async (event, dirPath) => {
  const filesList = [];
  scanDirDepth(dirPath, 1, 3, filesList);
  return filesList;
});

// --- IPC: Game Launcher ---
ipcMain.handle('launch-game', (event, gameId, exePath) => {
  if (activeGames.has(gameId)) return { success: false, error: 'This game is already running!' };
  if (!fs.existsSync(exePath)) return { success: false, error: 'Executable file not found at path: ' + exePath };
  try {
    const gameDir = path.dirname(exePath);
    const child = spawn(exePath, [], { cwd: gameDir, detached: true, stdio: 'ignore' });
    child.unref();
    const startTime = Date.now();
    activeGames.set(gameId, { child, startTime });
    mainWindow.webContents.send('game-status-changed', gameId, 'running');
    child.on('exit', (code) => {
      const elapsedSeconds = Math.round((Date.now() - startTime) / 1000);
      activeGames.delete(gameId);
      if (mainWindow) mainWindow.webContents.send('game-status-changed', gameId, 'stopped', elapsedSeconds);
    });
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

// --- IPC: SteamGridDB Artwork ---
ipcMain.handle('steamgriddb-search', async (event, term) => {
  try {
    const data = await steamgriddbFetch(`/search/autocomplete/${encodeURIComponent(term)}`);
    return data.data || [];
  } catch (err) {
    return { error: err.message };
  }
});

ipcMain.handle('steamgriddb-fetch-artwork', async (event, sgdbId, gameId, gameTitle) => {
  try {
    const cacheDir = getGameCacheDir(gameId);
    const result = {};

    const types = [
      { key: 'grid', endpoint: `/grids/game/${sgdbId}?dimensions=600x900` },
      { key: 'hero', endpoint: `/heroes/game/${sgdbId}` },
      { key: 'logo', endpoint: `/logos/game/${sgdbId}` },
      { key: 'icon', endpoint: `/icons/game/${sgdbId}` }
    ];

    for (const { key, endpoint } of types) {
      const ext = 'png';
      const destPath = path.join(cacheDir, `${key}.${ext}`);

      // Skip if already cached
      if (fs.existsSync(destPath)) {
        result[key] = `file://${destPath}`;
        continue;
      }

      try {
        const apiData = await steamgriddbFetch(endpoint);
        const items = apiData.data || [];
        if (items.length > 0) {
          const url = items[0].url;
          await downloadImage(url, destPath);
          result[key] = `file://${destPath}`;
        }
      } catch (e) {
        // Silently skip artwork types that aren't available
        console.log(`No ${key} found for ${gameTitle}`);
      }
    }

    return result;
  } catch (err) {
    return { error: err.message };
  }
});

ipcMain.handle('get-cached-artwork', async (event, gameId) => {
  return getCachedArtworkPaths(gameId);
});

ipcMain.handle('save-api-key', async (event, key) => {
  try {
    const configPath = getConfigPath();
    let config = {};
    if (fs.existsSync(configPath)) config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    config.steamgriddbApiKey = key;
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

ipcMain.handle('get-api-key', async () => {
  try {
    const configPath = getConfigPath();
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      if (config.steamgriddbApiKey) return { key: config.steamgriddbApiKey, isCustom: true };
    }
  } catch (e) { /* ignore */ }
  return { key: BUILTIN_API_KEY, isCustom: false };
});
