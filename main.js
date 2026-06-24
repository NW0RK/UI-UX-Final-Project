import { app, BrowserWindow, ipcMain, dialog, protocol, net, session, shell } from 'electron';
import dotenv from 'dotenv';
dotenv.config();
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
import {
  PROTONDB_COMMUNITY_SUMMARY_BASE,
  PROTONDB_DIRECT_SUMMARY_BASE,
  isValidSteamAppId,
  normalizeProtonDbSummary
} from './src/utils/protondb.js';

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
const STEAMGRIDDB_BASE_URL = 'https://www.steamgriddb.com/api/v2';
const IGDB_BASE_URL = 'https://api.igdb.com/v4';
const TWITCH_TOKEN_URL = 'https://id.twitch.tv/oauth2/token';
const REQUEST_TIMEOUT_MS = 15000;
const IGDB_RATE_LIMIT_DELAY_MS = 260;
const IGDB_POPSCORE_TYPES = [1, 2, 3, 4, 5, 9, 10, 11];
const IGDB_POPSCORE_WEIGHTS = {
  1: 0.15,
  2: 0.1,
  3: 0.25,
  4: 0.05,
  5: 0.25,
  9: 0.15,
  10: 0.05,
  11: 0.2
};
const IGDB_POPULAR_CACHE_SCHEMA_VERSION = 1;
const IGDB_POPULAR_CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const getConfigPath = () => path.join(app.getPath('userData'), 'nexus-config.json');
const getIgdbPopularCachePath = () => path.join(app.getPath('userData'), 'igdb-popular-cache.json');
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
  return null;
}

function getIgdbCredentialsFromConfig() {
  const envClientId = process.env.IGDB_CLIENT_ID?.trim();
  const envClientSecret = process.env.IGDB_CLIENT_SECRET?.trim();
  if (envClientId && envClientSecret) {
    return { clientId: envClientId, clientSecret: envClientSecret, source: 'env' };
  }

  try {
    const configPath = getConfigPath();
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      const clientId = envClientId || config.igdbClientId?.trim();
      const clientSecret = envClientSecret || config.igdbClientSecret?.trim();
      if (clientId && clientSecret) {
        const source = envClientId || envClientSecret ? 'env' : 'config';
        return { clientId, clientSecret, source };
      }
    }
  } catch (e) { /* ignore */ }

  return { clientId: envClientId, clientSecret: envClientSecret, source: 'env' };
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

      const response = await net.fetch(pathToFileURL(filePath).toString());
      const headers = new Headers(response.headers);
      headers.set('Access-Control-Allow-Origin', '*');
      headers.set('Cross-Origin-Resource-Policy', 'cross-origin');

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers
      });
    } catch (err) {
      emitDiagnostic('Artwork', 'error', `Artwork protocol failed: ${err.message}`);
      return new Response('Artwork protocol error', { status: 500 });
    }
  });
}

