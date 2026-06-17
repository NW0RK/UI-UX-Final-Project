const CHEAPSHARK_API_BASE = 'https://www.cheapshark.com/api/1.0';
const CHEAPSHARK_REDIRECT_BASE = 'https://www.cheapshark.com/redirect';

const DEFAULT_STORE_NAMES = {
  1: 'Steam',
  7: 'GOG',
  8: 'Origin',
  11: 'Humble Store',
  15: 'Fanatical',
  25: 'Epic Games Store',
  31: 'Blizzard Shop',
  35: 'GameBillet'
};

function currency(amount, code = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: code }).format(amount);
}

function numberOrNull(value) {
  const next = Number(value);
  return Number.isFinite(next) ? next : null;
}

async function fetchJson(url, options = {}) {
  const requestUrl = url instanceof URL ? url.toString() : String(url);

  if (typeof window !== 'undefined' && window.electronAPI?.fetchCheapSharkJson) {
    const result = await window.electronAPI.fetchCheapSharkJson(requestUrl, {
      method: options.method || 'GET'
    });
    if (result?.error) throw new Error(result.error);
    return result?.data ?? null;
  }

  const response = await fetch(requestUrl, options);
  if (!response.ok) throw new Error(`CheapShark request failed: ${response.status}`);
  return response.json();
}

async function fetchCheapSharkStores() {
  try {
    const storesUrl = new URL(`${CHEAPSHARK_API_BASE}/stores`);
    const stores = await fetchJson(storesUrl);
    return (Array.isArray(stores) ? stores : []).reduce((map, store) => {
      if (store?.storeID && store?.storeName) {
        map[String(store.storeID)] = store.storeName;
      }
      return map;
    }, {});
  } catch {
    return {};
  }
}

function normalizeCheapSharkDeal(item, storeNames = {}) {
  if (!item?.dealID || !item?.title) return null;

  const salePrice = numberOrNull(item.salePrice);
  const normalPrice = numberOrNull(item.normalPrice);
  const savings = numberOrNull(item.savings);
  const storeName = storeNames[String(item.storeID)] || DEFAULT_STORE_NAMES[item.storeID] || 'CheapShark store';
  const releaseTime = numberOrNull(item.releaseDate);
  const releaseDate = releaseTime && releaseTime > 0
    ? new Date(releaseTime * 1000).toLocaleDateString()
    : 'Tracked price';
  const redirectUrl = `${CHEAPSHARK_REDIRECT_BASE}?dealID=${encodeURIComponent(item.dealID)}`;
  const steamAppId = /^\d+$/.test(String(item.steamAppID || '')) ? String(item.steamAppID) : null;
  const discount = Number.isFinite(savings) ? Math.round(savings) : 0;

  return {
    id: `cheapshark-${item.dealID}`,
    cheapsharkDealId: item.dealID,
    cheapsharkGameId: item.gameID || null,
    title: item.title,
    developer: storeName,
    publisher: storeName,
    genre: 'Store Deal',
    rating: numberOrNull(item.steamRatingPercent) || 0,
    ageRating: 'Unrated',
    releaseDate,
    description: `${item.title} is currently listed through ${storeName}${discount > 0 ? ` with ${discount}% off` : ''}. Deal data is provided by CheapShark.`,
    playtime: 0,
    lastPlayed: 'Never',
    progress: 0,
    timeToComplete: '--',
    nextAchievement: 'Locked (0% complete)',
    coverUrl: item.thumb || null,
    bannerUrl: item.thumb || null,
    logoUrl: null,
    iconUrl: null,
    soundType: 'synth',
    exePath: '',
    isFavorite: false,
    owned: false,
    tags: [
      discount > 0 ? `${discount}% off` : 'Deal',
      storeName,
      'CheapShark'
    ],
    steamAppId,
    steamReviewScore: item.steamRatingText ? {
      source: 'cheapshark',
      label: item.steamRatingText,
      reviewScoreDesc: item.steamRatingText,
      totalPositive: 0,
      totalNegative: 0,
      totalReviews: numberOrNull(item.steamRatingCount) || 0,
      positivePercent: numberOrNull(item.steamRatingPercent) || 0
    } : null,
    artworkFetched: false,
    source: 'cheapshark',
    cheapsharkUrl: redirectUrl,
    cheapsharkDeal: {
      shop: storeName,
      cut: discount,
      price: Number.isFinite(salePrice) ? currency(salePrice) : 'See price',
      regular: Number.isFinite(normalPrice) ? currency(normalPrice) : null,
      rating: numberOrNull(item.dealRating),
      url: redirectUrl
    }
  };
}

export async function fetchCheapSharkBestDeals({ limit = 10 } = {}) {
  const dealsUrl = new URL(`${CHEAPSHARK_API_BASE}/deals`);
  dealsUrl.searchParams.set('pageNumber', '0');
  dealsUrl.searchParams.set('pageSize', String(Math.min(Math.max(limit, 1), 60)));
  dealsUrl.searchParams.set('sortBy', 'DealRating');
  dealsUrl.searchParams.set('desc', '1');
  dealsUrl.searchParams.set('onSale', '1');

  const [deals, storeNames] = await Promise.all([
    fetchJson(dealsUrl),
    fetchCheapSharkStores()
  ]);

  return (Array.isArray(deals) ? deals : [])
    .map(deal => normalizeCheapSharkDeal(deal, storeNames))
    .filter(Boolean)
    .slice(0, limit);
}
