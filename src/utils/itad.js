const ITAD_API_BASE = 'https://api.isthereanydeal.com';
const DEFAULT_ITAD_API_KEY = '3a90499d6e838ec7b1ca664f6004517df06e2aa8';
const DEFAULT_ITAD_CLIENT_ID = 'c148f1514efb8478';
const DEFAULT_ITAD_CLIENT_SECRET = '68dfada7b9d81f36cc171a0cded8176621930c2e';

const STORE_NAMES = ['Steam', 'Humble Store', 'Fanatical', 'GOG', 'Green Man Gaming'];

function hashString(input = '') {
  return Array.from(input).reduce((hash, char) => ((hash << 5) - hash + char.charCodeAt(0)) | 0, 0);
}

function currency(amount, code = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: code }).format(amount);
}

function numberOrNull(value) {
  const next = Number(value);
  return Number.isFinite(next) ? next : null;
}

function priceAmount(price) {
  const amount = numberOrNull(price?.amount);
  if (amount !== null) return amount;

  const amountInt = numberOrNull(price?.amountInt);
  return amountInt !== null ? amountInt / 100 : null;
}

function formatPrice(price, fallbackCurrency = 'USD') {
  const amount = priceAmount(price);
  if (amount === null) return null;
  return currency(amount, price?.currency || fallbackCurrency);
}

function normalizeDealPoint(dealPoint, fallback = null) {
  const price = dealPoint?.price;
  const amount = priceAmount(price);
  if (amount === null) return fallback;

  const time = Date.parse(dealPoint?.timestamp || '');
  const date = Number.isFinite(time) && time > 0
    ? new Date(time).toISOString().slice(0, 10)
    : fallback?.date || 'Tracked date';
  const currencyCode = price?.currency || dealPoint?.regular?.currency || fallback?.currency || 'USD';

  return {
    date,
    time: Number.isFinite(time) && time > 0 ? time : fallback?.time,
    amount,
    formatted: currency(amount, currencyCode),
    shop: dealPoint?.shop?.name || fallback?.shop || 'Tracked shop',
    regular: {
      amount: priceAmount(dealPoint?.regular),
      formatted: formatPrice(dealPoint?.regular, currencyCode)
    }
  };
}

function createSeededHistory(item) {
  const seed = Math.abs(hashString(item.steamAppId || item.id || item.title));
  const regular = [29.99, 39.99, 49.99, 59.99, 69.99][seed % 5];
  const steps = [0.78, 0.64, 0.52, 0.7, 0.44, 0.58, 0.36, 0.62];
  const history = steps.map((modifier, index) => {
    const amount = Number(Math.max(4.99, regular * modifier - ((seed + index) % 4)).toFixed(2));
    const date = new Date();
    date.setMonth(date.getMonth() - (steps.length - index));
    return {
      date: date.toISOString().slice(0, 10),
      amount,
      formatted: currency(amount),
      shop: STORE_NAMES[(seed + index) % STORE_NAMES.length]
    };
  });
  const current = Number(Math.min(regular, history[history.length - 1].amount + 4).toFixed(2));
  const lowest = history.reduce((low, point) => point.amount < low.amount ? point : low, history[0]);

  return {
    source: 'Preview price data',
    itadId: item.steamAppId ? `steam-app/${item.steamAppId}` : null,
    current: { amount: current, formatted: currency(current), shop: STORE_NAMES[seed % STORE_NAMES.length] },
    regular: { amount: regular, formatted: currency(regular) },
    lowestEver: lowest,
    history,
    bundles: [
      {
        id: `${item.id}-bundle-1`,
        title: `${item.title} complete edition bundle`,
        shop: 'Fanatical',
        price: currency(Math.max(6.99, lowest.amount + 3)),
        expiry: 'Ends this week'
      },
      {
        id: `${item.id}-bundle-2`,
        title: `${item.genre || 'Curated'} picks collection`,
        shop: 'Humble',
        price: currency(Math.max(9.99, lowest.amount + 7)),
        expiry: 'Tracked price'
      }
    ],
    giveaways: [
      {
        id: `${item.id}-giveaway`,
        title: seed % 3 === 0 ? `${item.title} trial weekend` : 'No active giveaway for this title',
        shop: seed % 3 === 0 ? 'Steam' : 'Tracked shop',
        status: seed % 3 === 0 ? 'Live' : 'Watching'
      }
    ]
  };
}

