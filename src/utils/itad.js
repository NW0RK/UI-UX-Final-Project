const ITAD_API_BASE = 'https://api.isthereanydeal.com';

const STORE_NAMES = ['Steam', 'Humble Store', 'Fanatical', 'GOG', 'Green Man Gaming'];

function hashString(input = '') {
  return Array.from(input).reduce((hash, char) => ((hash << 5) - hash + char.charCodeAt(0)) | 0, 0);
}

function currency(amount, code = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: code }).format(amount);
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
    source: 'Seeded ITAD preview',
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
        expiry: 'Tracked by ITAD'
      }
    ],
    giveaways: [
      {
        id: `${item.id}-giveaway`,
        title: seed % 3 === 0 ? `${item.title} trial weekend` : 'No active giveaway for this title',
        shop: seed % 3 === 0 ? 'Steam' : 'ITAD',
        status: seed % 3 === 0 ? 'Live' : 'Watching'
      }
    ]
  };
}

function getStoredApiKey() {
  try {
    return localStorage.getItem('nexus_itad_api_key') || '';
  } catch {
    return '';
  }
}

function authHeaders(apiKey) {
  return apiKey ? { 'ITAD-API-Key': apiKey } : {};
}

async function fetchJson(url, options = {}) {
  const requestUrl = url instanceof URL ? url.toString() : String(url);
  const apiKey = options.headers?.['ITAD-API-Key'];

  if (typeof window !== 'undefined' && window.electronAPI?.fetchItadJson && apiKey) {
    const result = await window.electronAPI.fetchItadJson(requestUrl, apiKey);
    if (result?.error) throw new Error(result.error);
    return result?.data ?? null;
  }

  const response = await fetch(requestUrl, options);
  if (!response.ok) throw new Error(`ITAD request failed: ${response.status}`);
  return response.json();
}

export function normalizeItadHistory(historyLog = []) {
  return historyLog
    .map(entry => {
      const amount = entry.deal?.price?.amount;
      const time = Date.parse(entry.timestamp);
      if (!Number.isFinite(amount) || !Number.isFinite(time) || time <= 0) return null;
      const currencyCode = entry.deal.price.currency || 'USD';
      return {
        date: new Date(time).toISOString().slice(0, 10),
        time,
        amount,
        formatted: currency(amount, currencyCode),
        shop: entry.shop?.name || 'Tracked shop'
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
  if (!apiKey) throw new Error('Missing ITAD API key.');
  if (!steamAppId) throw new Error('Missing Steam App ID.');

  const lookupUrl = new URL(`${ITAD_API_BASE}/games/lookup/v1`);
  lookupUrl.searchParams.set('appid', steamAppId);
  const lookup = await fetchJson(lookupUrl, { headers: authHeaders(apiKey) });
  const itadId = lookup?.id || lookup?.game?.id;
  if (!itadId) throw new Error('ITAD could not match this Steam App ID.');
  return { ...lookup, id: itadId };
}

export async function fetchItadHistory(itadId, { country = 'US' } = {}) {
  const apiKey = getStoredApiKey();
  if (!apiKey) throw new Error('Missing ITAD API key.');
  if (!itadId) throw new Error('Missing ITAD game ID.');

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
    const amount = tier?.price?.amount;
    const code = tier?.price?.currency || 'USD';
    return {
      id: bundle.id,
      title: bundle.title,
      shop: bundle.page?.name || 'Bundle',
      price: Number.isFinite(amount) ? currency(amount, code) : 'See ITAD',
      expiry: bundle.expiry ? `Ends ${new Date(bundle.expiry).toLocaleDateString()}` : 'Tracked by ITAD',
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

    const [historyResult, bundles] = await Promise.all([
      fetchItadHistory(itadId, { country: 'US' }),
      fetchJson(bundlesUrl, { headers: authHeaders(apiKey) })
    ]);

    const history = historyResult.history;
    const lowest = history.reduce((low, point) => point.amount < low.amount ? point : low, history[0] || seeded.lowestEver);
    const current = history[history.length - 1] || seeded.current;

    return {
      ...seeded,
      source: 'IsThereAnyDeal API',
      itadId,
      current,
      lowestEver: lowest,
      history: history.length ? history : seeded.history,
      bundles: normalizeBundles(bundles).length ? normalizeBundles(bundles) : seeded.bundles
    };
  } catch (error) {
    console.warn('Falling back to seeded ITAD data:', error);
    return seeded;
  }
}

export function getItadOAuthUrl() {
  const clientId = (() => {
    try {
      return localStorage.getItem('nexus_itad_client_id') || '';
    } catch {
      return '';
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
      hasClientId: !!localStorage.getItem('nexus_itad_client_id'),
      isConnected: !!localStorage.getItem('nexus_itad_access_token')
    };
  } catch {
    return { hasClientId: false, isConnected: false };
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
    return { ok: false, message: 'Connect ITAD OAuth before syncing.' };
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
