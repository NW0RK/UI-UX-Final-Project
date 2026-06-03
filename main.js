import { app, BrowserWindow, ipcMain, dialog, protocol, net, session } from 'electron';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import fs from 'fs';
import os from 'os';
import { spawn, execFile, exec } from 'child_process';
import https from 'https';
import { pipeline } from 'stream/promises';
import sharp from 'sharp';
import { 
  trimTransparentPadding, 
  trimCachedLogoArtworkForDatabase 
} from './deprecated_features/imageTrimming.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ARTWORK_PROTOCOL = 'nexus-artwork';

let mainWindow = null;
const activeGames = new Map();
let hltbSecurity = null;
// DEPRECATED: artworkTrimJobs Map is disabled.
// const artworkTrimJobs = new Map();

function emitDiagnostic(area, level, message, details = null) {
  const payload = {
    area,
    level,
    message,
    details,
    timestamp: new Date().toISOString()
  };

  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('diagnostic-event', payload);
  }

  const prefix = `[${payload.timestamp}] [${area}] [${level}]`;
  if (level === 'error') {
    console.error(prefix, message, details || '');
  } else if (level === 'warn') {
    console.warn(prefix, message, details || '');
  } else {
    console.log(prefix, message, details || '');
  }
}

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

function toArtworkUrl(filePath) {
  const artworkDir = getArtworkCacheDir();
  const relativePath = path.relative(artworkDir, filePath).replace(/\\/g, '/');
  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) return toFileUrl(filePath);
  return `${ARTWORK_PROTOCOL}:///${relativePath.split('/').map(encodeURIComponent).join('/')}`;
}

function normalizeArtworkUrl(value) {
  if (typeof value !== 'string' || !value.startsWith('file://')) return value;

  try {
    const filePath = fileURLToPath(value);
    const artworkDir = getArtworkCacheDir();
    const relativePath = path.relative(artworkDir, filePath);
    if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) return value;
    return toArtworkUrl(filePath);
  } catch (e) {
    return value;
  }
}

function normalizeArtworkUrlsInGame(game) {
  if (!game || typeof game !== 'object') return game;
  return {
    ...game,
    coverUrl: normalizeArtworkUrl(game.coverUrl),
    bannerUrl: normalizeArtworkUrl(game.bannerUrl),
    logoUrl: normalizeArtworkUrl(game.logoUrl),
    iconUrl: normalizeArtworkUrl(game.iconUrl)
  };
}

function normalizeArtworkUrlsInDatabase(data) {
  if (!Array.isArray(data)) return data;
  return data.map(normalizeArtworkUrlsInGame);
}

function registerArtworkProtocol() {
  protocol.handle(ARTWORK_PROTOCOL, async (request) => {
    try {
      const url = new URL(request.url);
      const requestPath = decodeURIComponent(`${url.hostname}${url.pathname}`.replace(/^\/+/, ''));
      const artworkDir = getArtworkCacheDir();
      const filePath = path.resolve(artworkDir, requestPath);
      const relativePath = path.relative(artworkDir, filePath);

      if (relativePath.startsWith('..') || path.isAbsolute(relativePath) || !fs.existsSync(filePath)) {
        return new Response('Artwork not found', { status: 404 });
      }

      return net.fetch(pathToFileURL(filePath).toString());
    } catch (err) {
      emitDiagnostic('Artwork', 'error', `Artwork protocol failed: ${err.message}`);
      return new Response('Artwork protocol error', { status: 500 });
    }
  });
}

protocol.registerSchemesAsPrivileged([
  { scheme: ARTWORK_PROTOCOL, privileges: { standard: true, secure: true, supportFetchAPI: true, stream: true } }
]);

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

function fetchJson(url, options = {}) {
  return httpsGet(url, options).then(res => {
    return new Promise((resolve, reject) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(data ? JSON.parse(data) : null);
        } catch (e) {
          reject(new Error(`Failed to parse JSON response: ${e.message}`));
        }
      });
      res.on('error', reject);
    });
  });
}