function getStoredApiKey() {
  try {
    return localStorage.getItem('nexus_itad_api_key') || DEFAULT_ITAD_API_KEY;
  } catch {
    return DEFAULT_ITAD_API_KEY;
  }
}

function authHeaders(apiKey) {
  return apiKey ? { 'ITAD-API-Key': apiKey } : {};
}

async function fetchJson(url, options = {}) {
  const requestUrl = url instanceof URL ? url.toString() : String(url);
  const apiKey = options.headers?.['ITAD-API-Key'];

  if (typeof window !== 'undefined' && window.electronAPI?.fetchItadJson && apiKey) {
    const result = await window.electronAPI.fetchItadJson(requestUrl, apiKey, {
      method: options.method || 'GET',
      body: options.body || null
    });
    if (result?.error) throw new Error(result.error);
    return result?.data ?? null;
  }

  const browserOptions = options.body && typeof options.body !== 'string'
    ? { ...options, body: JSON.stringify(options.body) }
    : options;
  const response = await fetch(requestUrl, browserOptions);
  if (!response.ok) throw new Error(`Price request failed: ${response.status}`);
  return response.json();
}

async function fetchItadPriceOverview(itadId, { country = 'US' } = {}) {
  const apiKey = getStoredApiKey();
  if (!apiKey) throw new Error('Missing price API key.');
  if (!itadId) throw new Error('Missing price-service game ID.');

  const overviewUrl = new URL(`${ITAD_API_BASE}/games/overview/v2`);
  overviewUrl.searchParams.set('country', country);

  const data = await fetchJson(overviewUrl, {
    method: 'POST',
    headers: {
      ...authHeaders(apiKey),
      'Content-Type': 'application/json'
    },
    body: [itadId]
  });

  return (Array.isArray(data?.prices) ? data.prices : []).find(entry => entry?.id === itadId) || null;
}

function normalizeItadDeal(item) {
  if (!item?.id || !item?.title || item.type === 'dlc') return null;

  const deal = item.deal || {};
  const price = deal.price || {};
  const regular = deal.regular || {};
  const cut = Number(deal.cut || 0);
  const currencyCode = price.currency || regular.currency || 'USD';
  const dealPriceAmount = priceAmount(price);
  const regularAmount = priceAmount(regular);
  const image = item.assets?.boxart || item.assets?.banner600 || item.assets?.banner400 || item.assets?.banner300 || null;
  const shop = deal.shop?.name || 'Tracked shop';
  const expiry = deal.expiry ? new Date(deal.expiry).toLocaleDateString() : null;

  return {
    id: `itad-${item.id}`,
    itadId: item.id,
    itadSlug: item.slug || null,
    title: item.title,
    developer: shop,
    publisher: shop,
    genre: 'Store Deal',
    rating: 0,
    ageRating: item.mature ? 'Mature' : 'Unrated',
    releaseDate: 'Tracked price',
    description: `${item.title} is currently discounted through ${shop}${Number.isFinite(cut) && cut > 0 ? ` with ${cut}% off` : ''}. Price and availability are provided by the store feed.`,
    playtime: 0,
    lastPlayed: 'Never',
    progress: 0,
    timeToComplete: '--',
    nextAchievement: 'Locked (0% complete)',
    coverUrl: image,
    bannerUrl: item.assets?.banner600 || item.assets?.banner400 || image,
    logoUrl: null,
    iconUrl: null,
    soundType: 'synth',
    exePath: '',
    isFavorite: false,
    owned: false,
    tags: [
      Number.isFinite(cut) && cut > 0 ? `${cut}% off` : 'Deal',
      shop,
      'Deal feed'
    ],
    steamAppId: null,
    artworkFetched: false,
    source: 'itad',
    itadUrl: deal.url || null,
    itadDeal: {
      shop,
      cut,
      price: dealPriceAmount !== null ? currency(dealPriceAmount, currencyCode) : 'See price',
      regular: regularAmount !== null ? currency(regularAmount, regular.currency || currencyCode) : null,
      expiry: expiry ? `Ends ${expiry}` : 'Tracked price',
      url: deal.url || null
    }
  };
}

