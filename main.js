import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import fs from 'fs';
import { spawn, execFile } from 'child_process';
import https from 'https';
import { pipeline } from 'stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow = null;
const activeGames = new Map();

// --- SteamGridDB Configuration ---
const BUILTIN_API_KEY = '2c62a4e1707f21a61e1bd30f4eafd6dc';
const STEAMGRIDDB_BASE_URL = 'https://www.steamgriddb.com/api/v2';
const REQUEST_TIMEOUT_MS = 15000;
const getConfigPath = () => path.join(app.getPath('userData'), 'nexus-config.json');
const getArtworkCacheDir = () => {
  const dir = path.join(app.getPath('userData'), 'artwork');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
};

function getApiKeyFromConfig() {
  if (process.env.STEAMGRIDDB_API_KEY?.trim()) {
    return process.env.STEAMGRIDDB_API_KEY.trim();
  }

  try {
    const configPath = getConfigPath();
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      if (config.steamgriddbApiKey?.trim()) return config.steamgriddbApiKey.trim();
    }
  } catch (e) { /* ignore */ }
  return BUILTIN_API_KEY;
}

function toFileUrl(filePath) {
  return pathToFileURL(filePath).href;
}

function httpsGet(url, options = {}, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, options, (res) => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
        res.resume();
        if (redirectCount >= 4) {
          reject(new Error('Too many redirects'));
          return;
        }
        const nextUrl = new URL(res.headers.location, url).href;
        resolve(httpsGet(nextUrl, options, redirectCount + 1));
        return;
      }

      resolve(res);
    });
    req.on('error', reject);
    req.setTimeout(REQUEST_TIMEOUT_MS, () => {
      req.destroy(new Error('Request timeout'));
    });
  });
}

async function steamgriddbFetch(endpoint) {
  const apiKey = getApiKeyFromConfig();
  if (!apiKey) throw new Error('SteamGridDB API key is not configured');

  const url = `${STEAMGRIDDB_BASE_URL}${endpoint}`;
  const res = await httpsGet(url, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Accept': 'application/json',
      'User-Agent': 'NexusLauncher/1.0'
    }
  });

  return new Promise((resolve, reject) => {
    let data = '';
    res.setEncoding('utf8');
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      let parsed = null;
      try {
        parsed = data ? JSON.parse(data) : null;
      } catch (e) {
        reject(new Error(`Invalid SteamGridDB response (${res.statusCode})`));
        return;
      }

      if (res.statusCode < 200 || res.statusCode >= 300) {
        reject(new Error(parsed?.errors?.[0] || `SteamGridDB HTTP ${res.statusCode}`));
        return;
      }

      if (parsed?.success) {
        resolve(parsed);
      } else {
        reject(new Error(parsed?.errors?.[0] || 'SteamGridDB API error'));
      }
    });
    res.on('error', reject);
  });
}

function getExtensionFromArtwork(artwork) {
  const mimeExt = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/webp': 'webp',
    'image/vnd.microsoft.icon': 'ico',
    'image/x-icon': 'ico'
  };
  if (mimeExt[artwork?.mime]) return mimeExt[artwork.mime];

  try {
    const ext = path.extname(new URL(artwork.url).pathname).replace('.', '').toLowerCase();
    if (['png', 'jpg', 'jpeg', 'webp', 'ico'].includes(ext)) return ext === 'jpeg' ? 'jpg' : ext;
  } catch (e) { /* ignore */ }

  return 'png';
}

async function downloadImage(url, destPath) {
  const tmpPath = `${destPath}.download`;
  if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);

  const res = await httpsGet(url, {
    headers: { 'User-Agent': 'NexusLauncher/1.0' }
  });

  if (res.statusCode !== 200) {
    res.resume();
    throw new Error(`Image download failed with HTTP ${res.statusCode}`);
  }

  try {
    await pipeline(res, fs.createWriteStream(tmpPath));
    if (!fs.existsSync(tmpPath)) throw new Error('Downloaded image temp file was not created');
    fs.renameSync(tmpPath, destPath);
    return destPath;
  } catch (err) {
    if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
    throw err;
  }
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
  const extensions = ['png', 'jpg', 'jpeg', 'webp', 'ico'];
  for (const type of types) {
    for (const ext of extensions) {
      const filePath = path.join(cacheDir, `${type}.${ext}`);
      if (fs.existsSync(filePath)) {
        result[type] = toFileUrl(filePath);
        break;
      }
    }
  }
  return Object.keys(result).length > 0 ? result : null;
}

