const RAWG_API_BASE = 'https://api.rawg.io/api';
const BUILTIN_RAWG_API_KEY = '10149f0743744f2c82250660ee23bfe2';

function sanitizeGameId(value) {
  return String(value || 'game').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'game';
}

function stripHtml(value) {
  if (!value) return '';
  return String(value)
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&mdash;/g, '-')
    .replace(/&ndash;/g, '-')
    .replace(/&hellip;/g, '...')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

async function rawgFetchJson(endpoint, params = {}) {
  const url = new URL(`${RAWG_API_BASE}${endpoint}`);
  url.searchParams.set('key', import.meta.env?.VITE_RAWG_API_KEY || BUILTIN_RAWG_API_KEY);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && String(value).trim() !== '') {
      url.searchParams.set(key, String(value));
    }
  });

  const response = await fetch(url.toString(), {
    headers: {
      Accept: 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Discovery request failed: ${response.status}`);
  }

  const data = await response.json();
  if (data?.detail || data?.error) {
    throw new Error(data.detail || data.error);
  }

  return data;
}

export function normalizeRawgGame(raw, { includeDescription = false } = {}) {
  if (!raw?.id || !raw?.name) return null;

  const rawgId = String(raw.id);
  const slug = raw.slug || sanitizeGameId(raw.name);
  const developers = Array.isArray(raw.developers) ? raw.developers.map(item => item?.name).filter(Boolean) : [];
  const publishers = Array.isArray(raw.publishers) ? raw.publishers.map(item => item?.name).filter(Boolean) : [];
  const genres = Array.isArray(raw.genres) ? raw.genres.map(item => item?.name).filter(Boolean) : [];
  const tags = Array.isArray(raw.tags)
    ? raw.tags
      .filter(item => !item.language || item.language === 'eng')
      .map(item => item?.name)
      .filter(Boolean)
      .slice(0, 6)
    : [];
  const image = raw.background_image || raw.background_image_additional || raw.short_screenshots?.[0]?.image || null;
  const description = includeDescription
    ? stripHtml(raw.description || raw.description_raw || '')
    : stripHtml(raw.description_raw || '');

  return {
    id: `rawg-${rawgId}`,
    rawgId,
    rawgSlug: slug,
    title: raw.name,
    developer: developers.join(', ') || 'Unknown Developer',
    publisher: publishers.join(', ') || developers.join(', ') || 'Unknown Publisher',
    genre: genres.join(', ') || 'Game',
    rating: Number(raw.rating || 0) || 0,
    ageRating: raw.esrb_rating?.name || 'Unrated',
    releaseDate: raw.released || 'TBA',
    description: description || `Open details to load the full game profile for ${raw.name}.`,
    playtime: 0,
    lastPlayed: 'Never',
    progress: 0,
    timeToComplete: '--',
    nextAchievement: 'Locked (0% complete)',
    coverUrl: image,
    bannerUrl: image,
    logoUrl: null,
    iconUrl: null,
    soundType: 'synth',
    exePath: '',
    isFavorite: false,
    owned: false,
    tags,
    steamAppId: null,
    artworkFetched: false,
    source: 'rawg',
    rawgUrl: `https://rawg.io/games/${slug}`
  };
}

export function normalizeRawgScreenshots(results = []) {
  return results
    .map((shot, index) => {
      const image = shot?.image || shot?.path_full || shot?.url;
      if (!image) return null;
      return {
        id: shot.id || `rawg-${index}`,
        path_full: image,
        path_thumbnail: image
      };
    })
    .filter(Boolean);
}

export async function searchRawgGamesBrowser(term, { pageSize = 12 } = {}) {
  const searchTerm = String(term || '').trim();
  if (searchTerm.length < 3) return [];

  const data = await rawgFetchJson('/games', {
    search: searchTerm,
    page_size: pageSize
  });

  return (Array.isArray(data?.results) ? data.results : [])
    .map(result => normalizeRawgGame(result))
    .filter(Boolean);
}

export async function fetchRawgPopularGamesBrowser() {
  const data = await rawgFetchJson('/games', {
    page_size: 12,
    ordering: '-added',
    metacritic: '75,100'
  });

  return (Array.isArray(data?.results) ? data.results : [])
    .map(result => normalizeRawgGame(result))
    .filter(Boolean)
    .map(game => ({
      ...game,
      discoverySource: 'Popular discovery'
    }));
}

export async function fetchRawgGameDetailsBrowser(rawgId) {
  const id = String(rawgId || '').trim();
  if (!id) return { error: 'Missing game id' };

  const data = await rawgFetchJson(`/games/${encodeURIComponent(id)}`);
  return normalizeRawgGame(data, { includeDescription: true });
}

export async function fetchRawgScreenshotsBrowser(game) {
  let rawgId = String(game?.rawgId || '').trim();

  if (!rawgId && game?.title) {
    const matches = await searchRawgGamesBrowser(game.title, { pageSize: 1 });
    rawgId = matches[0]?.rawgId || '';
  }

  if (!rawgId) return [];

  const data = await rawgFetchJson(`/games/${encodeURIComponent(rawgId)}/screenshots`, {
    page_size: 8
  });

  return normalizeRawgScreenshots(Array.isArray(data?.results) ? data.results : []);
}