function postJson(url, payload, headers = {}) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);
    const target = new URL(url);
    const req = https.request({
      protocol: target.protocol,
      hostname: target.hostname,
      path: `${target.pathname}${target.search}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        ...headers
      },
      timeout: REQUEST_TIMEOUT_MS
    }, (res) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        let parsed = null;
        try {
          parsed = data ? JSON.parse(data) : null;
        } catch (e) {
          reject(new Error(`Failed to parse JSON response: ${e.message}`));
          return;
        }

        if (res.statusCode < 200 || res.statusCode >= 300) {
          reject(new Error(parsed?.message || `HTTP ${res.statusCode}`));
          return;
        }

        resolve(parsed);
      });
      res.on('error', reject);
    });

    req.on('error', reject);
    req.on('timeout', () => req.destroy(new Error('Request timeout')));
    req.write(body);
    req.end();
  });
}

async function steamgriddbFetch(endpoint) {
  const apiKey = getApiKeyFromConfig();
  if (!apiKey) throw new Error('SteamGridDB API key is not configured');

  const url = `${STEAMGRIDDB_BASE_URL}${endpoint}`;
  emitDiagnostic('SteamGridDB', 'info', `Requesting ${endpoint}`);
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

// DEPRECATED: Image trimming functions are removed.
// Original functions (trimTransparentPadding, trimTransparentPaddingUnsafe) have been archived
// in './deprecated_features/imageTrimming.js'. Refer to deprecated_features/README.md for details.

function getGameCacheDir(gameId) {
  const dir = path.join(getArtworkCacheDir(), gameId.replace(/[^a-zA-Z0-9_-]/g, '_'));
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function getCachedArtworkPaths(gameId) {
  const cacheDir = getGameCacheDir(gameId);
  const result = {};
  const types = ['grid', 'hero', 'logo', 'icon'];
  for (const type of types) {
    const filePath = getCachedArtworkFilePath(gameId, type);
    if (filePath) {
      result[type] = toArtworkUrl(filePath);
    }
  }
  return Object.keys(result).length > 0 ? result : null;
}

function getCachedArtworkFilePath(gameId, type) {
  const cacheDir = getGameCacheDir(gameId);
  const extensions = ['png', 'jpg', 'jpeg', 'webp', 'ico'];
  if (type === 'logo' || type === 'icon') {
    for (const ext of extensions) {
      const filePath = path.join(cacheDir, `${type}.trimmed.${ext}`);
      if (fs.existsSync(filePath)) return filePath;
    }
  }
  for (const ext of extensions) {
    const filePath = path.join(cacheDir, `${type}.${ext}`);
    if (fs.existsSync(filePath)) return filePath;
  }
  return null;
}

// DEPRECATED: trimCachedLogoArtworkForGame and trimCachedLogoArtworkForDatabase are removed.
// These functions have been archived in './deprecated_features/imageTrimming.js'.

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

function normalizeHltbRawGame(raw, searchTerm = '') {
  const id = raw?.game_id;
  const name = raw?.game_name;
  if (!id || !name) return null;
  return {
    id: String(id),
    name,
    sourceUrl: `https://howlongtobeat.com/game/${id}`,
    mainStoryHours: raw.comp_main ? Number((raw.comp_main / 3600).toFixed(1)) : 0,
    mainExtraHours: raw.comp_plus ? Number((raw.comp_plus / 3600).toFixed(1)) : 0,
    completionistHours: raw.comp_100 ? Number((raw.comp_100 / 3600).toFixed(1)) : 0,
    similarity: scoreHowLongToBeatMatch(searchTerm, raw),
    searchTerm,
    fetchedAt: new Date().toISOString(),
    source: 'howlongtobeat-bleed'
  };
}

const SEEDED_HLTB_BY_KEY = {
  cyberpunk: { id: '2127', name: 'Cyberpunk 2077', mainStoryHours: 25, mainExtraHours: 64, completionistHours: 105 },
  cyberpunk2077: { id: '2127', name: 'Cyberpunk 2077', mainStoryHours: 25, mainExtraHours: 64, completionistHours: 105 },
  dyinglight: { id: '18336', name: 'Dying Light', mainStoryHours: 17.5, mainExtraHours: 36.5, completionistHours: 58 },
  eldenring: { id: '68151', name: 'Elden Ring', mainStoryHours: 59, mainExtraHours: 100, completionistHours: 133 },
  hades: { id: '62941', name: 'Hades', mainStoryHours: 23, mainExtraHours: 49, completionistHours: 95 },
  portal2: { id: '7231', name: 'Portal 2', mainStoryHours: 8.5, mainExtraHours: 13.5, completionistHours: 21.5 },
  witcher3: { id: '10270', name: 'The Witcher 3: Wild Hunt', mainStoryHours: 51.5, mainExtraHours: 103, completionistHours: 173 },
  thewitcher3wildhunt: { id: '10270', name: 'The Witcher 3: Wild Hunt', mainStoryHours: 51.5, mainExtraHours: 103, completionistHours: 173 }
};

