export const defaultGames = [];

const libraryCatalog = {};

export function matchGameMetadata(exeName, fullPath) {
  const sanitized = exeName.toLowerCase().replace(/[^a-z0-9]/g, "");

  for (const [key, meta] of Object.entries(libraryCatalog)) {
    if (sanitized.includes(key) || key.includes(sanitized)) {
      return {
        ...meta,
        exePath: fullPath,
        playtime: 0,
        lastPlayed: "Never",
        progress: 0,
        timeToComplete: "--",
        nextAchievement: "Locked (0% complete)",
        rating: 4.5,
        releaseDate: new Date().toISOString().split('T')[0],
        description: `Your scanned copy of ${meta.title}. Imported automatically by Nexus Launcher. Run the game to begin tracking playtime.`,
        isFavorite: false,
        logoUrl: null,
        iconUrl: null,
        artworkFetched: false
      };
    }
  }

  return {
    title: exeName.charAt(0).toUpperCase() + exeName.slice(1).replace(/[-_]/g, ' '),
    developer: "Unknown Developer",
    genre: "Indie Game",
    rating: 4.0,
    releaseDate: new Date().toISOString().split('T')[0],
    description: `A local executable found at ${fullPath}. Fully compatible with Nexus runtime launcher and session playtime counters. Customise this game card using the Metadata Suite.`,
    playtime: 0,
    lastPlayed: "Never",
    progress: 0,
    timeToComplete: "--",
    nextAchievement: "None",
    coverUrl: null,
    bannerUrl: null,
    soundType: "synth",
    exePath: fullPath,
    isFavorite: false,
    owned: true,
    tags: ["Local Import"],
    steamAppId: null,
    logoUrl: null,
    iconUrl: null,
    artworkFetched: false
  };
}

export const storeCatalog = [];
