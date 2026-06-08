const IGDB_BROWSER_PROXY_BASE = '/api/igdb';

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

function igdbImageUrl(imageId, size = 'cover_big_2x') {
  if (!imageId) return null;
  return `https://images.igdb.com/igdb/image/upload/t_${size}/${imageId}.jpg`;
}

function formatDate(unixSeconds) {
  if (!Number.isFinite(Number(unixSeconds))) return 'TBA';
  return new Date(Number(unixSeconds) * 1000).toISOString().slice(0, 10);
}

function formatAgeRating(ageRatings = []) {
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

function companyNames(involvedCompanies = [], flag) {
  return involvedCompanies
    .filter(item => item?.[flag])
    .map(item => item?.company?.name)
    .filter(Boolean);
}

function steamAppIdFromWebsites(websites = []) {
  const steam = websites.find(site => String(site?.url || '').includes('store.steampowered.com/app/'));
  const match = String(steam?.url || '').match(/store\.steampowered\.com\/app\/(\d+)/i);
  return match?.[1] || null;
}

export function normalizeIgdbGame(raw, { includeDescription = false } = {}) {
  if (!raw?.id || !raw?.name) return null;

  const igdbId = String(raw.id);
  const slug = raw.slug || sanitizeGameId(raw.name);
  const developers = companyNames(raw.involved_companies, 'developer');
  const publishers = companyNames(raw.involved_companies, 'publisher');
  const genres = Array.isArray(raw.genres) ? raw.genres.map(item => item?.name).filter(Boolean) : [];
  const themes = Array.isArray(raw.themes) ? raw.themes.map(item => item?.name).filter(Boolean) : [];
  const screenshots = Array.isArray(raw.screenshots) ? raw.screenshots : [];
  const coverUrl = igdbImageUrl(raw.cover?.image_id, 'cover_big_2x');
  const bannerUrl = igdbImageUrl(screenshots[0]?.image_id, 'screenshot_huge_2x') || coverUrl;
  const rating100 = Number(raw.total_rating || raw.rating || raw.aggregated_rating || 0) || 0;
  const description = includeDescription
    ? stripHtml(raw.summary || raw.storyline || '')
    : stripHtml(raw.summary || '');

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
    ageRating: formatAgeRating(raw.age_ratings),
    releaseDate: formatDate(raw.first_release_date),
    description: description || `Open details to load the full game profile for ${raw.name}.`,
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
    steamAppId: steamAppIdFromWebsites(raw.websites),
    artworkFetched: false,
    source: 'igdb'
  };
}

export function normalizeIgdbScreenshots(results = []) {
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

function gameFields() {
  return [
    'name',
    'slug',
    'summary',
    'storyline',
    'first_release_date',
    'total_rating',
    'rating',
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
    'websites.url'
  ].join(',');
}

function escapeIgdbString(value) {
  return String(value || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

async function igdbProxyFetch(endpoint, query) {
  const response = await fetch(`${IGDB_BROWSER_PROXY_BASE}/${endpoint}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'text/plain'
    },
    body: query
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.error || `Discovery request failed: ${response.status}`);
  }

  if (data?.error) throw new Error(data.error);
  return data;
}

export async function searchIgdbGamesBrowser(term, { pageSize = 12 } = {}) {
  const searchTerm = String(term || '').trim();
  if (searchTerm.length < 3) return [];

  const data = await igdbProxyFetch('games', [
    `search "${escapeIgdbString(searchTerm)}";`,
    `fields ${gameFields()};`,
    'where version_parent = null;',
    `limit ${pageSize};`
  ].join(' '));

  return (Array.isArray(data) ? data : [])
    .map(result => normalizeIgdbGame(result))
    .filter(Boolean);
}

export async function fetchIgdbPopularGamesBrowser() {
  const data = await igdbProxyFetch('games', [
    `fields ${gameFields()},hypes,total_rating_count;`,
    'where version_parent = null & cover != null & first_release_date != null;',
    'sort hypes desc;',
    'limit 12;'
  ].join(' '));

  return (Array.isArray(data) ? data : [])
    .map(result => normalizeIgdbGame(result))
    .filter(Boolean)
    .map(game => ({
      ...game,
      discoverySource: 'Popular discovery'
    }));
}

export async function fetchIgdbGameDetailsBrowser(igdbId) {
  const id = String(igdbId || '').trim();
  if (!id) return { error: 'Missing game id' };

  const data = await igdbProxyFetch('games', [
    `fields ${gameFields()};`,
    `where id = ${Number(id)};`,
    'limit 1;'
  ].join(' '));

  return normalizeIgdbGame(Array.isArray(data) ? data[0] : null, { includeDescription: true });
}

export async function fetchIgdbScreenshotsBrowser(game) {
  let igdbId = String(game?.igdbId || '').trim();

  if (!igdbId && game?.title) {
    const matches = await searchIgdbGamesBrowser(game.title, { pageSize: 1 });
    igdbId = matches[0]?.igdbId || '';
  }

  if (!igdbId) return [];

  const data = await igdbProxyFetch('screenshots', [
    'fields image_id;',
    `where game = ${Number(igdbId)};`,
    'limit 8;'
  ].join(' '));

  return normalizeIgdbScreenshots(Array.isArray(data) ? data : []);
}