function normalizeSeedKey(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

function getSeededHowLongToBeat(game) {
  const seed = SEEDED_HLTB_BY_KEY[normalizeSeedKey(game?.id)] || SEEDED_HLTB_BY_KEY[normalizeSeedKey(game?.title)];
  if (!seed) return null;
  return {
    ...seed,
    sourceUrl: `https://howlongtobeat.com/game/${seed.id}`,
    similarity: 1,
    searchTerm: game?.title || seed.name,
    fetchedAt: new Date().toISOString(),
    source: 'seeded-hltb'
  };
}

const HLTB_BASE_URL = 'https://howlongtobeat.com';
const HLTB_HEADERS = {
  'Accept': 'application/json',
  'Origin': HLTB_BASE_URL,
  'Referer': `${HLTB_BASE_URL}/`,
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
};

async function getHowLongToBeatSecurity(forceRefresh = false) {
  if (!forceRefresh && hltbSecurity?.token && hltbSecurity.expiresAt > Date.now()) {
    return hltbSecurity;
  }

  const security = await fetchJson(`${HLTB_BASE_URL}/api/bleed/init?t=${Date.now()}`, { headers: HLTB_HEADERS });
  if (!security?.token || !security?.hpKey || !security?.hpVal) {
    throw new Error('Invalid HowLongToBeat security response');
  }

  hltbSecurity = {
    token: security.token,
    hpKey: security.hpKey,
    hpVal: security.hpVal,
    expiresAt: Date.now() + 45 * 60 * 1000
  };
  return hltbSecurity;
}

function createHowLongToBeatSearchPayload(searchTerm, security) {
  const payload = {
    searchType: 'games',
    searchTerms: searchTerm.trim().split(/\s+/),
    searchPage: 1,
    size: 20,
    searchOptions: {
      games: {
        userId: 0,
        platform: '',
        sortCategory: 'popular',
        rangeCategory: 'main',
        rangeTime: { min: 0, max: 0 },
        gameplay: { perspective: '', flow: '', genre: '', difficulty: '' },
        rangeYear: { min: '', max: '' },
        modifier: ''
      },
      users: { sortCategory: 'postcount' },
      lists: { sortCategory: 'follows' },
      filter: '',
      sort: 0,
      randomizer: 0
    },
    useCache: true
  };

  payload[security.hpKey] = security.hpVal;
  return payload;
}

async function postHowLongToBeatSearch(searchTerm, forceRefresh = false) {
  const security = await getHowLongToBeatSecurity(forceRefresh);
  return await postJson(`${HLTB_BASE_URL}/api/bleed`, createHowLongToBeatSearchPayload(searchTerm, security), {
    ...HLTB_HEADERS,
    'x-auth-token': security.token,
    'x-hp-key': security.hpKey,
    'x-hp-val': security.hpVal
  });
}

function scoreHowLongToBeatMatch(query, raw) {
  const normalizedQuery = normalizeGameTitle(query);
  const names = [raw?.game_name, raw?.game_alias]
    .filter(Boolean)
    .flatMap(value => String(value).split(','))
    .map(normalizeGameTitle)
    .filter(Boolean);
  if (!normalizedQuery || names.length === 0) return 0;

  let best = 0;
  for (const normalizedName of names) {
    if (normalizedName === normalizedQuery) {
      best = Math.max(best, 1);
      continue;
    }

    const queryWords = normalizedQuery.split(' ');
    const nameSet = new Set(normalizedName.split(' '));
    const sharedWords = queryWords.filter(word => nameSet.has(word)).length;
    const coverage = sharedWords / queryWords.length;
    const containsBoost = normalizedName.includes(normalizedQuery) || normalizedQuery.includes(normalizedName) ? 0.2 : 0;
    best = Math.max(best, Math.min(0.99, coverage * 0.75 + containsBoost));
  }

  return Number(best.toFixed(2));
}

async function searchHowLongToBeatGames(term) {
  const searchTerm = String(term || '').trim();
  if (!searchTerm) return [];

  emitDiagnostic('HowLongToBeat', 'info', `Searching HLTB for "${searchTerm}"`);
  let searchData = await postHowLongToBeatSearch(searchTerm);
  if (searchData?.error || !Array.isArray(searchData?.data)) {
    searchData = await postHowLongToBeatSearch(searchTerm, true);
  }
  return (Array.isArray(searchData?.data) ? searchData.data : [])
    .map(result => normalizeHltbRawGame(result, searchTerm))
    .filter(Boolean)
    .sort((a, b) => b.similarity - a.similarity);
}

async function autoFetchHowLongToBeat(game) {
  if (!game?.title) {
    return { error: 'Missing game title' };
  }

  let results = [];
  try {
    results = await searchHowLongToBeatGames(game.title);
  } catch (err) {
    const seeded = getSeededHowLongToBeat(game);
    if (seeded) {
      emitDiagnostic('HowLongToBeat', 'warn', `Live lookup failed for ${game.title}; using seeded HLTB data`, { error: err.message });
      return seeded;
    }
    throw err;
  }

  if (results.length === 0) {
    return getSeededHowLongToBeat(game) || { error: `No HowLongToBeat match found for ${game.title}` };
  }

  const match = results.find(result => result.similarity >= 0.45) || results[0];
  if (!match || match.similarity < 0.25) {
    return getSeededHowLongToBeat(game) || { error: `No confident HowLongToBeat match found for ${game.title}` };
  }

  emitDiagnostic('HowLongToBeat', 'info', `Matched ${game.title} to ${match.name}`, {
    hltbId: match.id,
    similarity: match.similarity
  });
  return match;
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
  const result = { diagnostics: [] };
  const addDiagnostic = (level, message, details = null) => {
    result.diagnostics.push({ area: 'SteamGridDB', level, message, details, timestamp: new Date().toISOString() });
    emitDiagnostic('SteamGridDB', level, message, details);
  };

  addDiagnostic('info', `Fetching artwork for ${gameTitle}`, { sgdbId, gameId });

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
        let cachedFilePath = getCachedArtworkFilePath(gameId, key);
        if ((key === 'logo' || key === 'icon') && cachedFilePath) {
          try {
            const trimDetails = await trimTransparentPadding(cachedFilePath);
            if (trimDetails?.filePath) cachedFilePath = trimDetails.filePath;
            if (trimDetails && !trimDetails.alreadyTrimmed) {
              addDiagnostic('info', `Trimmed transparent padding from cached ${key} artwork for ${gameTitle}`, trimDetails);
            }
          } catch (trimError) {
            addDiagnostic('warn', `Could not trim cached ${key} artwork for ${gameTitle}: ${trimError.message}`);
          }
        }
        result[key] = cachedFilePath ? toArtworkUrl(cachedFilePath) : cached[key];
        addDiagnostic('info', `Using cached ${key} artwork for ${gameTitle}`);
        continue;
      }

      const apiData = await steamgriddbFetch(endpoint);
      const artwork = pickArtwork(apiData.data, key);
      if (!artwork) {
        addDiagnostic('warn', `No ${key} artwork candidates found for ${gameTitle}`, { endpoint });
        continue;
      }

      const ext = getExtensionFromArtwork(artwork);
      let destPath = path.join(cacheDir, `${key}.${ext}`);
      await downloadImage(artwork.url, destPath);
      if (key === 'logo' || key === 'icon') {
        try {
          const trimDetails = await trimTransparentPadding(destPath);
          if (trimDetails?.filePath) destPath = trimDetails.filePath;
          if (trimDetails && !trimDetails.alreadyTrimmed) {
            addDiagnostic('info', `Trimmed transparent padding from ${key} artwork for ${gameTitle}`, trimDetails);
          }
        } catch (trimError) {
          addDiagnostic('warn', `Could not trim ${key} artwork for ${gameTitle}: ${trimError.message}`);
        }
      }
      result[key] = toArtworkUrl(destPath);
      addDiagnostic('info', `Downloaded ${key} artwork for ${gameTitle}`, {
        width: artwork.width,
        height: artwork.height,
        style: artwork.style,
        verified: artwork.verified
      });
    } catch (e) {
      addDiagnostic('warn', `SteamGridDB ${key} unavailable for ${gameTitle}: ${e.message}`, { endpoint });
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
    emitDiagnostic('SteamGridDB', 'info', `Using saved SteamGridDB match for ${game.title}`, { sgdbId: game.steamGridDbId });
    return { id: game.steamGridDbId, name: game.steamGridDbName || game.title };
  }

  if (game?.steamAppId) {
    try {
      emitDiagnostic('SteamGridDB', 'info', `Trying Steam AppID lookup for ${game.title}`, { steamAppId: game.steamAppId });
      const match = await getSteamGridDBGameBySteamAppId(game.steamAppId);
      if (match?.id) return { ...match, matchSource: 'steamAppId' };
    } catch (err) {
      emitDiagnostic('SteamGridDB', 'warn', `Steam AppID lookup failed for ${game.title || game.steamAppId}: ${err.message}`, { steamAppId: game.steamAppId });
    }
  }

  emitDiagnostic('SteamGridDB', 'info', `Trying title lookup for ${game?.title || 'unknown game'}`);
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
  registerArtworkProtocol();
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