function sanitizeForPath(str) {
  return str.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
}

function normalizeGameTitle(title) {
  return String(title || '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/\b(goty|game of the year|complete|definitive|deluxe|ultimate|standard|edition|remastered|remake|directors cut|director's cut)\b/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function scoreSteamGridDBMatch(query, result) {
  const normalizedQuery = normalizeGameTitle(query);
  const normalizedName = normalizeGameTitle(result?.name);
  if (!normalizedQuery || !normalizedName) return 0;
  if (normalizedQuery === normalizedName) return 100;

  const queryWords = normalizedQuery.split(' ');
  const nameWords = normalizedName.split(' ');
  const querySet = new Set(queryWords);
  const nameSet = new Set(nameWords);
  const sharedWords = queryWords.filter(word => nameSet.has(word)).length;
  const coverage = sharedWords / querySet.size;
  const extraWordsPenalty = Math.max(0, nameSet.size - querySet.size) * 3;

  let score = Math.round(coverage * 70) - extraWordsPenalty;
  if (normalizedName.includes(normalizedQuery)) score += 20;
  if (normalizedQuery.includes(normalizedName)) score += 12;
  if (result?.verified) score += 6;
  if (result?.types?.includes('game')) score += 4;

  return Math.max(0, Math.min(99, score));
}

async function searchSteamGridDBGames(term) {
  const searchTerm = String(term || '').trim();
  if (!searchTerm) return [];

  const data = await steamgriddbFetch(`/search/autocomplete/${encodeURIComponent(searchTerm)}`);
  return (data.data || [])
    .map(result => ({
      ...result,
      matchScore: scoreSteamGridDBMatch(searchTerm, result)
    }))
    .sort((a, b) => b.matchScore - a.matchScore);
}

async function getSteamGridDBGameBySteamAppId(steamAppId) {
  const appId = String(steamAppId || '').trim();
  if (!/^\d+$/.test(appId)) return null;

  const data = await steamgriddbFetch(`/games/steam/${encodeURIComponent(appId)}`);
  return data.data || null;
}

function pickArtwork(items, key) {
  if (!Array.isArray(items) || items.length === 0) return null;
  const activeItems = items.filter(item => item && item.url);
  if (activeItems.length === 0) return null;

  const dimensionsByType = {
    grid: ['600x900', '342x482', '660x930'],
    hero: ['1920x620', '3840x1240'],
    logo: [],
    icon: ['512x512', '256x256', '128x128']
  };
  const preferredDimensions = dimensionsByType[key] || [];

  return [...activeItems].sort((a, b) => {
    const score = (item) => {
      let value = 0;
      if (item.style === 'alternate') value += 4;
      if (item.style === 'official') value += 3;
      if (item.verified) value += 2;
      if (item.nsfw) value -= 10;
      const dimensions = `${item.width || ''}x${item.height || ''}`;
      const dimensionIndex = preferredDimensions.indexOf(dimensions);
      if (dimensionIndex !== -1) value += 10 - dimensionIndex;
      return value;
    };
    return score(b) - score(a);
  })[0];
}

async function fetchArtworkForGame(sgdbId, gameId, gameTitle) {
  const cacheDir = getGameCacheDir(gameId);
  const result = {};

  const types = [
    { key: 'grid', endpoint: `/grids/game/${sgdbId}?dimensions=600x900,342x482,660x930&types=static` },
    { key: 'hero', endpoint: `/heroes/game/${sgdbId}?types=static` },
    { key: 'logo', endpoint: `/logos/game/${sgdbId}?types=static` },
    { key: 'icon', endpoint: `/icons/game/${sgdbId}` }
  ];

  for (const { key, endpoint } of types) {
    try {
      const cached = getCachedArtworkPaths(gameId);
      if (cached?.[key]) {
        result[key] = cached[key];
        continue;
      }

      const apiData = await steamgriddbFetch(endpoint);
      const artwork = pickArtwork(apiData.data, key);
      if (!artwork) continue;

      const ext = getExtensionFromArtwork(artwork);
      const destPath = path.join(cacheDir, `${key}.${ext}`);
      await downloadImage(artwork.url, destPath);
      result[key] = toFileUrl(destPath);
    } catch (e) {
      console.log(`SteamGridDB ${key} unavailable for ${gameTitle}: ${e.message}`);
    }
  }

  return result;
}

async function findSteamGridDBGame(term) {
  const results = await searchSteamGridDBGames(term);
  return results.find(result => result.matchScore >= 45) || results[0] || null;
}

async function resolveSteamGridDBGame(game) {
  if (game?.steamGridDbId && !game.forceTitleLookup) {
    return { id: game.steamGridDbId, name: game.steamGridDbName || game.title };
  }

  if (game?.steamAppId) {
    try {
      const match = await getSteamGridDBGameBySteamAppId(game.steamAppId);
      if (match?.id) return { ...match, matchSource: 'steamAppId' };
    } catch (err) {
      console.log(`SteamGridDB Steam AppID lookup failed for ${game.title || game.steamAppId}: ${err.message}`);
    }
  }

  return await findSteamGridDBGame(game?.title);
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

function parseSteamAppManifest(filePath, steamappsDir) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const appid = content.match(/"appid"\s+"(\d+)"/)?.[1];
    const name = content.match(/"name"\s+"([^"]+)"/)?.[1];
    const installdir = content.match(/"installdir"\s+"([^"]+)"/)?.[1];
    if (!appid || !installdir) return null;

    return {
      appid,
      name,
      installPath: path.join(steamappsDir, 'common', installdir).toLowerCase()
    };
  } catch (err) {
    return null;
  }
}

