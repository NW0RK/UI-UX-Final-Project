export function applyArtworkToGame(game, artworkResult) {
  if (!game || !artworkResult) return game;
  const updated = { ...game };
  if (artworkResult.grid) updated.coverUrl = artworkResult.grid;
  if (artworkResult.hero) updated.bannerUrl = artworkResult.hero;
  if (artworkResult.logo) updated.logoUrl = artworkResult.logo;
  if (artworkResult.icon) updated.iconUrl = artworkResult.icon;
  if (artworkResult.steamGridDbId) updated.steamGridDbId = artworkResult.steamGridDbId;
  if (artworkResult.steamGridDbName) updated.steamGridDbName = artworkResult.steamGridDbName;
  updated.artworkFetched = hasAnyArtwork(updated);
  return updated;
}

export function hasAnyArtwork(game) {
  if (!game) return false;
  return !!(game.coverUrl || game.bannerUrl || game.logoUrl || game.iconUrl);
}