ipcMain.handle('get-system-memory-usage', async () => {
  const totalBytes = os.totalmem();
  const freeBytes = os.freemem();
  const usedBytes = Math.max(0, totalBytes - freeBytes);

  return {
    totalGb: totalBytes / (1024 ** 3),
    usedGb: usedBytes / (1024 ** 3),
    usagePercent: totalBytes > 0 ? Math.round((usedBytes / totalBytes) * 100) : 0
  };
});

// --- IPC: Database ---
const getDbPath = () => path.join(app.getPath('userData'), 'nexus-db.json');
const getLegacyDbPath = () => path.join(app.getPath('userData'), `nexus-${'p'}${'s'}${5}-db.json`);

ipcMain.handle('load-database', async () => {
  const dbPath = getDbPath();
  const legacyDbPath = getLegacyDbPath();
  try {
    if (!fs.existsSync(dbPath) && fs.existsSync(legacyDbPath)) {
      fs.copyFileSync(legacyDbPath, dbPath);
    }
    if (fs.existsSync(dbPath)) {
      const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
      const normalized = normalizeArtworkUrlsInDatabase(data);
      await trimCachedLogoArtworkForDatabase(normalized, { getCachedArtworkFilePath, toArtworkUrl, emitDiagnostic });
      return normalized;
    }
  } catch (err) { console.error('Error loading database:', err); }
  return null;
});

ipcMain.handle('save-database', (event, data) => {
  const dbPath = getDbPath();
  try {
    fs.writeFileSync(dbPath, JSON.stringify(normalizeArtworkUrlsInDatabase(data), null, 2), 'utf-8');
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

ipcMain.handle('select-image', async () => {
  if (!mainWindow) return null;
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'svg', 'ico'] }]
  });
  return result.canceled ? null : result.filePaths[0];
});

// --- IPC: Executable Scanner ---
function scanDirDepth(dirPath, currentDepth, maxDepth, filesList, diagnostics) {
  if (currentDepth > maxDepth) return;
  try {
    const files = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const file of files) {
      const fullPath = path.join(dirPath, file.name);
      if (file.name.startsWith('.') || ['node_modules', '$RECYCLE.BIN', 'System Volume Information', 'Windows', 'Common Files'].some(ex => file.name.includes(ex))) {
        diagnostics.push({ level: 'info', message: `Skipped ignored path ${fullPath}` });
        continue;
      }
      if (file.isDirectory()) {
        scanDirDepth(fullPath, currentDepth + 1, maxDepth, filesList, diagnostics);
      } else if (file.isFile() && file.name.toLowerCase().endsWith('.exe')) {
        const nameLower = file.name.toLowerCase();
        if (['unins', 'setup', 'install', 'crash', 'unity', 'helper', 'config', 'tool', 'update', 'patcher', 'dxwebsetup', 'vcredist'].some(ex => nameLower.includes(ex))) {
          diagnostics.push({ level: 'info', message: `Filtered helper/setup executable ${fullPath}` });
          continue;
        }
        filesList.push({ name: path.basename(file.name, '.exe'), path: fullPath });
        diagnostics.push({ level: 'info', message: `Found executable ${fullPath}` });
      }
    }
  } catch (err) {
    diagnostics.push({ level: 'warn', message: `Could not read directory ${dirPath}: ${err.message}` });
  }
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
  const diagnostics = [];
  emitDiagnostic('Scanner', 'info', `Starting executable scan`, { dirPath, maxDepth: 3 });

  if (!dirPath || !fs.existsSync(dirPath)) {
    const message = `Scan path does not exist: ${dirPath || '(empty)'}`;
    emitDiagnostic('Scanner', 'error', message);
    return { files: [], diagnostics: [{ level: 'error', message }] };
  }

  scanDirDepth(dirPath, 1, 3, filesList, diagnostics);
  const manifests = findSteamAppManifests(dirPath);
  const files = attachSteamAppIds(filesList, manifests);

  emitDiagnostic('Scanner', files.length ? 'info' : 'warn', `Executable scan completed with ${files.length} result${files.length === 1 ? '' : 's'}`, {
    dirPath,
    manifestCount: manifests.length,
    resultCount: files.length
  });
  diagnostics.slice(-25).forEach(item => emitDiagnostic('Scanner', item.level, item.message));

  return { files, diagnostics, manifestCount: manifests.length };
});