export async function fetchItadBestDeals({ country = 'US', limit = 10 } = {}) {
  const apiKey = getStoredApiKey();
  if (!apiKey) throw new Error('Missing price API key.');

  const dealsUrl = new URL(`${ITAD_API_BASE}/deals/v2`);
  dealsUrl.searchParams.set('country', country);
  dealsUrl.searchParams.set('offset', '0');
  dealsUrl.searchParams.set('limit', String(limit));
  dealsUrl.searchParams.set('sort', '-cut');
  dealsUrl.searchParams.set('nondeals', 'false');
  dealsUrl.searchParams.set('mature', 'false');

  const data = await fetchJson(dealsUrl, { headers: authHeaders(apiKey) });
  return (Array.isArray(data?.list) ? data.list : [])
    .map(normalizeItadDeal)
    .filter(Boolean)
    .slice(0, limit);
}

export function normalizeItadHistory(historyLog = []) {
  return historyLog
    .map(entry => {
      const amount = priceAmount(entry.deal?.price);
      const time = Date.parse(entry.timestamp);
      if (!Number.isFinite(amount) || !Number.isFinite(time) || time <= 0) return null;
      const currencyCode = entry.deal?.price?.currency || entry.deal?.regular?.currency || 'USD';
      return {
        date: new Date(time).toISOString().slice(0, 10),
        time,
        amount,
        formatted: currency(amount, currencyCode),
        shop: entry.shop?.name || 'Tracked shop',
        regular: {
          amount: priceAmount(entry.deal?.regular),
          formatted: formatPrice(entry.deal?.regular, currencyCode)
        }
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.time - b.time);
}

export function toHighchartsHistoryPoints(history = []) {
  return history
    .map(point => [Number(point.time), Number(point.amount)])
    .filter(([time, amount]) => Number.isFinite(time) && time > 0 && Number.isFinite(amount))
    .sort((a, b) => a[0] - b[0]);
}

export function hasItadApiKey() {
  return !!getStoredApiKey();
}

export async function lookupItadGameBySteamAppId(steamAppId) {
  const apiKey = getStoredApiKey();
  if (!apiKey) throw new Error('Missing price API key.');
  if (!steamAppId) throw new Error('Missing Steam App ID.');

  const lookupUrl = new URL(`${ITAD_API_BASE}/games/lookup/v1`);
  lookupUrl.searchParams.set('appid', steamAppId);
  const lookup = await fetchJson(lookupUrl, { headers: authHeaders(apiKey) });
  const itadId = lookup?.id || lookup?.game?.id;
  if (!itadId) throw new Error('Price service could not match this Steam App ID.');
  return { ...lookup, id: itadId };
}

export async function fetchItadHistory(itadId, { country = 'US' } = {}) {
  const apiKey = getStoredApiKey();
  if (!apiKey) throw new Error('Missing price API key.');
  if (!itadId) throw new Error('Missing price-service game ID.');

  const historyUrl = new URL(`${ITAD_API_BASE}/games/history/v2`);
  historyUrl.searchParams.set('id', itadId);
  historyUrl.searchParams.set('country', country);

  const historyLog = await fetchJson(historyUrl, { headers: authHeaders(apiKey) });
  const history = normalizeItadHistory(historyLog);
  return {
    history,
    points: toHighchartsHistoryPoints(history)
  };
}

function normalizeBundles(bundles = []) {
  return bundles.slice(0, 3).map(bundle => {
    const tier = bundle.tiers?.find(t => t.price) || bundle.tiers?.[0];
    const amount = priceAmount(tier?.price);
    const code = tier?.price?.currency || 'USD';
    return {
      id: bundle.id,
      title: bundle.title,
      shop: bundle.page?.name || 'Bundle',
      price: amount !== null ? currency(amount, code) : 'See price',
      expiry: bundle.expiry ? `Ends ${new Date(bundle.expiry).toLocaleDateString()}` : 'Tracked price',
      url: bundle.details || bundle.url
    };
  });
}

export async function getItadStoreInsights(item) {
  const seeded = createSeededHistory(item);
  const apiKey = getStoredApiKey();

  if (!item?.steamAppId || !apiKey) {
    return seeded;
  }

  try {
    const lookup = await lookupItadGameBySteamAppId(item.steamAppId);
    const itadId = lookup.id;

    const bundlesUrl = new URL(`${ITAD_API_BASE}/games/bundles/v2`);
    bundlesUrl.searchParams.set('id', itadId);
    bundlesUrl.searchParams.set('country', 'US');

    const [overview, historyResult, bundles] = await Promise.all([
      fetchItadPriceOverview(itadId, { country: 'US' }),
      fetchItadHistory(itadId, { country: 'US' }),
      fetchJson(bundlesUrl, { headers: authHeaders(apiKey) })
    ]);

    const history = historyResult.history;
    const current = normalizeDealPoint(overview?.current, seeded.current);
    const lowest = normalizeDealPoint(overview?.lowest, history.reduce((low, point) => point.amount < low.amount ? point : low, history[0] || seeded.lowestEver));
    const regular = current?.regular?.formatted
      ? current.regular
      : lowest?.regular?.formatted
        ? lowest.regular
        : seeded.regular;

    return {
      ...seeded,
      source: 'Live price data',
      itadId,
      current,
      lowestEver: lowest,
      regular,
      history: history.length ? history : seeded.history,
      bundles: normalizeBundles(bundles).length ? normalizeBundles(bundles) : seeded.bundles
    };
  } catch (error) {
    console.warn('Falling back to seeded price data:', error);
    return seeded;
  }
}

export function getItadOAuthUrl() {
  const clientId = (() => {
    try {
      return localStorage.getItem('nexus_itad_client_id') || DEFAULT_ITAD_CLIENT_ID;
    } catch {
      return DEFAULT_ITAD_CLIENT_ID;
    }
  })();

  const redirectUri = encodeURIComponent('nexus-launcher://itad/oauth');
  const scope = encodeURIComponent('waitlist collection');
  return clientId
    ? `https://isthereanydeal.com/oauth/authorize/?response_type=code&client_id=${encodeURIComponent(clientId)}&redirect_uri=${redirectUri}&scope=${scope}`
    : 'https://isthereanydeal.com/apps/';
}

export function getItadOAuthStatus() {
  try {
    return {
      hasClientId: !!(localStorage.getItem('nexus_itad_client_id') || DEFAULT_ITAD_CLIENT_ID),
      hasClientSecret: !!(localStorage.getItem('nexus_itad_client_secret') || DEFAULT_ITAD_CLIENT_SECRET),
      isConnected: !!localStorage.getItem('nexus_itad_access_token')
    };
  } catch {
    return { hasClientId: true, hasClientSecret: true, isConnected: false };
  }
}

export async function syncItadUserLibrary() {
  const accessToken = (() => {
    try {
      return localStorage.getItem('nexus_itad_access_token') || '';
    } catch {
      return '';
    }
  })();

  if (!accessToken) {
    return { ok: false, message: 'Connect price-service OAuth before syncing.' };
  }

  try {
    const headers = { Authorization: `Bearer ${accessToken}` };
    const [waitlist, collection] = await Promise.all([
      fetchJson(`${ITAD_API_BASE}/waitlist/games/v1`, { headers }),
      fetchJson(`${ITAD_API_BASE}/collection/games/v1`, { headers })
    ]);

    return {
      ok: true,
      waitlistCount: Array.isArray(waitlist) ? waitlist.length : 0,
      collectionCount: Array.isArray(collection) ? collection.length : 0
    };
  } catch (error) {
    return { ok: false, message: error.message };
  }
}
