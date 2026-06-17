export const PROTONDB_COMMUNITY_SUMMARY_BASE = 'https://protondb-community-api-04f42bc1742f.herokuapp.com/api/games';
export const PROTONDB_DIRECT_SUMMARY_BASE = 'https://www.protondb.com/api/v1/reports/summaries';

const TIER_META = {
  platinum: { label: 'Platinum', className: 'platinum' },
  gold: { label: 'Gold', className: 'gold' },
  silver: { label: 'Silver', className: 'silver' },
  bronze: { label: 'Bronze', className: 'bronze' },
  borked: { label: 'Borked', className: 'borked' },
  pending: { label: 'Pending', className: 'unavailable' },
  unknown: { label: 'Unavailable', className: 'unavailable' }
};

export function isValidSteamAppId(steamAppId) {
  return /^\d+$/.test(String(steamAppId || '').trim());
}

export function getProtonDbTierMeta(tier) {
  const key = String(tier || '').trim().toLowerCase();
  return TIER_META[key] || {
    label: key ? key.replace(/^\w/, char => char.toUpperCase()) : TIER_META.unknown.label,
    className: key || TIER_META.unknown.className
  };
}

export function normalizeProtonDbSummary(steamAppId, summary, source = 'protondb') {
  const appId = String(steamAppId || '').trim();
  if (!isValidSteamAppId(appId) || !summary || typeof summary !== 'object') return null;

  const tier = String(summary.tier || summary.bestReportedTier || summary.trendingTier || '').trim().toLowerCase();
  const tierMeta = getProtonDbTierMeta(tier);
  const total = Number(summary.total || 0);
  const score = Number(summary.score || 0);

  return {
    source,
    steamAppId: appId,
    tier: tier || null,
    bestReportedTier: summary.bestReportedTier || null,
    trendingTier: summary.trendingTier || null,
    confidence: summary.confidence || null,
    score: Number.isFinite(score) && score > 0 ? score : null,
    total: Number.isFinite(total) && total > 0 ? total : 0,
    label: tierMeta.label,
    className: tierMeta.className,
    fetchedAt: new Date().toISOString()
  };
}

export function getProtonDbSummary(summary) {
  if (summary && typeof summary === 'object' && summary.label) {
    return {
      ...summary,
      className: getProtonDbTierMeta(summary.tier || summary.label).className
    };
  }

  return null;
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json'
    }
  });

  if (!response.ok) throw new Error(`ProtonDB request failed: ${response.status}`);
  return response.json();
}

export async function fetchProtonDbSummaryBrowser(steamAppId) {
  const appId = String(steamAppId || '').trim();
  if (!isValidSteamAppId(appId)) return null;

  const communityUrl = `${PROTONDB_COMMUNITY_SUMMARY_BASE}/${appId}/summary`;
  const directUrl = `${PROTONDB_DIRECT_SUMMARY_BASE}/${appId}.json`;

  try {
    const data = await fetchJson(communityUrl);
    return normalizeProtonDbSummary(appId, data, 'protondb-community');
  } catch (communityError) {
    const data = await fetchJson(directUrl);
    return normalizeProtonDbSummary(appId, data, 'protondb');
  }
}