// --- System Platform Discovery Scanners ---
function queryRegistry(key, value) {
  return new Promise((resolve) => {
    exec(`reg query "${key}" /v "${value}"`, (error, stdout) => {
      if (error) return resolve(null);
      const lines = stdout.split('\n');
      for (const line of lines) {
        if (line.includes(value)) {
          const parts = line.trim().split(/\s{2,}/);
          if (parts.length >= 3) {
            return resolve(parts[2].trim());
          }
        }
      }
      resolve(null);
    });
  });
}

function findPrimaryExecutable(folderPath) {
  const filesList = [];
  const diagnostics = [];
  scanDirDepth(folderPath, 1, 2, filesList, diagnostics);
  if (filesList.length === 0) return null;

  // Try to find one matching the folder name
  const folderName = path.basename(folderPath).toLowerCase();
  const exactMatch = filesList.find(f => path.basename(f.name, '.exe').toLowerCase() === folderName);
  if (exactMatch) return exactMatch.path;

  // Fallback: Pick largest executable (usually the game binary)
  try {
    const scoredList = filesList.map(file => {
      try {
        return { ...file, size: fs.statSync(file.path).size };
      } catch (e) {
        return { ...file, size: 0 };
      }
    });
    scoredList.sort((a, b) => b.size - a.size);
    return scoredList[0]?.path || null;
  } catch (e) {
    return filesList[0]?.path || null;
  }
}

async function scanSteamGames(diagnostics) {
  const gamesList = [];
  try {
    let steamPath = await queryRegistry('HKCU\\Software\\Valve\\Steam', 'SteamPath');
    if (!steamPath) {
      steamPath = await queryRegistry('HKLM\\SOFTWARE\\Wow6432Node\\Valve\\Steam', 'InstallPath');
    }
    if (!steamPath) {
      const paths = ['C:\\Program Files (x86)\\Steam', 'C:\\Program Files\\Steam'];
      for (const p of paths) {
        if (fs.existsSync(p)) {
          steamPath = p;
          break;
        }
      }
    }

    if (!steamPath || !fs.existsSync(steamPath)) {
      diagnostics.push({ level: 'info', message: 'Steam installation not found on this system.' });
      return [];
    }

    diagnostics.push({ level: 'info', message: `Steam found: ${steamPath}` });
    const candidates = new Set();
    const primarySteamapps = path.join(steamPath, 'steamapps');
    if (fs.existsSync(primarySteamapps)) {
      candidates.add(primarySteamapps);

      const vdfPath = path.join(primarySteamapps, 'libraryfolders.vdf');
      if (fs.existsSync(vdfPath)) {
        try {
          const content = fs.readFileSync(vdfPath, 'utf-8');
          const matches = [...content.matchAll(/"path"\s+"([^"]+)"/g)];
          for (const m of matches) {
            const extraPath = path.join(m[1].replace(/\\\\/g, '\\'), 'steamapps');
            if (fs.existsSync(extraPath)) {
              candidates.add(extraPath);
            }
          }
        } catch (e) {
          diagnostics.push({ level: 'warn', message: `Could not parse Steam libraryfolders.vdf: ${e.message}` });
        }
      }
    }

    for (const steamappsDir of candidates) {
      try {
        const files = fs.readdirSync(steamappsDir).filter(file => /^appmanifest_\d+\.acf$/i.test(file));
        for (const file of files) {
          const manifestPath = path.join(steamappsDir, file);
          const manifest = parseSteamAppManifest(manifestPath, steamappsDir);
          if (manifest && manifest.installPath && fs.existsSync(manifest.installPath)) {
            const primaryExe = findPrimaryExecutable(manifest.installPath);
            if (primaryExe) {
              gamesList.push({
                name: manifest.name,
                path: primaryExe,
                steamAppId: manifest.appid,
                platform: 'Steam'
              });
              diagnostics.push({ level: 'info', message: `Steam: Discovered game ${manifest.name}` });
            }
          }
        }
      } catch (err) {
        diagnostics.push({ level: 'warn', message: `Could not read Steam library ${steamappsDir}: ${err.message}` });
      }
    }
  } catch (err) {
    diagnostics.push({ level: 'warn', message: `Steam scanning failed: ${err.message}` });
  }
  return gamesList;
}

