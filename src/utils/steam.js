function normalizeTitle(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .replace(/\b(complete|definitive|deluxe|standard|edition|goty|game of the year|remastered|remake)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function scoreSteamSearchMatch(query, result) {
  const normalizedQuery = normalizeTitle(query);
  const normalizedName = normalizeTitle(result?.name);
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

export async function resolveSteamAppIdBrowser(title) {
  const searchTerm = String(title || '').trim();
  if (searchTerm.length < 2) return null;

  const url = new URL('https://store.steampowered.com/api/storesearch/');
  url.searchParams.set('term', searchTerm);
  url.searchParams.set('l', 'english');
  url.searchParams.set('cc', 'US');

  const response = await fetch(url.toString(), {
    headers: { Accept: 'application/json' }
  });
  if (!response.ok) throw new Error(`Steam search failed: ${response.status}`);

  const data = await response.json();
  const matches = (Array.isArray(data?.items) ? data.items : [])
    .filter(item => item?.id && item?.name)
    .map(item => ({
      steamAppId: String(item.id),
      name: item.name,
      tinyImage: item.tiny_image || null,
      matchScore: scoreSteamSearchMatch(searchTerm, item),
      source: 'steam'
    }))
    .sort((a, b) => b.matchScore - a.matchScore);

  return matches.find(match => match.matchScore >= 45) || matches[0] || null;
}

export async function fetchSteamDetailsBrowser(steamAppId) {
  const appId = String(steamAppId || '').trim();
  if (!/^\d+$/.test(appId)) return null;

  const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appId}&l=english&cc=US`);
  if (!response.ok) throw new Error(`Steam details failed: ${response.status}`);

  const data = await response.json();
  return data?.[appId]?.success ? data[appId].data : null;
}

export function normalizeSteamReviewSummary(steamAppId, summary) {
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

export async function fetchSteamReviewSummaryBrowser(steamAppId) {
  const appId = String(steamAppId || '').trim();
  if (!/^\d+$/.test(appId)) return null;

  const response = await fetch(`https://store.steampowered.com/appreviews/${appId}?json=1&language=all&purchase_type=all&num_per_page=0`, {
    headers: { Accept: 'application/json' }
  });
  if (!response.ok) throw new Error(`Steam reviews failed: ${response.status}`);

  const data = await response.json();
  return normalizeSteamReviewSummary(appId, data?.query_summary);
}

export function getSteamStoreBannerUrl(details, steamAppId) {
  const appId = String(steamAppId || '').trim();
  return details?.background_raw ||
    details?.background ||
    details?.header_image ||
    (appId ? `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/header.jpg` : null);
}