protocol.registerSchemesAsPrivileged([
  { scheme: ARTWORK_PROTOCOL, privileges: { standard: true, secure: true, supportFetchAPI: true, stream: true, corsEnabled: true } }
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

function postTextJson(url, body, headers = {}) {
  return new Promise((resolve, reject) => {
    const target = new URL(url);
    const req = https.request({
      protocol: target.protocol,
      hostname: target.hostname,
      path: `${target.pathname}${target.search}`,
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
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
          const message = Array.isArray(parsed)
            ? parsed.map(item => item?.message || item?.title).filter(Boolean).join('; ')
            : parsed?.message || parsed?.error;
          reject(new Error(message || `HTTP ${res.statusCode}`));
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

function decodeHtmlEntities(value) {
  return String(value || '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&mdash;/g, '-')
    .replace(/&ndash;/g, '-')
    .replace(/&hellip;/g, '...');
}

function stripHtml(value) {
  if (!value) return '';
  return decodeHtmlEntities(String(value)
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim());
}

function sanitizeGameId(value) {
  return String(value || 'game').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'game';
}

let igdbTokenCache = null;
let igdbQueue = Promise.resolve();
let igdbLastRequestAt = 0;

function scheduleIgdbRequest(task) {
  const run = async () => {
    const waitMs = Math.max(0, IGDB_RATE_LIMIT_DELAY_MS - (Date.now() - igdbLastRequestAt));
    if (waitMs > 0) {
      await new Promise(resolve => setTimeout(resolve, waitMs));
    }
    igdbLastRequestAt = Date.now();
    return task();
  };

  igdbQueue = igdbQueue.then(run, run);
  return igdbQueue;
}

async function getIgdbAccessToken() {
  const credentials = getIgdbCredentialsFromConfig();
  if (!credentials.clientId || !credentials.clientSecret) {
    throw new Error('IGDB credentials are not configured. Add your Twitch Client Secret in Settings or IGDB_CLIENT_SECRET.');
  }

  if (
    igdbTokenCache?.accessToken &&
    igdbTokenCache.clientId === credentials.clientId &&
    igdbTokenCache.clientSecret === credentials.clientSecret &&
    igdbTokenCache.expiresAt > Date.now() + 60000
  ) {
    return igdbTokenCache.accessToken;
  }

  const url = new URL(TWITCH_TOKEN_URL);
  url.searchParams.set('client_id', credentials.clientId);
  url.searchParams.set('client_secret', credentials.clientSecret);
  url.searchParams.set('grant_type', 'client_credentials');

  const data = await postTextJson(url.href, '', {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': 0,
    'Accept': 'application/json',
    'User-Agent': 'NexusLauncher/1.0'
  });

  if (!data?.access_token) throw new Error('Twitch token response did not include an access token');

  igdbTokenCache = {
    accessToken: data.access_token,
    clientId: credentials.clientId,
    clientSecret: credentials.clientSecret,
    expiresAt: Date.now() + Math.max(0, Number(data.expires_in || 0) - 60) * 1000
  };

  return igdbTokenCache.accessToken;
}

function escapeIgdbString(value) {
  return String(value || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function igdbGameFields(extra = '') {
  return [
    'name',
    'slug',
    'summary',
    'storyline',
    'first_release_date',
    'total_rating',
    'total_rating_count',
    'rating',
    'rating_count',
    'follows',
    'category',
    'aggregated_rating',
    'cover.image_id',
    'screenshots.image_id',
    'genres.name',
    'themes.name',
    'involved_companies.company.name',
    'involved_companies.developer',
    'involved_companies.publisher',
    'age_ratings.category',
    'age_ratings.rating',
    'websites.url',
    extra
  ].filter(Boolean).join(',');
}

async function igdbFetchJson(endpoint, query) {
  const credentials = getIgdbCredentialsFromConfig();
  const token = await getIgdbAccessToken();

  emitDiagnostic('Discovery', 'info', `Requesting IGDB /${endpoint}`);
  return scheduleIgdbRequest(() => postTextJson(`${IGDB_BASE_URL}/${endpoint}`, query, {
    'Accept': 'application/json',
    'Client-ID': credentials.clientId,
    'Authorization': `Bearer ${token}`,
    'User-Agent': 'NexusLauncher/1.0'
  }));
}

function igdbImageUrl(imageId, size = 'cover_big_2x') {
  if (!imageId) return null;
  return `https://images.igdb.com/igdb/image/upload/t_${size}/${imageId}.jpg`;
}

function formatIgdbDate(unixSeconds) {
  if (!Number.isFinite(Number(unixSeconds))) return 'TBA';
  return new Date(Number(unixSeconds) * 1000).toISOString().slice(0, 10);
}

function formatIgdbAgeRating(ageRatings = []) {
  const esrbNames = {
    6: 'Rating Pending',
    7: 'Early Childhood',
    8: 'Everyone',
    9: 'Everyone 10+',
    10: 'Teen',
    11: 'Mature',
    12: 'Adults Only'
  };
  const pegiNames = {
    1: 'PEGI 3',
    2: 'PEGI 7',
    3: 'PEGI 12',
    4: 'PEGI 16',
    5: 'PEGI 18'
  };
  const esrb = ageRatings.find(item => Number(item?.category) === 1 && esrbNames[item?.rating]);
  if (esrb) return esrbNames[esrb.rating];
  const pegi = ageRatings.find(item => Number(item?.category) === 2 && pegiNames[item?.rating]);
  if (pegi) return pegiNames[pegi.rating];
  return 'Unrated';
}

function igdbCompanyNames(involvedCompanies = [], flag) {
  return involvedCompanies
    .filter(item => item?.[flag])
    .map(item => item?.company?.name)
    .filter(Boolean);
}

function steamAppIdFromIgdbWebsites(websites = []) {
  const steam = websites.find(site => String(site?.url || '').includes('store.steampowered.com/app/'));
  const match = String(steam?.url || '').match(/store\.steampowered\.com\/app\/(\d+)/i);
  return match?.[1] || null;
}

function normalizeIgdbGame(raw, { includeDescription = false } = {}) {
  if (!raw?.id || !raw?.name) return null;

  const igdbId = String(raw.id);
  const slug = raw.slug || sanitizeGameId(raw.name);
  const developers = igdbCompanyNames(raw.involved_companies, 'developer');
  const publishers = igdbCompanyNames(raw.involved_companies, 'publisher');
  const genres = Array.isArray(raw.genres) ? raw.genres.map(item => item?.name).filter(Boolean) : [];
  const themes = Array.isArray(raw.themes) ? raw.themes.map(item => item?.name).filter(Boolean) : [];
  const screenshots = Array.isArray(raw.screenshots) ? raw.screenshots : [];
  const coverUrl = igdbImageUrl(raw.cover?.image_id, 'cover_big_2x');
  const bannerUrl = igdbImageUrl(screenshots[0]?.image_id, 'screenshot_huge_2x') || coverUrl;
  const rating100 = Number(raw.total_rating || raw.rating || raw.aggregated_rating || 0) || 0;
  const summary = stripHtml(raw.summary || '');
  const storyline = stripHtml(raw.storyline || '');
  const description = summary;

  return {
    id: `igdb-${igdbId}`,
    igdbId,
    igdbSlug: slug,
    igdbUrl: `https://www.igdb.com/games/${slug}`,
    title: raw.name,
    developer: developers.join(', ') || 'Unknown Developer',
    publisher: publishers.join(', ') || developers.join(', ') || 'Unknown Publisher',
    genre: genres.join(', ') || 'Game',
    rating: rating100 ? Math.round((rating100 / 20) * 10) / 10 : 0,
    igdbRating: rating100,
    igdbPopScore: (raw.total_rating_count || 0) + (raw.rating_count || 0) + (raw.follows || 0),
    ageRating: formatIgdbAgeRating(raw.age_ratings),
    releaseDate: formatIgdbDate(raw.first_release_date),
    description: description || `Open details to load the full game profile for ${raw.name}.`,
    igdbSummary: summary,
    igdbStoryline: storyline,
    playtime: 0,
    lastPlayed: 'Never',
    progress: 0,
    timeToComplete: '--',
    nextAchievement: 'Locked (0% complete)',
    coverUrl,
    bannerUrl,
    logoUrl: null,
    iconUrl: null,
    soundType: 'synth',
    exePath: '',
    isFavorite: false,
    owned: false,
    tags: [...genres, ...themes].slice(0, 6),
    steamAppId: steamAppIdFromIgdbWebsites(raw.websites),
    artworkFetched: false,
    source: 'igdb'
  };
}

function buildIgdbPopScoreRecords(primitivesByType = [], limit = 12) {
  const recordLimit = Math.min(Math.max(Number(limit) || 12, 1), 40);
  const scoreByGameId = new Map();

  primitivesByType.forEach(primitives => {
    const maxValue = Math.max(...primitives.map(item => Number(item?.value) || 0), 0);
    if (maxValue <= 0) return;

    primitives.forEach(item => {
      const gameId = Number(item?.game_id);
      const value = Number(item?.value);
      const type = Number(item?.popularity_type);
      if (!gameId || !Number.isFinite(value) || !type) return;

      const weight = IGDB_POPSCORE_WEIGHTS[type] || 0.05;
      const existing = scoreByGameId.get(gameId) || { gameId, popScore: 0, primitives: {} };
      existing.popScore += (value / maxValue) * weight;
      existing.primitives[type] = value;
      scoreByGameId.set(gameId, existing);
    });
  });

  return [...scoreByGameId.values()]
    .sort((a, b) => b.popScore - a.popScore)
    .slice(0, recordLimit);
}

function normalizeIgdbPopularLimit(limit) {
  return Math.min(Math.max(Number(limit) || 12, 1), 40);
}

function getIgdbPopularCacheKey(limit) {
  return `popular:${IGDB_POPULAR_CACHE_SCHEMA_VERSION}:${normalizeIgdbPopularLimit(limit)}`;
}

function readIgdbPopularCacheEntry(limit) {
  try {
    const cachePath = getIgdbPopularCachePath();
    if (!fs.existsSync(cachePath)) return null;

    const cache = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
    const entry = cache?.entries?.[getIgdbPopularCacheKey(limit)];
    if (!entry || !Array.isArray(entry.games) || !Number.isFinite(Number(entry.cachedAt))) return null;

    return {
      games: entry.games,
      cachedAt: Number(entry.cachedAt),
      isFresh: Date.now() - Number(entry.cachedAt) < IGDB_POPULAR_CACHE_TTL_MS
    };
  } catch (err) {
    emitDiagnostic('Discovery', 'warn', `Could not read IGDB popular cache: ${err.message}`);
    return null;
  }
}

function writeIgdbPopularCacheEntry(limit, games) {
  try {
    const cachePath = getIgdbPopularCachePath();
    let cache = { schemaVersion: IGDB_POPULAR_CACHE_SCHEMA_VERSION, entries: {} };

    if (fs.existsSync(cachePath)) {
      const existing = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
      if (existing && typeof existing === 'object') {
        cache = {
          schemaVersion: IGDB_POPULAR_CACHE_SCHEMA_VERSION,
          entries: existing.entries && typeof existing.entries === 'object' ? existing.entries : {}
        };
      }
    }

    cache.entries[getIgdbPopularCacheKey(limit)] = {
      cachedAt: Date.now(),
      games
    };
    fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2), 'utf-8');
  } catch (err) {
    emitDiagnostic('Discovery', 'warn', `Could not write IGDB popular cache: ${err.message}`);
  }
}

async function searchIgdbGames(term, { pageSize = 36 } = {}) {
  const searchTerm = String(term || '').trim();
  if (searchTerm.length < 3) return [];

  const limit = Math.max(pageSize * 4, 50);
  const data = await igdbFetchJson('games', [
    `search "${escapeIgdbString(searchTerm)}";`,
    `fields ${igdbGameFields()};`,
    'where version_parent = null;',
    `limit ${limit};`
  ].join(' '));

  const allowedCategories = [0, 8, 9];
  const sortedRaw = (Array.isArray(data) ? data : [])
    .filter(item => item.category === undefined || allowedCategories.includes(item.category))
    .sort((a, b) => {
    const aExact = a.name?.toLowerCase() === searchTerm.toLowerCase() ? 1 : 0;
    const bExact = b.name?.toLowerCase() === searchTerm.toLowerCase() ? 1 : 0;
    if (aExact !== bExact) return bExact - aExact;

    const aPop = (a.total_rating_count || 0) + (a.rating_count || 0) + (a.follows || 0);
    const bPop = (b.total_rating_count || 0) + (b.rating_count || 0) + (b.follows || 0);
    return bPop - aPop;
  }).slice(0, pageSize);

  return sortedRaw
    .map(result => normalizeIgdbGame(result))
    .filter(Boolean);
}

async function fetchPopularIgdbGamesFresh({ limit = 12 } = {}) {
  const primitivesByType = await Promise.all(IGDB_POPSCORE_TYPES.map(type => igdbFetchJson('popularity_primitives', [
    'fields game_id,popularity_type,value,calculated_at;',
    `where popularity_type = ${type};`,
    'sort value desc;',
    'limit 50;'
  ].join(' '))));
  const popScoreRecords = buildIgdbPopScoreRecords(primitivesByType, limit);

  const gameIds = popScoreRecords.map(item => item.gameId);
  if (gameIds.length === 0) return [];

  const data = await igdbFetchJson('games', [
    `fields ${igdbGameFields()};`,
    `where id = (${gameIds.join(',')}) & version_parent = null;`,
    `limit ${gameIds.length};`
  ].join(' '));

  const gameById = new Map((Array.isArray(data) ? data : []).map(game => [Number(game.id), game]));

  return popScoreRecords
    .map(scoreRecord => {
      const game = normalizeIgdbGame(gameById.get(scoreRecord.gameId));
      return game ? {
        ...game,
        igdbPopScore: scoreRecord.popScore,
        igdbPopScorePrimitives: scoreRecord.primitives
      } : null;
    })
    .filter(Boolean)
    .map(game => ({
      ...game,
      discoverySource: 'IGDB PopScore'
    }));
}

async function fetchPopularIgdbGames({ limit = 12 } = {}) {
  const normalizedLimit = normalizeIgdbPopularLimit(limit);
  const cached = readIgdbPopularCacheEntry(normalizedLimit);

  if (cached?.isFresh) {
    emitDiagnostic('Discovery', 'info', `Using cached IGDB popular feed with ${cached.games.length} game${cached.games.length === 1 ? '' : 's'}`);
    return cached.games;
  }

  try {
    const games = await fetchPopularIgdbGamesFresh({ limit: normalizedLimit });
    writeIgdbPopularCacheEntry(normalizedLimit, games);
    return games;
  } catch (err) {
    if (cached?.games?.length) {
      emitDiagnostic('Discovery', 'warn', `Using stale IGDB popular cache after refresh failed: ${err.message}`);
      return cached.games;
    }

    throw err;
  }
}

function normalizeIgdbScreenshots(results = []) {
  return results
    .map((shot, index) => {
      const image = shot?.image_id
        ? igdbImageUrl(shot.image_id, 'screenshot_huge_2x')
        : shot?.path_full || shot?.url;
      if (!image) return null;
      return {
        id: shot.id || `igdb-${index}`,
        path_full: image,
        path_thumbnail: shot?.image_id ? igdbImageUrl(shot.image_id, 'screenshot_med_2x') : image
      };
    })
    .filter(Boolean);
}

function normalizeIgdbTrailer(results = [], igdbId = null) {
  const videos = Array.isArray(results) ? results : [];
  const rankedPatterns = [
    /\b(?:launch|release|official|teaser|announce(?:ment)?|reveal|cinematic|story)?\s*trailer\b/i,
    /\btrailer\b/i,
    /\btv\s*spot\b/i,
    /\bgameplay\b/i
  ];
  const selected = rankedPatterns.reduce((match, pattern) => (
    match || videos.find(video => pattern.test(video?.name || ''))
  ), null) || videos[0];
  const videoId = String(selected?.video_id || '').trim();

  if (!/^[a-zA-Z0-9_-]{6,}$/.test(videoId)) return null;

  return {
    igdbId: igdbId ? String(igdbId) : null,
    videoId,
    embedUrl: `https://www.youtube.com/embed/${encodeURIComponent(videoId)}`,
    name: selected?.name || 'Trailer',
    source: 'igdb-youtube'
  };
}

async function fetchIgdbScreenshots(game) {
  let igdbId = String(game?.igdbId || '').trim();

  if (!igdbId && game?.title) {
    const matches = await searchIgdbGames(game.title, { pageSize: 1 });
    igdbId = matches[0]?.igdbId || '';
  }

  if (!igdbId) return [];

  const data = await igdbFetchJson('screenshots', [
    'fields image_id;',
    `where game = ${Number(igdbId)};`,
    'limit 8;'
  ].join(' '));

  return normalizeIgdbScreenshots(Array.isArray(data) ? data : []);
}

async function fetchIgdbGameDetails(igdbId) {
  const id = String(igdbId || '').trim();
  if (!id) return { error: 'Missing game id' };

  const data = await igdbFetchJson('games', [
    `fields ${igdbGameFields()};`,
    `where id = ${Number(id)};`,
    'limit 1;'
  ].join(' '));

  return normalizeIgdbGame(Array.isArray(data) ? data[0] : null, { includeDescription: true });
}

async function fetchIgdbGameTrailer(game) {
  let igdbId = String(game?.igdbId || '').trim();

  if (!igdbId && game?.title) {
    const matches = await searchIgdbGames(game.title, { pageSize: 1 });
    igdbId = matches[0]?.igdbId || '';
  }

  if (!igdbId) return null;

  const data = await igdbFetchJson('game_videos', [
    'fields name,video_id,game;',
    `where game = ${Number(igdbId)};`,
    'limit 10;'
  ].join(' '));

  return normalizeIgdbTrailer(data, igdbId);
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
    'image/gif': 'gif',
    'video/webm': 'webm',
    'video/mp4': 'mp4',
    'video/quicktime': 'mov',
    'image/vnd.microsoft.icon': 'ico',
    'image/x-icon': 'ico'
  };
  if (mimeExt[artwork?.mime]) return mimeExt[artwork.mime];

  try {
    const ext = path.extname(new URL(artwork.url).pathname).replace('.', '').toLowerCase();
    if (['png', 'jpg', 'jpeg', 'webp', 'gif', 'webm', 'mp4', 'mov', 'ico'].includes(ext)) return ext === 'jpeg' ? 'jpg' : ext;
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
  const extensions = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'ico'];
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

function getCachedFavoriteVaultGridFilePath(gameId) {
  const cacheDir = getGameCacheDir(gameId);
  const extensions = ['png', 'jpg', 'jpeg', 'webp'];
  for (const ext of extensions) {
    const filePath = path.join(cacheDir, `favorite-vault-grid.${ext}`);
    if (fs.existsSync(filePath)) return filePath;
  }
  return null;
}

function getFavoriteVaultGridMetadataPath(gameId) {
  return path.join(getGameCacheDir(gameId), 'favorite-vault-grid.json');
}

function toVersionedArtworkUrl(filePath) {
  const artworkUrl = toArtworkUrl(filePath);
  try {
    const modifiedAt = fs.statSync(filePath).mtimeMs;
    return `${artworkUrl}?v=${Math.round(modifiedAt)}`;
  } catch (e) {
    return artworkUrl;
  }
}

function getCachedFavoriteVaultGrid(gameId) {
  const filePath = getCachedFavoriteVaultGridFilePath(gameId);
  if (!filePath) return null;

  try {
    const metadataPath = getFavoriteVaultGridMetadataPath(gameId);
    if (!fs.existsSync(metadataPath)) return null;

    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
    const isNoLogoGrid =
      metadata?.style === 'no_logo' &&
      Number(metadata.width) === 600 &&
      Number(metadata.height) === 900;

    if (!isNoLogoGrid) return null;

    return {
      filePath,
      metadata
    };
  } catch (e) {
    return null;
  }
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

function scoreSteamStoreMatch(query, result) {
  const normalizedQuery = normalizeGameTitle(query);
  const normalizedName = normalizeGameTitle(result?.name);
  if (!normalizedQuery || !normalizedName) return 0;
  if (normalizedQuery === normalizedName) return 100;

  const queryWords = normalizedQuery.split(' ');
  const nameWords = normalizedName.split(' ');
  const nameSet = new Set(nameWords);
  const sharedWords = queryWords.filter(word => nameSet.has(word)).length;
  const coverage = sharedWords / Math.max(1, new Set(queryWords).size);
  const extraWordsPenalty = Math.max(0, nameWords.length - queryWords.length) * 3;

  let score = Math.round(coverage * 76) - extraWordsPenalty;
  if (normalizedName.includes(normalizedQuery)) score += 20;
  if (normalizedQuery.includes(normalizedName)) score += 12;

  return Math.max(0, Math.min(99, score));
}

async function resolveSteamAppByName(title) {
  const searchTerm = String(title || '').trim();
  if (searchTerm.length < 2) return null;

  const searchUrl = `https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(searchTerm)}&l=english&cc=US`;
  const data = await fetchJson(searchUrl, {
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'NexusLauncher/1.0'
    }
  });

  const matches = (Array.isArray(data?.items) ? data.items : [])
    .filter(item => item?.id && item?.name)
    .map(item => ({
      steamAppId: String(item.id),
      name: item.name,
      tinyImage: item.tiny_image || null,
      matchScore: scoreSteamStoreMatch(searchTerm, item),
      source: 'steam'
    }))
    .sort((a, b) => b.matchScore - a.matchScore);

  return matches.find(match => match.matchScore >= 45) || matches[0] || null;
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

const UNSAFE_STEAMGRIDDB_TAGS = new Set(['adult', 'nsfw', 'epilepsy', 'humor', 'humour']);
const STORE_HERO_DIMENSIONS = ['1920x620', '3840x1240'];

function hasUnsafeSteamGridDBTag(value) {
  const normalized = String(value || '')
    .toLowerCase()
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!normalized) return false;
  if (UNSAFE_STEAMGRIDDB_TAGS.has(normalized) || normalized === 'adult content') return true;
  return normalized.split(/\s+/).some(token => UNSAFE_STEAMGRIDDB_TAGS.has(token));
}

function isSteamGridDBUnsafeFlag(value) {
  return value === true || value === 1 || String(value).toLowerCase() === 'true';
}

function collectSteamGridDBTagText(value, collector = []) {
  if (value == null) return collector;

  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    collector.push(String(value));
    return collector;
  }

  if (Array.isArray(value)) {
    value.forEach(item => collectSteamGridDBTagText(item, collector));
    return collector;
  }

  if (typeof value === 'object') {
    ['name', 'tag', 'slug', 'key', 'label', 'title', 'type'].forEach(key => {
      if (value[key] != null) collectSteamGridDBTagText(value[key], collector);
    });
  }

  return collector;
}

function isUnsafeSteamGridDBArtwork(item) {
  if (!item) return true;

  if (
    isSteamGridDBUnsafeFlag(item.nsfw) ||
    isSteamGridDBUnsafeFlag(item.adult) ||
    isSteamGridDBUnsafeFlag(item.epilepsy) ||
    isSteamGridDBUnsafeFlag(item.humor) ||
    isSteamGridDBUnsafeFlag(item.humour)
  ) {
    return true;
  }

  const tagText = [
    ...collectSteamGridDBTagText(item.tags),
    ...collectSteamGridDBTagText(item.contentTags),
    ...collectSteamGridDBTagText(item.content_tags),
    ...collectSteamGridDBTagText(item.tag)
  ];

  return tagText.some(hasUnsafeSteamGridDBTag);
}

function pickArtwork(items, key) {
  if (!Array.isArray(items) || items.length === 0) return null;
  const activeItems = items.filter(item => item && item.url && !isUnsafeSteamGridDBArtwork(item));
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
      const dimensions = `${item.width || ''}x${item.height || ''}`;
      const dimensionIndex = preferredDimensions.indexOf(dimensions);
      if (dimensionIndex !== -1) value += 10 - dimensionIndex;
      return value;
    };
    return score(b) - score(a);
  })[0];
}

function getSteamGridDBCommunityScore(item) {
  const value = Number(item?.score ?? item?.likes ?? item?.votes ?? 0);
  return Number.isFinite(value) ? value : 0;
}

function getArtworkFormatRank(item) {
  const mime = String(item?.mime || '').toLowerCase();
  let ext = '';
  try {
    ext = path.extname(new URL(item?.url || '').pathname).replace('.', '').toLowerCase();
  } catch (e) { /* ignore */ }

  if (mime.includes('webm') || ext === 'webm') return 4;
  if (mime.includes('mp4') || ext === 'mp4' || ext === 'mov') return 3;
  if (mime.includes('webp') || ext === 'webp') return 2;
  if (mime.includes('gif') || ext === 'gif') return 0;
  return 1;
}

function isVideoArtwork(item) {
  return getArtworkFormatRank(item) >= 3;
}

function pickStoreHeroArtwork(items, options = {}) {
  if (!Array.isArray(items) || items.length === 0) return null;
  const { allowVideo = false, preferSmoothFormats = false } = options;

  const candidates = items.filter(item => {
    if (!item?.url || isUnsafeSteamGridDBArtwork(item)) return false;
    if (!allowVideo && isVideoArtwork(item)) return false;
    return STORE_HERO_DIMENSIONS.includes(`${item.width || ''}x${item.height || ''}`);
  });

  if (candidates.length === 0) return null;

  return [...candidates].sort((a, b) => {
    const aDimensionRank = STORE_HERO_DIMENSIONS.indexOf(`${a.width || ''}x${a.height || ''}`);
    const bDimensionRank = STORE_HERO_DIMENSIONS.indexOf(`${b.width || ''}x${b.height || ''}`);
    if (aDimensionRank !== bDimensionRank) return aDimensionRank - bDimensionRank;

    const score = (item) => {
      let value = 0;
      if (item.verified) value += 10;
      if (item.style === 'official') value += 4;
      if (item.style === 'alternate') value += 2;
      if (preferSmoothFormats) value += getArtworkFormatRank(item) * 8;
      value += getSteamGridDBCommunityScore(item);
      return value;
    };

    return score(b) - score(a);
  })[0] || null;
}

function pickFavoriteVaultGrid(items) {
  if (!Array.isArray(items) || items.length === 0) return null;
  const candidates = items.filter(item => (
    item?.url &&
    item.style === 'no_logo' &&
    Number(item.width) === 600 &&
    Number(item.height) === 900 &&
    !isUnsafeSteamGridDBArtwork(item)
  ));
  if (candidates.length === 0) return null;

  return [...candidates].sort((a, b) => {
    const score = (item) => {
      let value = 0;
      const communityScore = Number(item.score ?? item.likes ?? item.votes ?? 0);

      if (Number.isFinite(communityScore)) value += communityScore;
      if (item.verified) value += 4;

      return value;
    };

    return score(b) - score(a);
  })[0] || null;
}

async function fetchFavoriteVaultGrid(game) {
  if (!game?.id || !game?.title) return { grid: null, error: 'Missing game id or title' };

  const cachedVaultGrid = getCachedFavoriteVaultGrid(game.id);
  if (cachedVaultGrid) {
    emitDiagnostic('SteamGridDB', 'info', `Using cached Favorite Vault no-logo grid for ${game.title}`, cachedVaultGrid.metadata);
    return {
      grid: toVersionedArtworkUrl(cachedVaultGrid.filePath),
      cached: true,
      ...cachedVaultGrid.metadata
    };
  }

  const sgdbGame = await resolveSteamGridDBGame(game);
  if (!sgdbGame?.id) return { grid: null, error: 'No SteamGridDB match found' };

  const endpoint = `/grids/game/${sgdbGame.id}?dimensions=600x900&styles=no_logo&types=static`;
  const apiData = await steamgriddbFetch(endpoint);
  const artwork = pickFavoriteVaultGrid(apiData.data);

  if (!artwork?.url) {
    emitDiagnostic(
      'SteamGridDB',
      'warn',
      `No Steam vertical 2:3 no-logo grid found for ${game.title}`,
      { steamGridDbId: sgdbGame.id, steamGridDbName: sgdbGame.name || game.title }
    );
    return { grid: null, error: 'No Steam vertical 2:3 no-logo grid found' };
  }

  const ext = getExtensionFromArtwork(artwork);
  const destPath = path.join(getGameCacheDir(game.id), `favorite-vault-grid.${ext}`);

  try {
    await downloadImage(artwork.url, destPath);
    const metadata = {
      steamGridDbId: sgdbGame.id,
      steamGridDbName: sgdbGame.name || game.title,
      sourceUrl: artwork.url,
      style: artwork.style || null,
      width: artwork.width || null,
      height: artwork.height || null,
      verified: !!artwork.verified,
      cachedAt: new Date().toISOString()
    };
    fs.writeFileSync(getFavoriteVaultGridMetadataPath(game.id), JSON.stringify(metadata, null, 2), 'utf-8');
    emitDiagnostic('SteamGridDB', 'info', `Downloaded Favorite Vault grid for ${game.title}`, {
      steamGridDbId: sgdbGame.id,
      artworkId: artwork.id || null,
      sourceUrl: artwork.url,
      width: artwork.width,
      height: artwork.height,
      style: artwork.style || null,
      verified: !!artwork.verified
    });
  } catch (err) {
    emitDiagnostic('SteamGridDB', 'warn', `Could not cache Favorite Vault grid for ${game.title}: ${err.message}`, {
      steamGridDbId: sgdbGame.id,
      url: artwork.url
    });
    return {
      grid: artwork.url,
      steamGridDbId: sgdbGame.id,
      steamGridDbName: sgdbGame.name || game.title,
      style: artwork.style || null,
      width: artwork.width || null,
      height: artwork.height || null
    };
  }

  return {
    grid: toVersionedArtworkUrl(destPath),
    steamGridDbId: sgdbGame.id,
    steamGridDbName: sgdbGame.name || game.title,
    style: artwork.style || null,
    width: artwork.width || null,
    height: artwork.height || null
  };
}

function buildSteamGridDBArtworkQuery(params = {}) {
  const searchParams = new URLSearchParams({
    nsfw: 'false',
    humor: 'false',
    epilepsy: 'false',
    ...params
  });
  return searchParams.toString();
}

async function fetchStoreHero(game) {
  if (!game?.id || !game?.title) return { hero: null, error: 'Missing game id or title' };

  const sgdbGame = await resolveSteamGridDBGame(game);
  if (!sgdbGame?.id) return { hero: null, error: 'No SteamGridDB match found' };

  for (const heroType of ['animated', 'static']) {
    const endpoint = `/heroes/game/${sgdbGame.id}?${buildSteamGridDBArtworkQuery({
      dimensions: STORE_HERO_DIMENSIONS.join(','),
      types: heroType
    })}`;

    let apiData = null;
    try {
      apiData = await steamgriddbFetch(endpoint);
    } catch (err) {
      emitDiagnostic('SteamGridDB', 'warn', `Store ${heroType} hero lookup failed for ${game.title}: ${err.message}`, {
        steamGridDbId: sgdbGame.id,
        endpoint
      });
      continue;
    }

    const artwork = pickStoreHeroArtwork(apiData.data);
    if (!artwork?.url) {
      emitDiagnostic('SteamGridDB', 'warn', `No safe ${heroType} store hero found for ${game.title}`, {
        steamGridDbId: sgdbGame.id,
        endpoint
      });
      continue;
    }

    const ext = getExtensionFromArtwork(artwork);
    const destPath = path.join(getGameCacheDir(game.id), `store-hero-${heroType}.${ext}`);
    const metadata = {
      heroType,
      steamGridDbId: sgdbGame.id,
      steamGridDbName: sgdbGame.name || game.title,
      sourceUrl: artwork.url,
      width: artwork.width || null,
      height: artwork.height || null,
      style: artwork.style || null,
      verified: !!artwork.verified
    };

    try {
      await downloadImage(artwork.url, destPath);
      emitDiagnostic('SteamGridDB', 'info', `Downloaded ${heroType} store hero for ${game.title}`, metadata);
      return {
        hero: toVersionedArtworkUrl(destPath),
        ...metadata
      };
    } catch (err) {
      emitDiagnostic('SteamGridDB', 'warn', `Could not cache ${heroType} store hero for ${game.title}: ${err.message}`, {
        ...metadata,
        url: artwork.url
      });
      return {
        hero: artwork.url,
        ...metadata
      };
    }
  }

  return {
    hero: null,
    error: 'No safe SteamGridDB store hero found',
    steamGridDbId: sgdbGame.id,
    steamGridDbName: sgdbGame.name || game.title
  };
}

async function fetchLibraryAnimatedHero(game) {
  if (!game?.id || !game?.title) return { hero: null, error: 'Missing game id or title' };

  const sgdbGame = await resolveSteamGridDBGame(game);
  if (!sgdbGame?.id) return { hero: null, error: 'No SteamGridDB match found' };

  const endpoint = `/heroes/game/${sgdbGame.id}?${buildSteamGridDBArtworkQuery({
    dimensions: STORE_HERO_DIMENSIONS.join(','),
    types: 'animated'
  })}`;

  const apiData = await steamgriddbFetch(endpoint);
  const artwork = pickStoreHeroArtwork(apiData.data, {
    allowVideo: true,
    preferSmoothFormats: true
  });
  if (!artwork?.url) {
    emitDiagnostic('SteamGridDB', 'warn', `No safe animated library hero found for ${game.title}`, {
      steamGridDbId: sgdbGame.id,
      endpoint
    });
    return {
      hero: null,
      error: 'No safe animated library hero found',
      steamGridDbId: sgdbGame.id,
      steamGridDbName: sgdbGame.name || game.title
    };
  }

  const ext = getExtensionFromArtwork(artwork);
  const destPath = path.join(getGameCacheDir(game.id), `library-animated-hero.${ext}`);
  const metadata = {
    heroType: 'animated',
    steamGridDbId: sgdbGame.id,
    steamGridDbName: sgdbGame.name || game.title,
    sourceUrl: artwork.url,
    width: artwork.width || null,
    height: artwork.height || null,
    mime: artwork.mime || null,
    qualityVersion: 2,
    style: artwork.style || null,
    verified: !!artwork.verified
  };

  try {
    await downloadImage(artwork.url, destPath);
    emitDiagnostic('SteamGridDB', 'info', `Downloaded animated library hero for ${game.title}`, metadata);
    return {
      hero: toVersionedArtworkUrl(destPath),
      ...metadata
    };
  } catch (err) {
    emitDiagnostic('SteamGridDB', 'warn', `Could not cache animated library hero for ${game.title}: ${err.message}`, {
      ...metadata,
      url: artwork.url
    });
    return {
      hero: artwork.url,
      ...metadata
    };
  }
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
    { key: 'grid', endpoint: `/grids/game/${sgdbId}?${buildSteamGridDBArtworkQuery({ dimensions: '600x900,342x482,660x930', types: 'static' })}` },
    { key: 'hero', endpoint: `/heroes/game/${sgdbId}?${buildSteamGridDBArtworkQuery({ types: 'static' })}` },
    { key: 'logo', endpoint: `/logos/game/${sgdbId}?${buildSteamGridDBArtworkQuery({ types: 'static' })}` },
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
    fullscreen: true,
    backgroundColor: '#0a0a0f',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  });

  if (process.env.NODE_ENV === 'development' || !app.isPackaged) {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));
  }

  // --- Security: Block unwanted navigation ---
  mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
    const allowed = process.env.NODE_ENV === 'development' || !app.isPackaged
      ? 'http://localhost:5173'
      : `file://${path.join(__dirname, 'dist/index.html').replace(/\\/g, '/')}`;
    if (!navigationUrl.startsWith(allowed)) {
      event.preventDefault();
      console.warn('[Security] Blocked navigation to:', navigationUrl);
    }
  });

  // --- Security: Block new window opens from renderer ---
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    // Only allow safe https: URLs to open in the user's default browser
    if (url.startsWith('https://')) {
      shell.openExternal(url);
    } else {
      console.warn('[Security] Blocked window.open to:', url);
    }
    return { action: 'deny' };
  });

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
ipcMain.on('window-toggle-fullscreen', () => {
  if (mainWindow) {
    mainWindow.setFullScreen(!mainWindow.isFullScreen());
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
    const legacyExists = await fs.promises.access(legacyDbPath).then(() => true).catch(() => false);
    const dbExists = await fs.promises.access(dbPath).then(() => true).catch(() => false);
    if (!dbExists && legacyExists) {
      await fs.promises.copyFile(legacyDbPath, dbPath);
    }
    const finalDbExists = await fs.promises.access(dbPath).then(() => true).catch(() => false);
    if (finalDbExists) {
      const data = JSON.parse(await fs.promises.readFile(dbPath, 'utf-8'));
      const normalized = normalizeArtworkUrlsInDatabase(data);
      await trimCachedLogoArtworkForDatabase(normalized, { getCachedArtworkFilePath, toArtworkUrl, emitDiagnostic });
      return normalized;
    }
  } catch (err) { console.error('Error loading database:', err); }
  return null;
});