async function scanEpicGames(diagnostics) {
  const gamesList = [];
  try {
    const manifestsDir = 'C:\\ProgramData\\Epic\\EpicGamesLauncher\\Data\\Manifests';
    if (!fs.existsSync(manifestsDir)) {
      diagnostics.push({ level: 'info', message: 'Epic Games manifests directory not found.' });
      return [];
    }

    const files = fs.readdirSync(manifestsDir).filter(file => file.endsWith('.item'));
    for (const file of files) {
      try {
        const content = JSON.parse(fs.readFileSync(path.join(manifestsDir, file), 'utf-8'));
        const name = content.DisplayName;
        const installDir = content.InstallLocation;
        const launchExe = content.LaunchExecutable;
        if (name && installDir && launchExe) {
          const fullPath = path.join(installDir, launchExe);
          if (fs.existsSync(fullPath)) {
            gamesList.push({
              name: name,
              path: fullPath,
              epicItemId: content.CatalogItemId,
              platform: 'Epic Games'
            });
            diagnostics.push({ level: 'info', message: `Epic Games: Discovered game ${name}` });
          }
        }
      } catch (e) { /* ignore */ }
    }
  } catch (err) {
    diagnostics.push({ level: 'warn', message: `Epic scanning failed: ${err.message}` });
  }
  return gamesList;
}

async function scanGogGames(diagnostics) {
  const gamesList = [];
  try {
    const commonPaths = ['C:\\GOG Games', 'C:\\Program Files (x86)\\GOG Galaxy\\Games'];
    let gogFound = false;

    for (const root of commonPaths) {
      if (fs.existsSync(root)) {
        gogFound = true;
        const folders = fs.readdirSync(root, { withFileTypes: true });
        for (const folder of folders) {
          if (folder.isDirectory()) {
            const folderPath = path.join(root, folder.name);
            const primaryExe = findPrimaryExecutable(folderPath);
            if (primaryExe) {
              gamesList.push({
                name: folder.name,
                path: primaryExe,
                platform: 'GOG Galaxy'
              });
              diagnostics.push({ level: 'info', message: `GOG: Discovered game ${folder.name}` });
            }
          }
        }
      }
    }

    if (!gogFound) {
      diagnostics.push({ level: 'info', message: 'GOG Galaxy games directory not found.' });
    }
  } catch (err) {
    diagnostics.push({ level: 'warn', message: `GOG scanning failed: ${err.message}` });
  }
  return gamesList;
}

async function scanXboxGames(diagnostics) {
  const gamesList = [];
  try {
    const xboxPath = 'C:\\XboxGames';
    if (fs.existsSync(xboxPath)) {
      const folders = fs.readdirSync(xboxPath, { withFileTypes: true });
      for (const folder of folders) {
        if (folder.isDirectory()) {
          const folderPath = path.join(xboxPath, folder.name);
          const primaryExe = findPrimaryExecutable(folderPath);
          if (primaryExe) {
            gamesList.push({
              name: folder.name,
              path: primaryExe,
              platform: 'Xbox'
            });
            diagnostics.push({ level: 'info', message: `Xbox: Discovered game ${folder.name}` });
          }
        }
      }
    } else {
      diagnostics.push({ level: 'info', message: 'Xbox Games directory not found.' });
    }
  } catch (err) {
    diagnostics.push({ level: 'warn', message: `Xbox scanning failed: ${err.message}` });
  }
  return gamesList;
}

ipcMain.handle('scan-platforms', async (event) => {
  const diagnostics = [];
  emitDiagnostic('Scanner', 'info', 'Starting parallel system-wide platform scan');

  try {
    const [steamGames, epicGames, gogGames, xboxGames] = await Promise.all([
      scanSteamGames(diagnostics),
      scanEpicGames(diagnostics),
      scanGogGames(diagnostics),
      scanXboxGames(diagnostics)
    ]);

    const allGames = [...steamGames, ...epicGames, ...gogGames, ...xboxGames];
    emitDiagnostic('Scanner', 'info', `System-wide scan completed! Discovered ${allGames.length} game(s) total.`, {
      steam: steamGames.length,
      epic: epicGames.length,
      gog: gogGames.length,
      xbox: xboxGames.length
    });

    return { files: allGames, diagnostics };
  } catch (err) {
    emitDiagnostic('Scanner', 'error', `Platform discovery failed: ${err.message}`);
    return { files: [], diagnostics: [{ level: 'error', message: err.message }] };
  }
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
    const results = await searchSteamGridDBGames(term);
    emitDiagnostic('SteamGridDB', results.length ? 'info' : 'warn', `Search for "${term}" returned ${results.length} result${results.length === 1 ? '' : 's'}`, {
      topMatch: results[0] ? { id: results[0].id, name: results[0].name, matchScore: results[0].matchScore } : null
    });
    return results;
  } catch (err) {
    emitDiagnostic('SteamGridDB', 'error', `Search failed for "${term}": ${err.message}`);
    return { error: err.message };
  }
});

ipcMain.handle('steamgriddb-fetch-artwork', async (event, sgdbId, gameId, gameTitle) => {
  try {
    return await fetchArtworkForGame(sgdbId, gameId, gameTitle);
  } catch (err) {
    emitDiagnostic('SteamGridDB', 'error', `Artwork fetch failed for ${gameTitle}: ${err.message}`, { sgdbId, gameId });
    return { error: err.message };
  }
});

