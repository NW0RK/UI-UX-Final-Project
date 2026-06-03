export const HLTB_STALE_MS = 30 * 24 * 60 * 60 * 1000;

const seededHltbByKey = {
  cyberpunk: { id: '2127', name: 'Cyberpunk 2077', mainStoryHours: 25, mainExtraHours: 64, completionistHours: 105 },
  cyberpunk2077: { id: '2127', name: 'Cyberpunk 2077', mainStoryHours: 25, mainExtraHours: 64, completionistHours: 105 },
  cyberpunk2077phantomliberty: { id: '128565', name: 'Cyberpunk 2077: Phantom Liberty', mainStoryHours: 13, mainExtraHours: 22, completionistHours: 31 },
  cyberpunk2077phantom: { id: '128565', name: 'Cyberpunk 2077: Phantom Liberty', mainStoryHours: 13, mainExtraHours: 22, completionistHours: 31 },
  dyinglight: { id: '18336', name: 'Dying Light', mainStoryHours: 17.5, mainExtraHours: 36.5, completionistHours: 58 },
  eldenring: { id: '68151', name: 'Elden Ring', mainStoryHours: 59, mainExtraHours: 100, completionistHours: 133 },
  hades: { id: '62941', name: 'Hades', mainStoryHours: 23, mainExtraHours: 49, completionistHours: 95 },
  portal2: { id: '7231', name: 'Portal 2', mainStoryHours: 8.5, mainExtraHours: 13.5, completionistHours: 21.5 },
  witcher3: { id: '10270', name: 'The Witcher 3: Wild Hunt', mainStoryHours: 51.5, mainExtraHours: 103, completionistHours: 173 },
  thewitcher3wildhunt: { id: '10270', name: 'The Witcher 3: Wild Hunt', mainStoryHours: 51.5, mainExtraHours: 103, completionistHours: 173 },
  minecraft: { id: '6064', name: 'Minecraft', mainStoryHours: 0, mainExtraHours: 0, completionistHours: 0 },
  godofwarragnarok: { id: '83146', name: 'God of War Ragnarok', mainStoryHours: 26, mainExtraHours: 40.5, completionistHours: 54 },
  godofwar: { id: '83146', name: 'God of War Ragnarok', mainStoryHours: 26, mainExtraHours: 40.5, completionistHours: 54 },
  marvelsspiderman2: { id: '79769', name: "Marvel's Spider-Man 2", mainStoryHours: 17, mainExtraHours: 22.5, completionistHours: 28.5 },
  spiderman: { id: '79769', name: "Marvel's Spider-Man 2", mainStoryHours: 17, mainExtraHours: 22.5, completionistHours: 28.5 },
  baldursgate3: { id: '68033', name: "Baldur's Gate 3", mainStoryHours: 68, mainExtraHours: 111, completionistHours: 162 },
  zelda: { id: '100668', name: 'The Legend of Zelda: Tears of the Kingdom', mainStoryHours: 59, mainExtraHours: 105, completionistHours: 243 },
  thelegendofzeldatearsofthekingdom: { id: '100668', name: 'The Legend of Zelda: Tears of the Kingdom', mainStoryHours: 59, mainExtraHours: 105, completionistHours: 243 },
  haloinfinite: { id: '57545', name: 'Halo Infinite', mainStoryHours: 11, mainExtraHours: 19, completionistHours: 27 },
  halo: { id: '57545', name: 'Halo Infinite', mainStoryHours: 11, mainExtraHours: 19, completionistHours: 27 },
  finalfantasyviirebirth: { id: '109434', name: 'Final Fantasy VII Rebirth', mainStoryHours: 46.5, mainExtraHours: 91, completionistHours: 168 },
  ff7rebirth: { id: '109434', name: 'Final Fantasy VII Rebirth', mainStoryHours: 46.5, mainExtraHours: 91, completionistHours: 168 },
  starfield: { id: '57445', name: 'Starfield', mainStoryHours: 23, mainExtraHours: 73, completionistHours: 149 },
  horizonforbiddenwest: { id: '79775', name: 'Horizon Forbidden West', mainStoryHours: 29, mainExtraHours: 62, completionistHours: 88 },
  horizon: { id: '79775', name: 'Horizon Forbidden West', mainStoryHours: 29, mainExtraHours: 62, completionistHours: 88 },
  diabloiv: { id: '71960', name: 'Diablo IV', mainStoryHours: 26, mainExtraHours: 44, completionistHours: 104 },
  diablo4: { id: '71960', name: 'Diablo IV', mainStoryHours: 26, mainExtraHours: 44, completionistHours: 104 },
  starwarsjedisurvivor: { id: '108418', name: 'Star Wars Jedi: Survivor', mainStoryHours: 20, mainExtraHours: 31, completionistHours: 54 },
  starwars: { id: '108418', name: 'Star Wars Jedi: Survivor', mainStoryHours: 20, mainExtraHours: 31, completionistHours: 54 },
  liesofp: { id: '106988', name: 'Lies of P', mainStoryHours: 29, mainExtraHours: 37, completionistHours: 58 }
};

function normalizeSeedKey(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function getSeededHltbForGame(game) {
  const seed = seededHltbByKey[normalizeSeedKey(game?.id)] || seededHltbByKey[normalizeSeedKey(game?.title)];
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

export function applySeededHltbToGame(game) {
  if (!game || hasHltbTimes(game.hltb)) return game;
  const seededHltb = getSeededHltbForGame(game);
  return seededHltb ? { ...game, hltb: seededHltb } : game;
}

export function hasHltbTimes(hltb) {
  return !!(
    hltb &&
    (hltb.mainStoryHours || hltb.mainExtraHours || hltb.completionistHours)
  );
}

export function isHltbStale(hltb) {
  if (!hltb?.fetchedAt) return true;
  const fetchedAt = new Date(hltb.fetchedAt).getTime();
  return Number.isNaN(fetchedAt) || Date.now() - fetchedAt > HLTB_STALE_MS;
}

export function shouldFetchHltb(game) {
  return !!game?.title && (!hasHltbTimes(game.hltb) || isHltbStale(game.hltb));
}

export function formatHltbHours(hours) {
  const value = Number(hours);
  if (!value) return 'Not available';
  if (value < 1) return '< 1h';
  return `${Number.isInteger(value) ? value : value.toFixed(1)}h`;
}

export function getPrimaryHltbText(hltb) {
  if (!hasHltbTimes(hltb)) return 'HLTB unavailable';
  return `Main Story: ${formatHltbHours(hltb.mainStoryHours)}`;
}