function findSteamAppManifests(scanRoot) {
  const candidates = new Set();
  const root = path.resolve(scanRoot);
  const rootBase = path.basename(root).toLowerCase();

  if (rootBase === 'common') candidates.add(path.dirname(root));
  if (rootBase === 'steamapps') candidates.add(root);
  candidates.add(path.join(root, 'steamapps'));
  candidates.add(path.join(path.dirname(root), 'steamapps'));

  const manifests = [];
  for (const steamappsDir of candidates) {
    try {
      if (!fs.existsSync(steamappsDir)) continue;
      const files = fs.readdirSync(steamappsDir).filter(file => /^appmanifest_\d+\.acf$/i.test(file));
      for (const file of files) {
        const manifest = parseSteamAppManifest(path.join(steamappsDir, file), steamappsDir);
        if (manifest) manifests.push(manifest);
      }
    } catch (err) { /* ignore */ }
  }

  return manifests;
}

function attachSteamAppIds(filesList, manifests) {
  if (!manifests.length) return filesList;

  return filesList.map(file => {
    const normalizedPath = file.path.toLowerCase();
    const match = manifests.find(manifest => normalizedPath.startsWith(manifest.installPath));
    return match ? { ...file, steamAppId: match.appid, steamName: match.name } : file;
  });
}

ipcMain.handle('scan-executables', async (event, dirPath) => {
  const filesList = [];
  scanDirDepth(dirPath, 1, 3, filesList);
  return attachSteamAppIds(filesList, findSteamAppManifests(dirPath));
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
    return await searchSteamGridDBGames(term);
  } catch (err) {
    return { error: err.message };
  }
});

ipcMain.handle('steamgriddb-fetch-artwork', async (event, sgdbId, gameId, gameTitle) => {
  try {
    return await fetchArtworkForGame(sgdbId, gameId, gameTitle);
  } catch (err) {
    return { error: err.message };
  }
});

ipcMain.handle('steamgriddb-auto-fetch-artwork', async (event, game) => {
  try {
    if (!game?.id || !game?.title) {
      return { error: 'Missing game id or title' };
    }

    const match = await resolveSteamGridDBGame(game);

    if (!match?.id) {
      return { error: `No SteamGridDB match found for ${game.title}` };
    }

    const artwork = await fetchArtworkForGame(match.id, game.id, game.title);
    if (Object.keys(artwork).length === 0) {
      return { error: `No downloadable artwork found for ${game.title}` };
    }

    return {
      ...artwork,
      steamGridDbId: match.id,
      steamGridDbName: match.name,
      steamAppId: game.steamAppId || null,
      matchScore: match.matchScore
    };
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
    if (key?.trim()) {
      config.steamgriddbApiKey = key.trim();
    } else {
      delete config.steamgriddbApiKey;
    }
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

ipcMain.handle('get-api-key', async () => {
  if (process.env.STEAMGRIDDB_API_KEY?.trim()) {
    return { key: process.env.STEAMGRIDDB_API_KEY.trim(), isCustom: true };
  }

  try {
    const configPath = getConfigPath();
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      if (config.steamgriddbApiKey?.trim()) return { key: config.steamgriddbApiKey.trim(), isCustom: true };
    }
  } catch (e) { /* ignore */ }
  return { key: BUILTIN_API_KEY, isCustom: false };
});