ipcMain.handle('hltb-search', async (event, term) => {
  try {
    return await searchHowLongToBeatGames(term);
  } catch (err) {
    emitDiagnostic('HowLongToBeat', 'error', `Search failed for "${term}": ${err.message}`);
    return { error: err.message };
  }
});

ipcMain.handle('hltb-auto-fetch', async (event, game) => {
  try {
    return await autoFetchHowLongToBeat(game);
  } catch (err) {
    emitDiagnostic('HowLongToBeat', 'error', `Lookup failed for ${game?.title || 'unknown game'}: ${err.message}`);
    return { error: err.message };
  }
});

async function isImageLowResolution(filePath, minWidth = 1000) {
  try {
    const metadata = await sharp(filePath).metadata();
    return metadata.width < minWidth;
  } catch (err) {
    return false;
  }
}

async function downloadSteamCDNArtwork(appId, key, cacheDir, gameTitle, diagnostics) {
  const cdnTemplates = {
    grid: [`https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/library_600x900.jpg`],
    hero: [
      `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/library_hero.jpg`
    ],
    logo: [`https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/logo.png`],
    icon: [`https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/icon.png`]
  };

  const urls = cdnTemplates[key] || [];
  const ext = key === 'logo' || key === 'icon' ? 'png' : 'jpg';
  const destPath = path.join(cacheDir, `${key}.${ext}`);

  for (const url of urls) {
    try {
      emitDiagnostic('ArtworkFetcher', 'info', `Attempting Steam CDN fetch for ${key}: ${url}`);
      await downloadImage(url, destPath);

      if (key === 'hero') {
        const isLowRes = await isImageLowResolution(destPath);
        if (isLowRes) {
          diagnostics.push({ level: 'warn', message: `Downloaded Steam CDN hero ${url} is low-resolution (< 1000px width), discarding to fall back to SteamGridDB` });
          if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
          continue;
        }
      }

      // Crop transparent padding for logo/icon
      let finalPath = destPath;
      if (key === 'logo' || key === 'icon') {
        try {
          const trimDetails = await trimTransparentPadding(destPath);
          if (trimDetails?.filePath) finalPath = trimDetails.filePath;
        } catch (trimError) {
          diagnostics.push({ level: 'warn', message: `Could not trim transparent padding: ${trimError.message}` });
        }
      }

      diagnostics.push({ level: 'info', message: `Successfully fetched ${key} from Steam CDN` });
      return toArtworkUrl(finalPath);
    } catch (err) {
      diagnostics.push({ level: 'warn', message: `Steam CDN ${key} download failed for ${url}: ${err.message}` });
    }
  }
  return null;
}

