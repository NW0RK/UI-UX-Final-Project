const STUDIO_DOMAINS = {
  '343 industries': 'xbox.com',
  'bethesda game studios': 'bethesda.net',
  'blizzard entertainment': 'blizzard.com',
  'cd projekt red': 'cdprojektred.com',
  fromsoftware: 'fromsoftware.jp',
  'guerrilla games': 'guerrilla-games.com',
  'insomniac games': 'insomniac.games',
  'larian studios': 'larian.com',
  mojang: 'minecraft.net',
  'neowiz games': 'neowiz.com',
  'nintendo epd': 'nintendo.com',
  'respawn entertainment': 'respawn.com',
  'santa monica studio': 'sms.playstation.com',
  'square enix': 'square-enix.com',
  'supergiant games': 'supergiantgames.com',
  valve: 'valvesoftware.com'
};

const normalizeStudioName = (studioName) =>
  String(studioName || '').trim().toLowerCase();

const fallbackDomainFromStudioName = (studioName) => {
  const slug = normalizeStudioName(studioName)
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '')
    .trim();

  return slug ? `${slug}.com` : null;
};

const createBrandfetchUrl = (domain, clientId, pathParts = [], cacheVersion = 0) => {
  const cacheBust = Number(cacheVersion) > 0 ? `&v=${encodeURIComponent(cacheVersion)}` : '';
  return `https://cdn.brandfetch.io/domain/${encodeURIComponent(domain)}/${pathParts.join('/')}?c=${encodeURIComponent(clientId)}${cacheBust}`;
};

export const getBrandfetchStudioLogoSources = (studioName, clientId, cacheVersion = 0) => {
  const normalized = normalizeStudioName(studioName);
  const cleanClientId = String(clientId || '').trim();

  if (!normalized || !cleanClientId) return null;

  const domain = STUDIO_DOMAINS[normalized] || fallbackDomainFromStudioName(studioName);
  if (!domain) return null;

  return {
    lightLogoUrl: createBrandfetchUrl(domain, cleanClientId, ['w', '820', 'h', '352', 'theme', 'light', 'logo'], cacheVersion),
    lightLogoProbeUrl: createBrandfetchUrl(domain, cleanClientId, ['w', '820', 'h', '352', 'theme', 'light', 'fallback', '404', 'type', 'logo'], cacheVersion),
    defaultLogoUrl: createBrandfetchUrl(domain, cleanClientId, ['w', '800', 'h', '228', 'logo'], cacheVersion),
    defaultLogoProbeUrl: createBrandfetchUrl(domain, cleanClientId, ['w', '800', 'h', '228', 'fallback', '404', 'type', 'logo'], cacheVersion),
    iconUrl: createBrandfetchUrl(domain, cleanClientId, ['w', '400', 'h', '400', 'fallback', 'lettermark'], cacheVersion)
  };
};