ipcMain.handle('save-database', async (event, data) => {
  const dbPath = getDbPath();
  try {
    await fs.promises.writeFile(dbPath, JSON.stringify(normalizeArtworkUrlsInDatabase(data), null, 2), 'utf-8');
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
async function scanDirDepth(dirPath, currentDepth, maxDepth, filesList, diagnostics) {
  if (currentDepth > maxDepth) return;
  try {
    const files = await fs.promises.readdir(dirPath, { withFileTypes: true });
    for (const file of files) {
      const fullPath = path.join(dirPath, file.name);
      if (file.name.startsWith('.') || ['node_modules', '$RECYCLE.BIN', 'System Volume Information', 'Windows', 'Common Files'].some(ex => file.name.includes(ex))) {
        diagnostics.push({ level: 'info', message: `Skipped ignored path ${fullPath}` });
        continue;
      }
      if (file.isDirectory()) {
        await scanDirDepth(fullPath, currentDepth + 1, maxDepth, filesList, diagnostics);
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

async function parseSteamAppManifest(filePath, steamappsDir) {
  try {
    const content = await fs.promises.readFile(filePath, 'utf-8');
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

async function findSteamAppManifests(scanRoot) {
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
      try {
        await fs.promises.access(steamappsDir);
      } catch (e) {
        continue;
      }
      const files = (await fs.promises.readdir(steamappsDir)).filter(file => /^appmanifest_\d+\.acf$/i.test(file));
      for (const file of files) {
        const manifest = await parseSteamAppManifest(path.join(steamappsDir, file), steamappsDir);
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

  try {
    await fs.promises.access(dirPath);
  } catch(e) {
    const message = `Scan path does not exist: ${dirPath || '(empty)'}`;
    emitDiagnostic('Scanner', 'error', message);
    return { files: [], diagnostics: [{ level: 'error', message }] };
  }

  await scanDirDepth(dirPath, 1, 3, filesList, diagnostics);
  const manifests = await findSteamAppManifests(dirPath);
  const files = attachSteamAppIds(filesList, manifests);

  emitDiagnostic('Scanner', files.length ? 'info' : 'warn', `Executable scan completed with ${files.length} result${files.length === 1 ? '' : 's'}`, {
    dirPath,
    manifestCount: manifests.length,
    resultCount: files.length
  });
  diagnostics.slice(-25).forEach(item => emitDiagnostic('Scanner', item.level, item.message));

  return { files, diagnostics, manifestCount: manifests.length };
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

ipcMain.handle('steamgriddb-fetch-favorite-vault-grid', async (event, game) => {
  try {
    return await fetchFavoriteVaultGrid(game);
  } catch (err) {
    emitDiagnostic('SteamGridDB', 'warn', `Favorite Vault grid lookup failed for ${game?.title || 'unknown game'}: ${err.message}`);
    return { grid: null, error: err.message };
  }
});

ipcMain.handle('steamgriddb-fetch-store-hero', async (event, game) => {
  try {
    return await fetchStoreHero(game);
  } catch (err) {
    emitDiagnostic('SteamGridDB', 'warn', `Store hero lookup failed for ${game?.title || 'unknown game'}: ${err.message}`);
    return { hero: null, error: err.message };
  }
});

ipcMain.handle('steamgriddb-fetch-library-animated-hero', async (event, game) => {
  try {
    return await fetchLibraryAnimatedHero(game);
  } catch (err) {
    emitDiagnostic('SteamGridDB', 'warn', `Animated library hero lookup failed for ${game?.title || 'unknown game'}: ${err.message}`);
    return { hero: null, error: err.message };
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

ipcMain.handle('igdb-search-games', async (event, term) => {
  try {
    const results = await searchIgdbGames(term);
    emitDiagnostic('Discovery', results.length ? 'info' : 'warn', `Search for "${term}" returned ${results.length} result${results.length === 1 ? '' : 's'}`, {
      topMatch: results[0] ? { id: results[0].igdbId, name: results[0].title } : null
    });
    return results;
  } catch (err) {
    emitDiagnostic('Discovery', 'error', `Search failed for "${term}": ${err.message}`);
    return { error: err.message };
  }
});

ipcMain.handle('igdb-popular-games', async (event, limit) => {
  try {
    const results = await fetchPopularIgdbGames({ limit });
    emitDiagnostic('Discovery', results.length ? 'info' : 'warn', `Popular feed returned ${results.length} game${results.length === 1 ? '' : 's'}`);
    return results;
  } catch (err) {
    emitDiagnostic('Discovery', 'error', `Popular feed failed: ${err.message}`);
    return { error: err.message };
  }
});

ipcMain.handle('igdb-fetch-screenshots', async (event, game) => {
  try {
    const screenshots = await fetchIgdbScreenshots(game);
    emitDiagnostic('Discovery', screenshots.length ? 'info' : 'warn', `Screenshots for "${game?.title || game?.igdbId || 'unknown'}" returned ${screenshots.length} image${screenshots.length === 1 ? '' : 's'}`);
    return screenshots;
  } catch (err) {
    emitDiagnostic('Discovery', 'error', `Screenshot lookup failed for "${game?.title || game?.igdbId || 'unknown'}": ${err.message}`);
    return { error: err.message };
  }
});

ipcMain.handle('igdb-fetch-game-details', async (event, igdbId) => {
  try {
    return await fetchIgdbGameDetails(igdbId);
  } catch (err) {
    emitDiagnostic('Discovery', 'error', `Details lookup failed for game id ${igdbId}: ${err.message}`);
    return { error: err.message };
  }
});

ipcMain.handle('igdb-fetch-game-trailer', async (event, game) => {
  try {
    const trailer = await fetchIgdbGameTrailer(game);
    emitDiagnostic('Discovery', trailer ? 'info' : 'warn', trailer
      ? `Trailer lookup for "${game?.title || game?.igdbId || 'unknown'}" matched YouTube video ${trailer.videoId}`
      : `No IGDB trailer video found for "${game?.title || game?.igdbId || 'unknown'}"`);
    return trailer;
  } catch (err) {
    emitDiagnostic('Discovery', 'error', `Trailer lookup failed for "${game?.title || game?.igdbId || 'unknown'}": ${err.message}`);
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

ipcMain.handle('resolve-steam-app-id', async (event, title) => {
  try {
    const match = await resolveSteamAppByName(title);
    emitDiagnostic('SteamSearch', match ? 'info' : 'warn', match
      ? `Matched "${title}" to Steam App ID ${match.steamAppId} (${match.name})`
      : `No Steam match found for "${title}"`,
      match
    );
    return match;
  } catch (err) {
    emitDiagnostic('SteamSearch', 'error', `Steam search failed for "${title}": ${err.message}`);
    return { error: err.message };
  }
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

function normalizeSteamReviewSummary(steamAppId, summary) {
  if (!summary || typeof summary !== 'object') return null;

  const totalReviews = Number(summary.total_reviews || 0);
  const totalPositive = Number(summary.total_positive || 0);
  const label = String(summary.review_score_desc || '').trim();

  if (!label || totalReviews === 0) return null;

  return {
    steamAppId: String(steamAppId),
    label,
    totalReviews,
    totalPositive,
    reviewScore: Number(summary.review_score || 0),
    positivePercent: Math.round((totalPositive / totalReviews) * 100),
    source: 'steam'
  };
}

ipcMain.handle('fetch-steam-reviews', async (event, steamAppId) => {
  const appId = String(steamAppId || '').trim();
  if (!/^\d+$/.test(appId)) return null;

  try {
    const url = `https://store.steampowered.com/appreviews/${appId}?json=1&language=all&purchase_type=all&num_per_page=0`;
    const data = await fetchJson(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'NexusLauncher/1.0'
      }
    });

    return normalizeSteamReviewSummary(appId, data?.query_summary);
  } catch (err) {
    emitDiagnostic('SteamReviews', 'error', `Failed to fetch Steam reviews for AppId ${appId}: ${err.message}`);
    return null;
  }
});

ipcMain.handle('fetch-protondb-summary', async (event, steamAppId) => {
  const appId = String(steamAppId || '').trim();
  if (!isValidSteamAppId(appId)) return null;

  const requestOptions = {
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'NexusLauncher/1.0'
    }
  };

  try {
    const data = await fetchJson(`${PROTONDB_COMMUNITY_SUMMARY_BASE}/${appId}/summary`, requestOptions);
    const summary = normalizeProtonDbSummary(appId, data, 'protondb-community');
    if (summary) return summary;
    throw new Error('Community API returned no summary.');
  } catch (communityErr) {
    try {
      const data = await fetchJson(`${PROTONDB_DIRECT_SUMMARY_BASE}/${appId}.json`, requestOptions);
      return normalizeProtonDbSummary(appId, data, 'protondb');
    } catch (directErr) {
      emitDiagnostic(
        'ProtonDB',
        'warn',
        `Failed to fetch ProtonDB summary for AppId ${appId}: ${directErr.message}`,
        { communityError: communityErr.message }
      );
      return null;
    }
  }
});

ipcMain.handle('itad-fetch-json', async (event, requestUrl, apiKey, options = {}) => {
  try {
    const target = new URL(requestUrl);
    if (target.protocol !== 'https:' || target.hostname !== 'api.isthereanydeal.com') {
      return { error: 'Blocked unsupported price request.' };
    }

    const trimmedKey = String(apiKey || '').trim();
    if (!trimmedKey) {
      return { error: 'Missing price API key.' };
    }

    const method = String(options?.method || 'GET').toUpperCase();
    if (method === 'POST') {
      const data = await postJson(target.href, options?.body ?? {}, {
        'Accept': 'application/json',
        'ITAD-API-Key': trimmedKey,
        'User-Agent': 'NexusLauncher/1.0'
      });
      return { data };
    }

    if (method !== 'GET') {
      return { error: 'Unsupported price request method.' };
    }

    const res = await httpsGet(target.href, {
      headers: {
        'Accept': 'application/json',
        'ITAD-API-Key': trimmedKey,
        'User-Agent': 'NexusLauncher/1.0'
      }
    });

    return await new Promise((resolve, reject) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        let parsed = null;
        try {
          parsed = data ? JSON.parse(data) : null;
        } catch (e) {
          reject(new Error(`Invalid price JSON response: ${e.message}`));
          return;
        }

        if (res.statusCode < 200 || res.statusCode >= 300) {
          resolve({
            error: parsed?.message || parsed?.reason_phrase || `Price HTTP ${res.statusCode}`,
            statusCode: res.statusCode
          });
          return;
        }

        resolve({ data: parsed });
      });
      res.on('error', reject);
    });
  } catch (err) {
    emitDiagnostic('Prices', 'error', `Price request failed: ${err.message}`, { requestUrl });
    return { error: err.message };
  }
});

ipcMain.handle('cheapshark-fetch-json', async (event, requestUrl, options = {}) => {
  try {
    const target = new URL(requestUrl);
    if (target.protocol !== 'https:' || target.hostname !== 'www.cheapshark.com' || !target.pathname.startsWith('/api/1.0/')) {
      return { error: 'Blocked unsupported CheapShark request.' };
    }

    const method = String(options?.method || 'GET').toUpperCase();
    if (method !== 'GET') {
      return { error: 'Unsupported CheapShark request method.' };
    }

    const res = await httpsGet(target.href, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'NexusLauncher/1.0'
      }
    });

    return await new Promise((resolve, reject) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        let parsed = null;
        try {
          parsed = data ? JSON.parse(data) : null;
        } catch (e) {
          reject(new Error(`Invalid CheapShark JSON response: ${e.message}`));
          return;
        }

        if (res.statusCode < 200 || res.statusCode >= 300) {
          resolve({
            error: parsed?.message || `CheapShark HTTP ${res.statusCode}`,
            statusCode: res.statusCode
          });
          return;
        }

        resolve({ data: parsed });
      });
      res.on('error', reject);
    });
  } catch (err) {
    emitDiagnostic('Prices', 'error', `CheapShark request failed: ${err.message}`, { requestUrl });
    return { error: err.message };
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

ipcMain.handle('save-igdb-credentials', async (event, credentials = {}) => {
  try {
    const configPath = getConfigPath();
    let config = {};
    if (fs.existsSync(configPath)) config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

    if (Object.prototype.hasOwnProperty.call(credentials, 'clientId')) {
      if (credentials.clientId?.trim()) {
        config.igdbClientId = credentials.clientId.trim();
      } else {
        delete config.igdbClientId;
      }
    }

    if (Object.prototype.hasOwnProperty.call(credentials, 'clientSecret')) {
      if (credentials.clientSecret?.trim()) {
        config.igdbClientSecret = credentials.clientSecret.trim();
      } else {
        delete config.igdbClientSecret;
      }
    }

    igdbTokenCache = null;
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

ipcMain.handle('get-igdb-credentials', async () => {
  const envClientId = process.env.IGDB_CLIENT_ID?.trim();
  const envClientSecret = process.env.IGDB_CLIENT_SECRET?.trim();

  try {
    const configPath = getConfigPath();
    const configExists = await fs.promises.access(configPath).then(() => true).catch(() => false);
    if (configExists) {
      const config = JSON.parse(await fs.promises.readFile(configPath, 'utf-8'));
      return {
        success: true,
        credentials: {
          clientId: envClientId || config.igdbClientId?.trim() || '',
          clientSecret: envClientSecret ? '********' : (config.igdbClientSecret?.trim() ? '********' : ''),
          isCustom: !!(envClientId || config.igdbClientId?.trim())
        }
      };
    }
  } catch (e) { /* ignore */ }
  return {
    success: true,
    credentials: {
      clientId: envClientId || '',
      clientSecret: envClientSecret ? '********' : '',
      isCustom: !!envClientId
    }
  };
});

ipcMain.handle('save-settings', async (event, settings) => {
  try {
    const configPath = getConfigPath();
    let config = {};
    const configExists = await fs.promises.access(configPath).then(() => true).catch(() => false);
    if (configExists) config = JSON.parse(await fs.promises.readFile(configPath, 'utf-8'));
    config.settings = settings;
    await fs.promises.writeFile(configPath, JSON.stringify(config, null, 2), 'utf-8');
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

ipcMain.handle('load-settings', async () => {
  try {
    const configPath = getConfigPath();
    const configExists = await fs.promises.access(configPath).then(() => true).catch(() => false);
    if (configExists) {
      const config = JSON.parse(await fs.promises.readFile(configPath, 'utf-8'));
      return { success: true, settings: config.settings || {} };
    }
    return { success: true, settings: {} };
  } catch (err) {
    return { success: false, error: err.message };
  }
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