async function fetchArtworkWithFallback(game) {
  const cacheDir = getGameCacheDir(game.id);
  const result = { diagnostics: [] };
  const diagnostics = result.diagnostics;

  const addDiagnostic = (level, message, details = null) => {
    diagnostics.push({ area: 'ArtworkFetcher', level, message, details, timestamp: new Date().toISOString() });
    emitDiagnostic('ArtworkFetcher', level, message, details);
  };

  addDiagnostic('info', `Starting 3-stage fallback artwork process for ${game.title}`, { gameId: game.id });

  let resolvedSteamAppId = null;
  if (game.steamAppId && /^\d+$/.test(String(game.steamAppId).trim())) {
    resolvedSteamAppId = String(game.steamAppId).trim();
    addDiagnostic('info', `Stage 1: Using existing Steam App ID: ${resolvedSteamAppId}`);
  } else {
    // Stage 2: Fallback to Steam Store Search API
    addDiagnostic('info', `Stage 2: Resolving Steam App ID via Store Search API for: ${game.title}`);
    try {
      const searchUrl = `https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(game.title)}&l=english&cc=US`;
      const searchData = await fetchJson(searchUrl);
      if (searchData && searchData.success && searchData.items && searchData.items.length > 0) {
        const bestMatch = searchData.items[0];
        resolvedSteamAppId = String(bestMatch.id);
        addDiagnostic('info', `Stage 2 resolved Steam App ID: ${resolvedSteamAppId} (Name: ${bestMatch.name})`);
      } else {
        addDiagnostic('warn', `Stage 2: No match found in Steam Store search for: ${game.title}`);
      }
    } catch (err) {
      addDiagnostic('warn', `Stage 2: Steam Store search failed: ${err.message}`);
    }
  }

  const keys = ['grid', 'hero', 'logo', 'icon'];
  const cached = getCachedArtworkPaths(game.id);

  if (resolvedSteamAppId) {
    for (const key of keys) {
      if (cached?.[key]) {
        let cachedFilePath = getCachedArtworkFilePath(game.id, key);
        if ((key === 'logo' || key === 'icon') && cachedFilePath) {
          try {
            const trimDetails = await trimTransparentPadding(cachedFilePath);
            if (trimDetails?.filePath) cachedFilePath = trimDetails.filePath;
          } catch (e) {}
        }
        result[key] = cachedFilePath ? toArtworkUrl(cachedFilePath) : cached[key];
        addDiagnostic('info', `Using cached ${key} artwork for ${game.title}`);
        continue;
      }

      const cdnUrl = await downloadSteamCDNArtwork(resolvedSteamAppId, key, cacheDir, game.title, diagnostics);
      if (cdnUrl) {
        result[key] = cdnUrl;
      }
    }
  }

  // Stage 3 (SteamGridDB Fallback): For any missing artwork keys, query SteamGridDB!
  const missingKeys = keys.filter(k => !result[k]);
  if (missingKeys.length > 0) {
    addDiagnostic('info', `Stage 3: Falling back to SteamGridDB for missing assets: ${missingKeys.join(', ')}`);
    try {
      const sgdbGame = await resolveSteamGridDBGame({
        ...game,
        steamAppId: resolvedSteamAppId || game.steamAppId
      });

      if (sgdbGame?.id) {
        addDiagnostic('info', `Stage 3: Resolved SteamGridDB game ID: ${sgdbGame.id} (${sgdbGame.name})`);

        const sgdbArtwork = await fetchArtworkForGame(sgdbGame.id, game.id, game.title);
        for (const key of missingKeys) {
          if (sgdbArtwork[key]) {
            result[key] = sgdbArtwork[key];
            addDiagnostic('info', `Stage 3: Retrieved ${key} from SteamGridDB`);
          }
        }
        result.steamGridDbId = sgdbGame.id;
        result.steamGridDbName = sgdbGame.name;
      } else {
        addDiagnostic('warn', 'Stage 3: Could not resolve SteamGridDB game ID');
      }
    } catch (err) {
      addDiagnostic('warn', `Stage 3: SteamGridDB fallback failed: ${err.message}`);
    }
  }

  // Stage 4 (Absolute Fallback for Hero/Banner): If hero is still missing, try downloading Steam CDN's lower-res header or capsule!
  if (!result['hero'] && resolvedSteamAppId) {
    addDiagnostic('info', `Stage 4: Hero is still missing. Attempting lower-res Steam CDN header/capsule fallbacks for ${game.title}`);
    try {
      const fallbackTemplates = [
        `https://cdn.cloudflare.steamstatic.com/steam/apps/${resolvedSteamAppId}/header.jpg`,
        `https://cdn.cloudflare.steamstatic.com/steam/apps/${resolvedSteamAppId}/capsule_616x353.jpg`
      ];
      const destPath = path.join(cacheDir, `hero.jpg`);
      for (const url of fallbackTemplates) {
        try {
          addDiagnostic('info', `Attempting fallback Steam CDN fetch: ${url}`);
          await downloadImage(url, destPath);
          result['hero'] = toArtworkUrl(destPath);
          addDiagnostic('info', `Successfully retrieved lower-res hero fallback from Steam CDN`);
          break;
        } catch (e) {
          addDiagnostic('warn', `Fallback Steam CDN download failed for ${url}: ${e.message}`);
        }
      }
    } catch (err) {
      addDiagnostic('warn', `Stage 4 absolute fallback failed: ${err.message}`);
    }
  }

  result.steamAppId = resolvedSteamAppId || game.steamAppId || null;
  return result;
}

ipcMain.handle('steamgriddb-auto-fetch-artwork', async (event, game) => {
  try {
    if (!game?.id || !game?.title) {
      return { error: 'Missing game id or title' };
    }

    const artworkResult = await fetchArtworkWithFallback(game);
    
    if (!(artworkResult.grid || artworkResult.hero || artworkResult.logo || artworkResult.icon)) {
      emitDiagnostic('ArtworkFetcher', 'warn', `No downloadable artwork found for ${game.title}`);
      return { error: `No downloadable artwork found for ${game.title}` };
    }

    return artworkResult;
  } catch (err) {
    emitDiagnostic('ArtworkFetcher', 'error', `Artwork fallback pipeline failed for ${game?.title || 'unknown game'}: ${err.message}`);
    return { error: err.message };
  }
});


ipcMain.handle('get-cached-artwork', async (event, gameId) => {
  return getCachedArtworkPaths(gameId);
});

ipcMain.handle('fetch-steam-details', async (event, steamAppId) => {
  try {
    const url = `https://store.steampowered.com/api/appdetails?appids=${steamAppId}`;
    const data = await fetchJson(url);
    if (data && data[steamAppId] && data[steamAppId].success) {
      return data[steamAppId].data;
    }
    return null;
  } catch (err) {
    emitDiagnostic('SteamDetails', 'error', `Failed to fetch Steam details for AppId ${steamAppId}: ${err.message}`);
    return null;
  }
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

ipcMain.handle('save-settings', async (event, settings) => {
  try {
    const configPath = getConfigPath();
    let config = {};
    if (fs.existsSync(configPath)) config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    config.settings = settings;
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

ipcMain.handle('load-settings', async () => {
  try {
    const configPath = getConfigPath();
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      if (config.settings) return config.settings;
    }
  } catch (e) { /* ignore */ }
  return null;
});

ipcMain.handle('clear-artwork-cache', async () => {
  try {
    const artworkDir = getArtworkCacheDir();
    if (fs.existsSync(artworkDir)) {
      const files = fs.readdirSync(artworkDir);
      for (const file of files) {
        const filePath = path.join(artworkDir, file);
        fs.rmSync(filePath, { recursive: true, force: true });
      }
    }
    await session.defaultSession.clearCache();
    emitDiagnostic('Artwork', 'info', 'Artwork cache directory and Brandfetch image cache cleared successfully');
    return { success: true };
  } catch (err) {
    emitDiagnostic('Artwork', 'error', `Failed to clear artwork cache: ${err.message}`);
    return { success: false, error: err.message };
  }
});

