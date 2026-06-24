import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import NavigationHeader from './components/NavigationHeader';
import InteractiveCanvas from './components/InteractiveCanvas';
import HorizontalLibrary from './components/HorizontalLibrary';
import GameMainBanner from './components/GameMainBanner';
import ControlCenter from './components/ControlCenter';
import SettingsPanel from './components/SettingsPanel';
import MetadataEditor from './components/MetadataEditor';
import StoreGrid from './components/StoreGrid';
import StoreItemPage from './components/StoreItemPage';
import SearchResultsPage from './components/SearchResultsPage';
import FavouritesTrophyRoom from './components/FavouritesTrophyRoom';
import ProfileOverlay from './components/ProfileOverlay';
import ControllerHintOverlay from './components/ControllerHintOverlay';
import ImportNamePrompt from './components/ImportNamePrompt';
import { useUnifiedInput } from './hooks/useUnifiedInput';
import { defaultGames, matchGameMetadata, storeCatalog } from './utils/mockDatabase';
import { applyArtworkToGame, needsSteamGridDBArtwork } from './utils/steamgriddb';
import { applySeededHltbToGame, shouldFetchHltb } from './utils/hltb';
import { fetchCheapSharkBestDeals } from './utils/cheapshark';
import { fetchItadBestDeals } from './utils/itad';
import { fetchIgdbGameDetailsBrowser, fetchIgdbGameTrailerBrowser, fetchIgdbPopularGamesBrowser, fetchIgdbScreenshotsBrowser, searchIgdbGamesBrowser } from './utils/igdb';
import { fetchSteamDetailsBrowser, fetchSteamReviewSummaryBrowser, getSteamStoreBannerUrl, resolveSteamAppIdBrowser } from './utils/steam';
import { fetchProtonDbSummaryBrowser, isValidSteamAppId } from './utils/protondb';
import { audioEngine } from './utils/audioEngine';
const DEFAULT_SETTINGS = {
  theme: 'theme-gold',
  isMuted: false,
  menuMusicEnabled: true,
  launcherVolume: 1.0,
  glassBlur: 20,
  glassOpacity: 0.4,
  particleDensity: 1.0,
  particleSpeed: 1.0,
  trackSystemStatus: true,
  bannerAnimation: true,
  libraryTrailerAutoplay: true,
  libraryTrailerMutedByDefault: false,
  fontScale: 1.0,
  studioLogosEnabled: false,
  brandfetchClientId: '1idcoEyG7GtzdighKVU',
  protonDbEnabled: false
};

const MAX_STORE_DETAIL_CACHE_ENTRIES = 80;
const STORE_TRENDING_FEED_LIMIT = 20;
const PRIMARY_VIEWS = ['store', 'library', 'favourites'];

function normalizeStoreCacheTitle(title) {
  return String(title || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .trim();
}

function getStoreItemCacheKey(item) {
  if (!item) return null;

  const steamAppId = String(item.steamAppId || '').trim();
  if (/^\d+$/.test(steamAppId)) return `steam:${steamAppId}`;

  const igdbId = String(item.igdbId || '').trim();
  if (igdbId) return `igdb:${igdbId}`;

  const rawgId = String(item.rawgId || '').trim();
  if (rawgId) return `rawg:${rawgId}`;

  const itadId = String(item.itadId || '').trim();
  if (itadId) return `itad:${itadId}`;

  const title = normalizeStoreCacheTitle(item.title);
  return title ? `title:${title}` : null;
}

function getStoreItemCacheAliases(item, resolvedSteamAppId = null) {
  const aliases = new Set();
  const steamAppId = String(resolvedSteamAppId || item?.steamAppId || '').trim();
  if (/^\d+$/.test(steamAppId)) aliases.add(`steam:${steamAppId}`);
  const igdbId = String(item?.igdbId || '').trim();
  if (igdbId) aliases.add(`igdb:${igdbId}`);
  const rawgId = String(item?.rawgId || '').trim();
  if (rawgId) aliases.add(`rawg:${rawgId}`);
  const itadId = String(item?.itadId || '').trim();
  if (itadId) aliases.add(`itad:${itadId}`);
  const cheapsharkGameId = String(item?.cheapsharkGameId || '').trim();
  if (cheapsharkGameId) aliases.add(`cheapshark:${cheapsharkGameId}`);
  const title = normalizeStoreCacheTitle(item?.title);
  if (title) aliases.add(`title:${title}`);
  return [...aliases];
}

function getSelectedStoreMedia(media) {
  const movies = Array.isArray(media?.movies) ? media.movies : [];
  const screenshots = Array.isArray(media?.screenshots) ? media.screenshots : [];

  if (movies.length > 0) {
    return {
      type: 'video',
      url: movies[0].mp4?.max || movies[0].mp4?.['480'] || movies[0].webm?.max,
      thumbnail: movies[0].thumbnail
    };
  }

  if (screenshots.length > 0) {
    return { type: 'image', url: screenshots[0].path_full || screenshots[0].url };
  }

  return null;
}

function buildStorePrefetchMedia(item, steamAppId, steamDetails, igdbScreenshots = []) {
  if (steamDetails && (steamDetails.screenshots?.length || steamDetails.movies?.length)) {
    const media = {
      screenshots: steamDetails.screenshots || [],
      movies: steamDetails.movies || []
    };
    const steamBanner = getSteamStoreBannerUrl(steamDetails, steamAppId) ||
      media.screenshots[0]?.path_full ||
      media.screenshots[0]?.url ||
      null;
    return {
      media,
      selectedMedia: getSelectedStoreMedia(media),
      bannerUrl: steamBanner,
      mediaSource: 'steam'
    };
  }

  if (steamAppId) {
    const steamImage = getSteamStoreBannerUrl(steamDetails, steamAppId);
    const media = {
      screenshots: steamImage ? [{ id: 'steam-hero', path_full: steamImage, path_thumbnail: steamImage }] : [],
      movies: []
    };
    return {
      media,
      selectedMedia: getSelectedStoreMedia(media),
      bannerUrl: steamImage || null,
      mediaSource: 'steam'
    };
  }

  const igdbFetchedImage = igdbScreenshots[0]?.path_full || igdbScreenshots[0]?.url || null;
  const igdbImage = igdbFetchedImage || item?.bannerUrl || item?.coverUrl || null;
  const screenshots = igdbScreenshots.length
    ? igdbScreenshots
    : igdbImage
      ? [{ id: 'igdb-hero', path_full: igdbImage, path_thumbnail: igdbImage }]
      : [];
  const media = { screenshots, movies: [] };

  return {
    media,
    selectedMedia: getSelectedStoreMedia(media),
    bannerUrl: igdbFetchedImage,
    mediaSource: igdbScreenshots.length ? 'igdb' : 'fallback'
  };
}

function hasUsableStoreMedia(detailRecord) {
  if (!detailRecord?.mediaSource || detailRecord.mediaSource === 'fallback' || detailRecord.mediaSource === 'mock') {
    return false;
  }

  const screenshots = Array.isArray(detailRecord?.media?.screenshots) ? detailRecord.media.screenshots : [];
  const movies = Array.isArray(detailRecord?.media?.movies) ? detailRecord.media.movies : [];
  return Boolean(detailRecord?.mediaLoaded && (screenshots.length > 0 || movies.length > 0));
}

function stripTransientStoreArtwork(item) {
  if (!item) return item;
  const {
    coverUrl,
    bannerUrl,
    logoUrl,
    iconUrl,
    artworkFetched,
    artworkSource,
    steamGridDbId,
    steamGridDbName,
    bannerLayout,
    ...rest
  } = item;
  return {
    ...rest,
    coverUrl: null,
    bannerUrl: null,
    logoUrl: null,
    iconUrl: null,
    artworkFetched: false,
    artworkSource: null,
    steamGridDbId: null,
    steamGridDbName: null,
    bannerLayout: null
  };
}

function applyStoreDetailMediaToGame(game, detailRecord) {
  if (!game || !detailRecord) return game;

  const updated = { ...game };
  const resolvedSteamAppId = String(detailRecord.resolvedSteamAppId || detailRecord.steamAppId || '').trim();

  if (/^\d+$/.test(resolvedSteamAppId) && !updated.steamAppId) {
    updated.steamAppId = resolvedSteamAppId;
  }

  if (detailRecord.steamMatchName && !updated.steamMatchName) {
    updated.steamMatchName = detailRecord.steamMatchName;
  }

  if (detailRecord.steamMatchScore != null && updated.steamMatchScore == null) {
    updated.steamMatchScore = detailRecord.steamMatchScore;
  }

  if (detailRecord.steamReviewScore && !updated.steamReviewScore) {
    updated.steamReviewScore = detailRecord.steamReviewScore;
  }

  if (detailRecord.protonDbSummary && !updated.protonDbSummary) {
    updated.protonDbSummary = detailRecord.protonDbSummary;
  }

  const hasFetchedDetailBanner = detailRecord.mediaSource && detailRecord.mediaSource !== 'fallback';
  if (hasFetchedDetailBanner && detailRecord.bannerUrl && (!updated.bannerUrl || updated.artworkSource !== 'steamgriddb')) {
    updated.bannerUrl = detailRecord.bannerUrl;
  }

  if (!hasUsableStoreMedia(detailRecord)) {
    return updated;
  }

  return {
    ...updated,
    media: detailRecord.media,
    selectedMedia: detailRecord.selectedMedia || getSelectedStoreMedia(detailRecord.media),
    mediaLoaded: true,
    mediaSource: detailRecord.mediaSource || 'store-detail',
    mediaFetchedAt: new Date().toISOString()
  };
}

function getExecutableNameFromPath(filePath) {
  return String(filePath || '')
    .split(/[\\/]/)
    .pop()
    .replace(/\.exe$/i, '');
}

function formatExecutableTitle(value) {
  return String(value || 'Game')
    .replace(/\.exe$/i, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, char => char.toUpperCase()) || 'Game';
}

function normalizeImportFile(file) {
  const path = typeof file === 'string' ? file : file?.path;
  const rawName = typeof file === 'string'
    ? getExecutableNameFromPath(file)
    : file?.name || getExecutableNameFromPath(path);

  return {
    name: rawName || 'Game',
    suggestedTitle: formatExecutableTitle(rawName),
    path,
    steamAppId: typeof file === 'string' ? null : file?.steamAppId || null
  };
}

function createImportedGameId(title, exePath) {
  const titleKey = String(title || 'game').toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 34) || 'game';
  const pathKey = String(exePath || '').toLowerCase().replace(/[^a-z0-9]+/g, '').slice(-8);
  return `${titleKey}${pathKey}${Math.floor(Math.random() * 1000)}`;
}

function hasUsefulDescription(game) {
  const description = String(game?.description || '').trim();
  if (!description) return false;
  return !/^Open details to load/i.test(description) &&
    !/^A local executable found/i.test(description) &&
    !/^Your scanned copy/i.test(description);
}

function applyFavoriteVaultGridToGame(game, vaultGridResult) {
  if (!game || !vaultGridResult?.grid) return game;
  return {
    ...game,
    favoriteVaultGridUrl: vaultGridResult.grid,
    favoriteVaultGridFetched: true,
    favoriteVaultGridSource: 'steamgriddb',
    favoriteVaultGridStyle: vaultGridResult.style || 'no_logo',
    favoriteVaultGridWidth: vaultGridResult.width || null,
    favoriteVaultGridHeight: vaultGridResult.height || null,
    favoriteVaultGridFetchedAt: new Date().toISOString()
  };
}

export default function App() {
  // --- Mode and Core States ---
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState('library');
  const [selectedStoreItem, setSelectedStoreItem] = useState(null);
  const [storeReturnView, setStoreReturnView] = useState('store');
  
  // --- Active Gameplay Session Tracking ---
  const [runningGameId, setRunningGameId] = useState(null);
  const [sessionTime, setSessionTime] = useState(0);
  const sessionTimerRef = useRef(null);

  const [isCcOpen, setIsCcOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMetadataOpen, setIsMetadataOpen] = useState(false);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [settingsReady, setSettingsReady] = useState(false);
  const settingsLoadedRef = useRef(false);
  
  // --- Editable Gold Profile Screen States ---
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('nexus_username') || 'User';
  });
  const [userAvatar, setUserAvatar] = useState(() => {
    return localStorage.getItem('nexus_user_avatar') || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=150&auto=format&fit=crop';
  });
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleUsernameChange = (newName) => {
    setUsername(newName);
    localStorage.setItem('nexus_username', newName);
  };

  const handleAvatarChange = (newAvatar) => {
    setUserAvatar(newAvatar);
    localStorage.setItem('nexus_user_avatar', newAvatar);
  };
  const [isBatchFetchingArtwork, setIsBatchFetchingArtwork] = useState(false);
  const [bannerEditMode, setBannerEditMode] = useState(false);
  const [storeArtwork, setStoreArtwork] = useState({});
  const [storeReviewScores, setStoreReviewScores] = useState({});
  const [storeProtonDbSummaries, setStoreProtonDbSummaries] = useState({});
  const [popularStoreGames, setPopularStoreGames] = useState([]);
  const [popularStoreStatus, setPopularStoreStatus] = useState('idle');
  const [popularStoreError, setPopularStoreError] = useState(null);
  const [itadDealGames, setItadDealGames] = useState([]);
  const [itadDealsStatus, setItadDealsStatus] = useState('idle');
  const [itadDealsError, setItadDealsError] = useState(null);
  const [igdbSearchResults, setIgdbSearchResults] = useState([]);
  const [igdbSearchStatus, setIgdbSearchStatus] = useState('idle');
  const [igdbSearchError, setIgdbSearchError] = useState(null);
  const [storeDetailCache, setStoreDetailCache] = useState({});
  const [diagnostics, setDiagnostics] = useState([]);
  const [importQueue, setImportQueue] = useState([]);
  const [importPromptIndex, setImportPromptIndex] = useState(0);
  const [isImportProcessing, setIsImportProcessing] = useState(false);
  const libraryArtworkHydratedRef = useRef(false);
  const storeArtworkHydratedRef = useRef(false);
  const storeReviewsHydratedRef = useRef(false);
  const storeSteamMetadataHydratedRef = useRef(new Set());
  const popularStoreHydratedRef = useRef(false);
  const itadDealsHydratedRef = useRef(false);
  const hltbLookupAttemptedRef = useRef(new Set());
  const protonDbLibraryAttemptedRef = useRef(new Set());
  const protonDbStoreAttemptedRef = useRef(new Set());
  const favoriteVaultGridAttemptedRef = useRef(new Set());
  const storeDetailCacheRef = useRef({});
  const storeDetailInFlightRef = useRef(new Map());
  const gamesRef = useRef([]);
  const libraryTrailerVisitRef = useRef({ gameId: null, consumed: false });
  const libraryTrailerRequestRef = useRef(0);

  const addDiagnostic = (area, level, message, details = null) => {
    setDiagnostics(prev => [{
      area,
      level,
      message,
      details,
      timestamp: new Date().toISOString()
    }, ...prev].slice(0, 80));
  };

  const fetchProtonDbSummary = useCallback(async (steamAppId, title = 'game') => {
    const appId = String(steamAppId || '').trim();
    if (!settings.protonDbEnabled || !isValidSteamAppId(appId)) return null;

    try {
      const summary = window.electronAPI?.fetchProtonDbSummary
        ? await window.electronAPI.fetchProtonDbSummary(appId)
        : await fetchProtonDbSummaryBrowser(appId);
      return summary || null;
    } catch (error) {
      addDiagnostic('ProtonDB', 'warn', `Linux compatibility skipped for ${title}: ${error.message}`);
      return null;
    }
  }, [settings.protonDbEnabled]);

  useEffect(() => {
    gamesRef.current = games;
  }, [games]);

  const mergeStoreDetailCache = useCallback((item, patch = {}, resolvedSteamAppId = null) => {
    const aliases = getStoreItemCacheAliases(item, resolvedSteamAppId);
    if (aliases.length === 0) return null;

    const primaryKey = aliases[0];
    const existing = aliases.reduce((merged, key) => ({
      ...merged,
      ...(storeDetailCacheRef.current[key] || {})
    }), {});
    const nextRecord = {
      ...existing,
      ...patch,
      key: primaryKey,
      aliases,
      cachedAt: Date.now()
    };

    storeDetailCacheRef.current = aliases.reduce((cache, key) => {
      cache[key] = nextRecord;
      return cache;
    }, { ...storeDetailCacheRef.current });

    const entries = Object.entries(storeDetailCacheRef.current);
    if (entries.length > MAX_STORE_DETAIL_CACHE_ENTRIES) {
      const oldestKeys = entries
        .sort(([, a], [, b]) => (a.cachedAt || 0) - (b.cachedAt || 0))
        .slice(0, entries.length - MAX_STORE_DETAIL_CACHE_ENTRIES)
        .map(([key]) => key);
      oldestKeys.forEach(key => {
        delete storeDetailCacheRef.current[key];
      });
    }

    setStoreDetailCache({ ...storeDetailCacheRef.current });
    return nextRecord;
  }, []);

  const prefetchStoreItemDetails = useCallback((item) => {
    const initialKey = getStoreItemCacheKey(item);
    if (!initialKey) return null;

    const cached = storeDetailCacheRef.current[initialKey];
    const cacheHasNeededProtonDb = !settings.protonDbEnabled ||
      cached?.protonDbSummary ||
      cached?.protonDbStatus === 'unavailable' ||
      cached?.steamLookupStatus === 'missing';
    if (
      cached?.status === 'ready' &&
      cached?.mediaLoaded &&
      (cached?.steamMetadataLoaded || cached?.igdbDetailsLoaded || cached?.steamLookupStatus === 'missing') &&
      cacheHasNeededProtonDb
    ) {
      return Promise.resolve(cached);
    }

    if (storeDetailInFlightRef.current.has(initialKey)) {
      return storeDetailInFlightRef.current.get(initialKey);
    }

    const request = (async () => {
      let resolvedSteamAppId = String(item?.steamAppId || '').trim();
      if (!/^\d+$/.test(resolvedSteamAppId)) resolvedSteamAppId = null;
      const patch = {
        status: 'loading',
        itemSnapshot: item,
        errors: []
      };

      mergeStoreDetailCache(item, patch, resolvedSteamAppId);

      try {
        if (!resolvedSteamAppId && item?.title) {
          try {
            const match = window.electronAPI?.resolveSteamAppId
              ? await window.electronAPI.resolveSteamAppId(item.title)
              : await resolveSteamAppIdBrowser(item.title);

            if (match?.error) {
              patch.errors.push({ source: 'steam-resolve', message: match.error });
              patch.steamLookupStatus = 'error';
            } else {
              resolvedSteamAppId = match?.steamAppId || null;
              patch.resolvedSteamAppId = resolvedSteamAppId;
              patch.steamLookupStatus = resolvedSteamAppId ? 'ready' : 'missing';
              patch.steamMatchName = match?.name || item.steamMatchName || null;
              patch.steamMatchScore = match?.matchScore ?? item.steamMatchScore ?? null;
            }
          } catch (error) {
            patch.errors.push({ source: 'steam-resolve', message: error.message });
            patch.steamLookupStatus = 'error';
          }
        } else {
          patch.resolvedSteamAppId = resolvedSteamAppId;
          patch.steamLookupStatus = resolvedSteamAppId ? 'ready' : 'missing';
        }

        if (resolvedSteamAppId) {
          try {
            const [details, reviews] = await Promise.all([
              window.electronAPI?.fetchSteamDetails
                ? window.electronAPI.fetchSteamDetails(resolvedSteamAppId)
                : fetchSteamDetailsBrowser(resolvedSteamAppId),
              window.electronAPI?.fetchSteamReviews
                ? window.electronAPI.fetchSteamReviews(resolvedSteamAppId)
                : fetchSteamReviewSummaryBrowser(resolvedSteamAppId)
            ]);

            patch.steamDetails = details || null;
            patch.steamReviewScore = reviews || null;
            patch.steamMetadataLoaded = true;
          } catch (error) {
            patch.errors.push({ source: 'steam-metadata', message: error.message });
            patch.steamMetadataLoaded = false;
          }
        }

        if (settings.protonDbEnabled && resolvedSteamAppId) {
          const protonDbSummary = await fetchProtonDbSummary(resolvedSteamAppId, item?.title);
          patch.protonDbSummary = protonDbSummary || null;
          patch.protonDbStatus = protonDbSummary ? 'ready' : 'unavailable';
        }

        if (item?.igdbId && item.source === 'igdb') {
          try {
            const details = window.electronAPI?.fetchIgdbGameDetails
              ? await window.electronAPI.fetchIgdbGameDetails(item.igdbId)
              : await fetchIgdbGameDetailsBrowser(item.igdbId);

            if (details?.error) {
              patch.igdbDetailsError = details.error;
              patch.errors.push({ source: 'igdb-details', message: details.error });
            } else {
              patch.igdbDetails = details;
              patch.igdbDetailsLoaded = true;
            }
          } catch (error) {
            patch.igdbDetailsError = error.message;
            patch.errors.push({ source: 'igdb-details', message: error.message });
          }
        }

        let igdbScreenshots = [];
        const needsIgdbScreenshots = !resolvedSteamAppId || !patch.steamDetails?.screenshots?.length;
        if (needsIgdbScreenshots && (item?.igdbId || item?.title)) {
          try {
            const payload = {
              igdbId: item.igdbId,
              title: item.title
            };
            const screenshots = window.electronAPI?.fetchIgdbScreenshots
              ? await window.electronAPI.fetchIgdbScreenshots(payload)
              : await fetchIgdbScreenshotsBrowser(payload);

            if (screenshots?.error) {
              patch.errors.push({ source: 'igdb-screenshots', message: screenshots.error });
            } else {
              igdbScreenshots = Array.isArray(screenshots) ? screenshots : [];
              patch.igdbScreenshots = igdbScreenshots;
            }
          } catch (error) {
            patch.errors.push({ source: 'igdb-screenshots', message: error.message });
          }
        }

        const mediaPatch = buildStorePrefetchMedia(
          patch.igdbDetails ? { ...item, ...patch.igdbDetails } : item,
          resolvedSteamAppId,
          patch.steamDetails,
          igdbScreenshots
        );

        const finalRecord = mergeStoreDetailCache(item, {
          ...patch,
          ...mediaPatch,
          mediaLoaded: true,
          status: 'ready'
        }, resolvedSteamAppId);

        if (finalRecord?.aliases) {
          finalRecord.aliases.forEach(alias => {
            if (alias !== initialKey) {
              storeDetailInFlightRef.current.delete(alias);
            }
          });
        }

        return finalRecord;
      } catch (error) {
        return mergeStoreDetailCache(item, {
          ...patch,
          status: 'error',
          errors: [...patch.errors, { source: 'prefetch', message: error.message }]
        }, resolvedSteamAppId);
      } finally {
        storeDetailInFlightRef.current.delete(initialKey);
      }
    })();

    storeDetailInFlightRef.current.set(initialKey, request);
    return request;
  }, [fetchProtonDbSummary, mergeStoreDetailCache, settings.protonDbEnabled]);

  // --- System Diagnostic Metrics ---

  const [cacheVersion, setCacheVersion] = useState(0);
  const [libraryTrailerPlayback, setLibraryTrailerPlayback] = useState({
    gameId: null,
    embedUrl: null,
    videoId: null,
    title: null,
    visible: false
  });

  // --- 1. Load Local Database or Fallback to Defaults ---
  useEffect(() => {
    async function initDb() {
      if (window.electronAPI) {
        try {
          const loadedData = await window.electronAPI.loadDatabase();
          if (loadedData && Array.isArray(loadedData) && loadedData.length > 0) {
            const hydratedData = loadedData.map(applySeededHltbToGame);
            setGames(hydratedData);
            setSelectedGame(hydratedData[0] || null);
            if (JSON.stringify(hydratedData) !== JSON.stringify(loadedData)) {
              await window.electronAPI.saveDatabase(hydratedData);
            }
          } else {
            // Save defaults if file is empty
            const seededDefaults = defaultGames.map(applySeededHltbToGame);
            setGames(seededDefaults);
            setSelectedGame(seededDefaults[0] || null);
            await window.electronAPI.saveDatabase(seededDefaults);
          }
        } catch (e) {
          console.error("Database load error, falling back to mock:", e);
          const seededDefaults = defaultGames.map(applySeededHltbToGame);
          setGames(seededDefaults);
          setSelectedGame(seededDefaults[0] || null);
        }
      } else {
        // Web Browser Sandbox Loading
        const localCache = localStorage.getItem('nexus_games_cache');
        if (localCache) {
          const parsed = JSON.parse(localCache).map(applySeededHltbToGame);
          setGames(parsed);
          setSelectedGame(parsed[0] || null);
          localStorage.setItem('nexus_games_cache', JSON.stringify(parsed));
        } else {
          const seededDefaults = defaultGames.map(applySeededHltbToGame);
          setGames(seededDefaults);
          setSelectedGame(seededDefaults[0] || null);
        }
      }
    }
    initDb();
  }, []);

  // --- 1a. Load persisted settings from storage ---
  useEffect(() => {
    async function loadSettings() {
      let saved = null;
      if (window.electronAPI) {
        saved = await window.electronAPI.loadSettings();
      } else {
        const raw = localStorage.getItem('nexus_settings');
        if (raw) {
          try { saved = JSON.parse(raw); } catch (e) { /* ignore */ }
        }
      }
      if (saved && typeof saved === 'object') {
        const actualSettings = saved.success ? saved.settings : saved;
        if (actualSettings && typeof actualSettings === 'object') {
          setSettings(prev => ({ ...DEFAULT_SETTINGS, ...actualSettings }));
        }
      }
      settingsLoadedRef.current = true;
      setSettingsReady(true);
    }
    loadSettings();
  }, []);

  // --- 1b. Persist settings to storage whenever they change ---
  useEffect(() => {
    if (!settingsReady || !settingsLoadedRef.current) return;
    if (window.electronAPI) {
      window.electronAPI.saveSettings(settings);
    } else {
      localStorage.setItem('nexus_settings', JSON.stringify(settings));
    }
  }, [settings, settingsReady]);

  useEffect(() => {
    if (!settingsReady) return;
    audioEngine.setMasterVolume(settings.launcherVolume ?? DEFAULT_SETTINGS.launcherVolume);
    audioEngine.setMuted(settings.isMuted);
    if (!settings.isMuted && settings.menuMusicEnabled) {
      audioEngine.startMenuMusic();
    } else {
      audioEngine.stopMenuMusic();
    }
  }, [settings.isMuted, settings.launcherVolume, settings.menuMusicEnabled, settingsReady]);

  useEffect(() => {
    if (!window.electronAPI?.onDiagnosticEvent) return;

    return window.electronAPI.onDiagnosticEvent((event) => {
      setDiagnostics(prev => [event, ...prev].slice(0, 80));
    });
  }, []);

  useEffect(() => {
    const term = searchQuery.trim();
    if (term.length < 3 || (activeView !== 'search' && activeView !== 'store-item')) {
      setIgdbSearchResults([]);
      setIgdbSearchStatus('idle');
      setIgdbSearchError(null);
      return;
    }

    let cancelled = false;
    setIgdbSearchStatus('loading');
    setIgdbSearchError(null);

    const timer = setTimeout(async () => {
      try {
        const results = window.electronAPI?.searchIgdbGames
          ? await window.electronAPI.searchIgdbGames(term)
          : await searchIgdbGamesBrowser(term);
        if (cancelled) return;

        if (results?.error) {
          setIgdbSearchResults([]);
          setIgdbSearchStatus('error');
          setIgdbSearchError(results.error);
          addDiagnostic('Discovery', 'warn', `Search failed for ${term}: ${results.error}`);
          return;
        }

        setIgdbSearchResults(Array.isArray(results) ? results : []);
        setIgdbSearchStatus('ready');
      } catch (error) {
        if (cancelled) return;
        setIgdbSearchResults([]);
        setIgdbSearchStatus('error');
        setIgdbSearchError(error.message);
        addDiagnostic('Discovery', 'warn', `Search failed for ${term}: ${error.message}`);
      }
    }, 450);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [searchQuery, activeView]);

  useEffect(() => {
    if (popularStoreHydratedRef.current) return;
    if (activeView !== 'store' && activeView !== 'store-item') return;

    let cancelled = false;
    popularStoreHydratedRef.current = true;
    setPopularStoreStatus('loading');
    setPopularStoreError(null);

    async function hydratePopularGames() {
      try {
        const results = window.electronAPI?.fetchIgdbPopularGames
          ? await window.electronAPI.fetchIgdbPopularGames(STORE_TRENDING_FEED_LIMIT)
          : await fetchIgdbPopularGamesBrowser({ limit: STORE_TRENDING_FEED_LIMIT });
        if (cancelled) return;

        if (results?.error) {
          setPopularStoreGames([]);
          setPopularStoreStatus('error');
          setPopularStoreError(results.error);
          addDiagnostic('Discovery', 'warn', `Popular store feed failed: ${results.error}`);
          return;
        }

        setPopularStoreGames(Array.isArray(results) ? results.map(applySeededHltbToGame) : []);
        setPopularStoreStatus('ready');
      } catch (error) {
        if (cancelled) return;
        setPopularStoreGames([]);
        setPopularStoreStatus('error');
        setPopularStoreError(error.message);
        addDiagnostic('Discovery', 'warn', `Popular store feed failed: ${error.message}`);
      }
    }

    hydratePopularGames();

    return () => {
      cancelled = true;
    };
  }, [activeView]);

  useEffect(() => {
    if (itadDealsHydratedRef.current) return;
    if (activeView !== 'store' && activeView !== 'store-item') return;

    let cancelled = false;
    itadDealsHydratedRef.current = true;
    setItadDealsStatus('loading');
    setItadDealsError(null);

    async function hydrateItadDeals() {
      const [itadResult, cheapsharkResult] = await Promise.allSettled([
        fetchItadBestDeals({ country: 'US', limit: 10 }),
        fetchCheapSharkBestDeals({ limit: 10 })
      ]);
      if (cancelled) return;

      const deals = [];
      const errors = [];
      let missingItadKey = false;

      if (itadResult.status === 'fulfilled') {
        deals.push(...itadResult.value);
      } else {
        missingItadKey = itadResult.reason?.message === 'Missing price API key.';
        errors.push(`ITAD: ${itadResult.reason?.message || 'Unavailable'}`);
      }

      if (cheapsharkResult.status === 'fulfilled') {
        deals.push(...cheapsharkResult.value);
      } else {
        errors.push(`CheapShark: ${cheapsharkResult.reason?.message || 'Unavailable'}`);
      }

      setItadDealGames(deals.map(applySeededHltbToGame));

      if (deals.length > 0) {
        setItadDealsStatus('ready');
        setItadDealsError(errors.length ? errors.join(' | ') : null);
      } else {
        setItadDealsStatus(missingItadKey ? 'missing-key' : 'error');
        setItadDealsError(errors.join(' | ') || 'No deal services returned results.');
      }

      errors.forEach(message => addDiagnostic('Prices', 'warn', `Best deals feed unavailable: ${message}`));
    }

    hydrateItadDeals();

    return () => {
      cancelled = true;
    };
  }, [activeView]);

  // --- 1b. Hydrate library and store art from SteamGridDB when desktop APIs exist ---
  useEffect(() => {
    if (!window.electronAPI?.autoFetchArtwork || libraryArtworkHydratedRef.current || games.length === 0) return;

    libraryArtworkHydratedRef.current = true;

    async function hydrateLibraryArtwork() {
      let updatedList = [...games];
      let changed = false;
      const candidates = updatedList.filter(needsSteamGridDBArtwork);

      for (let i = 0; i < candidates.length; i += 3) {
        const chunk = candidates.slice(i, i + 3);
        await Promise.all(chunk.map(async (game) => {
          const artwork = await window.electronAPI.autoFetchArtwork({ ...game, forceTitleLookup: true });
          if (!artwork?.error && (artwork.grid || artwork.hero || artwork.logo || artwork.icon)) {
            updatedList = updatedList.map(existing =>
              existing.id === game.id ? applyArtworkToGame(existing, artwork) : existing
            );
            changed = true;
          } else if (artwork?.error) {
            addDiagnostic('SteamGridDB', 'warn', `Library hydration skipped ${game.title}: ${artwork.error}`);
          }
        }));
      }

      if (!changed) return;

      setGames(updatedList);
      setSelectedGame(prev => updatedList.find(g => g.id === prev?.id) || updatedList[0] || null);
      await window.electronAPI.saveDatabase(updatedList);
    }

    hydrateLibraryArtwork();
  }, [games, cacheVersion]);

  useEffect(() => {
    if (!window.electronAPI?.autoFetchArtwork || storeArtworkHydratedRef.current) return;

    storeArtworkHydratedRef.current = true;

    async function hydrateStoreArtwork() {
      const fetchedArtwork = {};

      const candidates = storeCatalog.filter(needsSteamGridDBArtwork);
      for (let i = 0; i < candidates.length; i += 3) {
        const chunk = candidates.slice(i, i + 3);
        await Promise.all(chunk.map(async (item) => {
          const artwork = await window.electronAPI.autoFetchArtwork({ ...item, forceTitleLookup: true });
          if (!artwork?.error && (artwork.grid || artwork.hero || artwork.logo || artwork.icon)) {
            fetchedArtwork[item.id] = applyArtworkToGame(item, artwork);
          } else if (artwork?.error) {
            addDiagnostic('SteamGridDB', 'warn', `Store artwork skipped ${item.title}: ${artwork.error}`);
          }
        }));
      }

      if (Object.keys(fetchedArtwork).length > 0) {
        setStoreArtwork(fetchedArtwork);
      }
    }

    hydrateStoreArtwork();
  }, [cacheVersion]);

  useEffect(() => {
    if (storeReviewsHydratedRef.current) return;

    const candidates = storeCatalog.filter(item => item.steamAppId);
    if (candidates.length === 0) return;

    storeReviewsHydratedRef.current = true;

    async function hydrateStoreReviews() {
      const fetchedScores = {};

      for (const item of candidates) {
        try {
          let reviewScore = null;

          if (window.electronAPI?.fetchSteamReviews) {
            reviewScore = await window.electronAPI.fetchSteamReviews(item.steamAppId);
          } else {
            reviewScore = await fetchSteamReviewSummaryBrowser(item.steamAppId);
          }

          if (reviewScore?.label) {
            fetchedScores[item.id] = reviewScore;
          }
        } catch (error) {
          addDiagnostic('SteamReviews', 'warn', `Review score skipped ${item.title}: ${error.message}`);
        }
      }

      if (Object.keys(fetchedScores).length > 0) {
        setStoreReviewScores(fetchedScores);
      }
    }

    hydrateStoreReviews();
  }, []);

  useEffect(() => {
    const candidates = popularStoreGames.filter(item => (
      item?.source === 'igdb' &&
      item.title &&
      !storeSteamMetadataHydratedRef.current.has(item.id) &&
      (!item.steamAppId || !item.steamReviewScore)
    ));
    if (candidates.length === 0) return;

    let cancelled = false;

    async function hydratePopularSteamMetadata() {
      const updates = {};

      for (const item of candidates) {
        storeSteamMetadataHydratedRef.current.add(item.id);

        try {
          let steamAppId = item.steamAppId || null;
          let match = null;

          if (!steamAppId) {
            match = window.electronAPI?.resolveSteamAppId
              ? await window.electronAPI.resolveSteamAppId(item.title)
              : await resolveSteamAppIdBrowser(item.title);

            if (match?.error) {
              throw new Error(match.error);
            }
            steamAppId = match?.steamAppId || null;
          }

          let reviewScore = item.steamReviewScore || null;
          if (steamAppId && !reviewScore) {
            reviewScore = window.electronAPI?.fetchSteamReviews
              ? await window.electronAPI.fetchSteamReviews(steamAppId)
              : await fetchSteamReviewSummaryBrowser(steamAppId);
          }

          if (cancelled) return;

          if (steamAppId || reviewScore?.label) {
            updates[item.id] = {
              steamAppId,
              steamReviewScore: reviewScore || item.steamReviewScore || null,
              steamMatchName: match?.name || item.steamMatchName || null,
              steamMatchScore: match?.matchScore ?? item.steamMatchScore ?? null
            };
          }
        } catch (error) {
          addDiagnostic('SteamSearch', 'warn', `Steam metadata skipped ${item.title}: ${error.message}`);
        }
      }

      if (!cancelled && Object.keys(updates).length > 0) {
        setPopularStoreGames(prevGames => prevGames.map(game =>
          updates[game.id] ? { ...game, ...updates[game.id] } : game
        ));
      }
    }

    hydratePopularSteamMetadata();

    return () => {
      cancelled = true;
    };
  }, [popularStoreGames]);

  useEffect(() => {
    if (!settings.protonDbEnabled) return;

    const sourceItems = [
      ...popularStoreGames,
      ...itadDealGames,
      ...storeCatalog,
      ...igdbSearchResults
    ];
    const candidates = sourceItems.filter(item => {
      const appId = String(item?.steamAppId || '').trim();
      const key = `${item?.id}:${appId}`;
      return item?.id &&
        isValidSteamAppId(appId) &&
        !item.protonDbSummary &&
        !storeProtonDbSummaries[item.id] &&
        !protonDbStoreAttemptedRef.current.has(key);
    });
    if (candidates.length === 0) return;

    let cancelled = false;

    async function hydrateStoreProtonDb() {
      const summaries = {};

      for (const item of candidates) {
        const appId = String(item.steamAppId || '').trim();
        protonDbStoreAttemptedRef.current.add(`${item.id}:${appId}`);
        const summary = await fetchProtonDbSummary(appId, item.title);
        if (cancelled) return;
        if (summary) summaries[item.id] = summary;
      }

      if (!cancelled && Object.keys(summaries).length > 0) {
        setStoreProtonDbSummaries(prev => ({ ...prev, ...summaries }));
      }
    }

    hydrateStoreProtonDb();

    return () => {
      cancelled = true;
    };
  }, [
    fetchProtonDbSummary,
    igdbSearchResults,
    itadDealGames,
    popularStoreGames,
    settings.protonDbEnabled,
    storeProtonDbSummaries
  ]);

  useEffect(() => {
    if (!window.electronAPI?.autoFetchHowLongToBeat || games.length === 0) return;

    const candidates = games.filter(game => {
      const key = `${game.id}:${game.title}`;
      return shouldFetchHltb(game) && !hltbLookupAttemptedRef.current.has(key);
    });
    if (candidates.length === 0) return;

    async function hydrateHowLongToBeat() {
      const hltbById = {};

      for (const game of candidates) {
        const key = `${game.id}:${game.title}`;
        hltbLookupAttemptedRef.current.add(key);

        const hltb = await window.electronAPI.autoFetchHowLongToBeat(game);
        if (!hltb?.error) {
          hltbById[game.id] = hltb;
          addDiagnostic('HowLongToBeat', 'info', `HLTB times applied to ${game.title}`);
        } else {
          addDiagnostic('HowLongToBeat', 'warn', `HLTB lookup skipped ${game.title}: ${hltb.error}`);
        }
      }

      if (Object.keys(hltbById).length === 0) return;

      setGames(prevGames => {
        const mergedList = prevGames.map(existing =>
          hltbById[existing.id] ? { ...existing, hltb: hltbById[existing.id] } : existing
        );
        setSelectedGame(prev => mergedList.find(g => g.id === prev?.id) || mergedList[0] || null);
        window.electronAPI.saveDatabase(mergedList);
        return mergedList;
      });
    }

    hydrateHowLongToBeat();
  }, [games]);

  useEffect(() => {
    if (!window.electronAPI?.fetchFavoriteVaultGrid || games.length === 0) return;

    const candidates = games.filter(game => (
      game?.id &&
      game.isFavorite &&
      !game.favoriteVaultGridUrl &&
      !favoriteVaultGridAttemptedRef.current.has(game.id)
    ));

    if (candidates.length === 0) return;

    let cancelled = false;
    candidates.forEach(game => favoriteVaultGridAttemptedRef.current.add(game.id));

    async function hydrateFavoriteVaultGrids() {
      for (const game of candidates) {
        try {
          addDiagnostic('SteamGridDB', 'info', `Fetching Favorite Vault no-logo grid for ${game.title}`);
          const vaultGrid = await window.electronAPI.fetchFavoriteVaultGrid(game);
          if (cancelled) return;

          if (!vaultGrid?.grid) {
            addDiagnostic('SteamGridDB', 'warn', `Favorite Vault grid skipped ${game.title}: ${vaultGrid?.error || 'No no-logo grid found'}`);
            continue;
          }

          const mergedList = gamesRef.current.map(existing =>
            existing.id === game.id ? applyFavoriteVaultGridToGame(existing, vaultGrid) : existing
          );
          setGames(mergedList);
          gamesRef.current = mergedList;
          setSelectedGame(prev => mergedList.find(existing => existing.id === prev?.id) || prev);
          await window.electronAPI.saveDatabase(mergedList);
          addDiagnostic('SteamGridDB', 'info', `Favorite Vault no-logo grid applied to ${game.title}`);
        } catch (error) {
          if (!cancelled) {
            addDiagnostic('SteamGridDB', 'warn', `Favorite Vault grid failed for ${game.title}: ${error.message}`);
          }
        }
      }
    }

    hydrateFavoriteVaultGrids();

    return () => {
      cancelled = true;
    };
  }, [games]);

  // --- 2. Synchronize Custom Settings & CSS Styles ---
  useEffect(() => {
    // Sync active settings theme to body element
    const body = document.body;
    body.className = `${settings.theme} ecosystem-games-bg`;

    // Apply sliders styling variables to :root
    document.documentElement.style.setProperty('--panel-bg', `rgba(10, 10, 16, ${settings.glassOpacity})`);
    document.documentElement.style.setProperty('--panel-bg-solid', `rgba(10, 10, 16, ${Math.min(0.98, settings.glassOpacity * 1.5)})`);
    document.documentElement.style.setProperty('--glass-border', `rgba(255, 255, 255, ${settings.glassOpacity * 0.18})`);
    const fontScale = settings.fontScale || 1.0;
    document.documentElement.style.setProperty('--fs-8', `${8 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-9', `${9 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-9-5', `${9.5 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-10', `${10 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-11', `${11 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-12', `${12 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-12-5', `${12.5 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-13', `${13 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-13-5', `${13.5 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-14', `${14 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-14-5', `${14.5 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-15', `${15 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-16', `${16 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-17', `${17 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-18', `${18 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-20', `${20 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-22', `${22 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-24', `${24 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-26', `${26 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-30', `${30 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-38', `${38 * fontScale}px`);
    document.documentElement.style.setProperty('--fs-48', `${48 * fontScale}px`);
    
  }, [settings]);

  // --- 3. Ambient Audio Soundtrack Controls ---
  useEffect(() => {
    if (!settingsReady || settings.menuMusicEnabled) {
      audioEngine.stopAmbience();
      return undefined;
    }

    if (selectedGame) {
      audioEngine.startAmbience(selectedGame.soundType);
    } else {
      audioEngine.stopAmbience();
    }
    return () => audioEngine.stopAmbience();
  }, [selectedGame, settings.isMuted, settings.menuMusicEnabled, settingsReady]);

  // --- 4. Native Subprocess State Listener ---
  useEffect(() => {
    if (window.electronAPI) {
      const unsubscribe = window.electronAPI.onGameStatusChanged((gameId, status, elapsedSeconds) => {
        if (status === 'running') {
          // Game has started successfully
          setRunningGameId(gameId);
          setSessionTime(0);
          setIsCcOpen(false); // Clean drawer

          // Start visual playtime increment counter
          if (sessionTimerRef.current) clearInterval(sessionTimerRef.current);
          sessionTimerRef.current = setInterval(() => {
            setSessionTime(prev => prev + 1);
          }, 1000);

        } else if (status === 'stopped') {
          // Process exited! Capture playtime addition
          if (sessionTimerRef.current) {
            clearInterval(sessionTimerRef.current);
            sessionTimerRef.current = null;
          }

          // Update library record
          setGames(prevGames => {
            const updated = prevGames.map(game => {
              if (game.id === gameId) {
                const addedSeconds = elapsedSeconds || 0;
                return {
                  ...game,
                  playtime: game.playtime + addedSeconds,
                  lastPlayed: "Just now"
                };
              }
              return game;
            });

            // Save back to JSON Database
            if (window.electronAPI) {
              window.electronAPI.saveDatabase(updated);
            }
            
            // Sync highlighted card
            const currentSelected = updated.find(g => g.id === gameId);
            if (currentSelected) {
              setSelectedGame(currentSelected);
            }

            return updated;
          });

          setRunningGameId(null);
          setSessionTime(0);
          
          // Satisfying chime sweep
          audioEngine.playLaunchSwell();
        }
      });

      return () => {
        unsubscribe();
        if (sessionTimerRef.current) clearInterval(sessionTimerRef.current);
      };
    }
  }, [games]);

  // --- Action Trigger: Game Launching ---
  const handleLaunchGame = async (game) => {
    if (runningGameId) {
      alert("A gameplay session is already active!");
      return;
    }

    audioEngine.playLaunchSwell();

    if (window.electronAPI) {
      const result = await window.electronAPI.launchGame(game.id, game.exePath);
      if (!result.success) {
        alert(`Process launch aborted: ${result.error}`);
      }
    } else {
      // Browser Mock Launcher Session Simulation
      setRunningGameId(game.id);
      setSessionTime(0);
      setIsCcOpen(false);

      if (sessionTimerRef.current) clearInterval(sessionTimerRef.current);
      sessionTimerRef.current = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);

      // Simulate game closure after 8 seconds for the browser mock!
      setTimeout(() => {
        handleMockCloseGame(game.id, 8);
      }, 8000);
    }
  };

  const handleMockCloseGame = (gameId, simulatedDuration) => {
    if (sessionTimerRef.current) {
      clearInterval(sessionTimerRef.current);
      sessionTimerRef.current = null;
    }

    setGames(prevGames => {
      const updated = prevGames.map(game => {
        if (game.id === gameId) {
          return {
            ...game,
            playtime: game.playtime + simulatedDuration,
            lastPlayed: "Just now"
          };
        }
        return game;
      });

      localStorage.setItem('nexus_games_cache', JSON.stringify(updated));
      const currentSelected = updated.find(g => g.id === gameId);
      if (currentSelected) {
        setSelectedGame(currentSelected);
      }
      return updated;
    });

    setRunningGameId(null);
    setSessionTime(0);
    audioEngine.playLaunchSwell();
  };

  // --- Action Trigger: Metadata Updates ---
  const handleSaveMetadata = async (updatedGame) => {
    const updatedList = games.map(g => g.id === updatedGame.id ? updatedGame : g);
    setGames(updatedList);
    setSelectedGame(updatedGame);
    setIsMetadataOpen(false);

    if (window.electronAPI) {
      await window.electronAPI.saveDatabase(updatedList);
    } else {
      localStorage.setItem('nexus_games_cache', JSON.stringify(updatedList));
    }
  };

  // --- Action Trigger: Update Game Banner Position ---
  const handleUpdateGameBannerLayout = async (gameId, layout) => {
    const updatedList = games.map(g => {
      if (g.id === gameId) {
        return { ...g, bannerLayout: layout };
      }
      return g;
    });
    setGames(updatedList);
    const updatedGame = updatedList.find(g => g.id === gameId);
    if (updatedGame) {
      setSelectedGame(updatedGame);
    }

    if (window.electronAPI) {
      await window.electronAPI.saveDatabase(updatedList);
    } else {
      localStorage.setItem('nexus_games_cache', JSON.stringify(updatedList));
    }
  };

  // --- Action Trigger: Favorites Toggle ---
  const handleToggleFavorite = async (gameId) => {
    const updatedList = games.map(g => {
      if (g.id === gameId) {
        return { ...g, isFavorite: !g.isFavorite };
      }
      return g;
    });
    setGames(updatedList);
    gamesRef.current = updatedList;
    const updatedActive = updatedList.find(g => g.id === gameId);
    if (updatedActive) setSelectedGame(updatedActive);
    if (updatedActive?.isFavorite && !updatedActive.favoriteVaultGridUrl) {
      favoriteVaultGridAttemptedRef.current.add(gameId);
    }

    if (window.electronAPI) {
      await window.electronAPI.saveDatabase(updatedList);
    } else {
      localStorage.setItem('nexus_games_cache', JSON.stringify(updatedList));
    }

    if (!updatedActive?.isFavorite || updatedActive.favoriteVaultGridUrl || !window.electronAPI?.fetchFavoriteVaultGrid) {
      return;
    }

    try {
      addDiagnostic('SteamGridDB', 'info', `Fetching Favorite Vault no-logo grid for ${updatedActive.title}`);
      const vaultGrid = await window.electronAPI.fetchFavoriteVaultGrid(updatedActive);
      if (!vaultGrid?.grid) {
        addDiagnostic('SteamGridDB', 'warn', `Favorite Vault grid skipped ${updatedActive.title}: ${vaultGrid?.error || 'No no-logo grid found'}`);
        return;
      }

      const mergedList = gamesRef.current.map(game =>
        game.id === gameId ? applyFavoriteVaultGridToGame(game, vaultGrid) : game
      );
      setGames(mergedList);
      gamesRef.current = mergedList;
      setSelectedGame(prev => mergedList.find(game => game.id === prev?.id) || prev);
      await window.electronAPI.saveDatabase(mergedList);
      addDiagnostic('SteamGridDB', 'info', `Favorite Vault no-logo grid applied to ${updatedActive.title}`);
    } catch (error) {
      addDiagnostic('SteamGridDB', 'warn', `Favorite Vault grid failed for ${updatedActive.title}: ${error.message}`);
    }
  };

  const handleOpenMetadata = (game = selectedGame) => {
    if (!game) return;
    setSelectedGame(game);
    setIsMetadataOpen(true);
  };

  // --- Action Trigger: Remove Game from Library ---
  const handleRemoveGame = async (gameId) => {
    const gameToRemove = games.find(g => g.id === gameId);
    if (!gameToRemove) return;

    const updatedList = games.filter(g => g.id !== gameId);
    setGames(updatedList);

    if (selectedGame?.id === gameId) {
      setSelectedGame(updatedList[0] || null);
    }

    if (window.electronAPI) {
      await window.electronAPI.saveDatabase(updatedList);
    } else {
      localStorage.setItem('nexus_games_cache', JSON.stringify(updatedList));
    }
  };

  const persistGames = async (nextGames) => {
    setGames(nextGames);
    gamesRef.current = nextGames;
    if (window.electronAPI) {
      await window.electronAPI.saveDatabase(nextGames);
    } else {
      localStorage.setItem('nexus_games_cache', JSON.stringify(nextGames));
    }
  };

  const mergeEnrichedLibraryGame = (currentGame, enrichedGame) => {
    if (!currentGame || !enrichedGame) return currentGame || enrichedGame;

    return {
      ...currentGame,
      ...enrichedGame,
      id: currentGame.id,
      exePath: currentGame.exePath,
      owned: currentGame.owned,
      isFavorite: currentGame.isFavorite,
      playtime: currentGame.playtime,
      lastPlayed: currentGame.lastPlayed,
      progress: currentGame.progress
    };
  };

  const enrichLibraryGameInBackground = (game, reason = 'Library') => {
    if (!game?.id) return;

    enrichLibraryGame(game)
      .then(async (enrichedGame) => {
        const currentGames = gamesRef.current;
        const currentGame = currentGames.find(existing => existing.id === game.id);
        if (!currentGame) return;

        const mergedGame = mergeEnrichedLibraryGame(currentGame, enrichedGame);
        const updatedList = currentGames.map(existing =>
          existing.id === game.id ? mergedGame : existing
        );

        await persistGames(updatedList);
        setSelectedGame(prev => prev?.id === game.id ? mergedGame : prev);
        addDiagnostic(reason, 'info', `Background media updated for ${mergedGame.title}`);
      })
      .catch(error => {
        addDiagnostic(reason, 'warn', `Background media update failed for ${game.title}: ${error.message}`);
      });
  };

  useEffect(() => {
    if (!settings.protonDbEnabled || games.length === 0) return;

    const candidates = games.filter(game => {
      const appId = String(game.steamAppId || '').trim();
      const key = `${game.id}:${appId}`;
      return isValidSteamAppId(appId) && !game.protonDbSummary && !protonDbLibraryAttemptedRef.current.has(key);
    });
    if (candidates.length === 0) return;

    let cancelled = false;

    async function hydrateLibraryProtonDb() {
      const summariesById = {};

      for (const game of candidates) {
        const appId = String(game.steamAppId || '').trim();
        protonDbLibraryAttemptedRef.current.add(`${game.id}:${appId}`);
        const summary = await fetchProtonDbSummary(appId, game.title);
        if (cancelled) return;
        if (summary) summariesById[game.id] = summary;
      }

      if (cancelled || Object.keys(summariesById).length === 0) return;

      const updatedList = gamesRef.current.map(game =>
        summariesById[game.id]
          ? { ...game, protonDbSummary: summariesById[game.id] }
          : game
      );
      setGames(updatedList);
      gamesRef.current = updatedList;
      setSelectedGame(prev => updatedList.find(game => game.id === prev?.id) || prev);

      if (window.electronAPI) {
        await window.electronAPI.saveDatabase(updatedList);
      } else {
        localStorage.setItem('nexus_games_cache', JSON.stringify(updatedList));
      }
    }

    hydrateLibraryProtonDb();

    return () => {
      cancelled = true;
    };
  }, [fetchProtonDbSummary, games, settings.protonDbEnabled]);

  const cacheLibraryTrailerForGame = useCallback(async (gameId, trailerPatch) => {
    const currentGames = gamesRef.current;
    const updatedList = currentGames.map(game => (
      game.id === gameId
        ? {
            ...game,
            ...trailerPatch,
            trailerFetchedAt: new Date().toISOString()
          }
        : game
    ));

    setGames(updatedList);
    gamesRef.current = updatedList;
    setSelectedGame(prev => updatedList.find(game => game.id === prev?.id) || prev);

    if (window.electronAPI) {
      await window.electronAPI.saveDatabase(updatedList);
    } else {
      localStorage.setItem('nexus_games_cache', JSON.stringify(updatedList));
    }
  }, []);

  const handleImportSuggestionSearch = useCallback(async (term) => {
    const results = window.electronAPI?.searchIgdbGames
      ? await window.electronAPI.searchIgdbGames(term)
      : await searchIgdbGamesBrowser(term);

    if (results?.error) throw new Error(results.error);
    return Array.isArray(results) ? results : [];
  }, []);

  const buildImportedGame = (file, title, suggestion = null) => {
    const baseTitle = String(title || file.suggestedTitle || file.name || 'Game').trim();
    const fallback = matchGameMetadata(baseTitle, file.path);
    const source = suggestion ? { ...suggestion } : fallback;

    return applySeededHltbToGame({
      ...source,
      id: createImportedGameId(source.title || baseTitle, file.path),
      title: source.title || baseTitle,
      developer: source.developer || fallback.developer,
      publisher: source.publisher || fallback.publisher || source.developer || fallback.developer,
      genre: source.genre || fallback.genre,
      rating: source.rating || fallback.rating || 4.0,
      releaseDate: source.releaseDate || fallback.releaseDate,
      description: source.description || fallback.description,
      tags: Array.isArray(source.tags) && source.tags.length ? source.tags : (fallback.tags || ['Local Import']),
      steamAppId: file.steamAppId || source.steamAppId || fallback.steamAppId || null,
      exePath: file.path,
      owned: true,
      playtime: 0,
      lastPlayed: 'Never',
      progress: 0,
      timeToComplete: '--',
      nextAchievement: 'Locked (0% complete)',
      isFavorite: false,
      artworkFetched: false
    });
  };

  const hydrateLibraryGameMedia = async (game) => {
    let enriched = { ...game };

    try {
      const detailRecord = await prefetchStoreItemDetails(enriched);
      if (detailRecord) {
        enriched = applyStoreDetailMediaToGame(enriched, detailRecord);
        if (hasUsableStoreMedia(detailRecord)) {
          addDiagnostic('Media', 'info', `Gameplay media fetched for ${enriched.title}`);
        }
      }
    } catch (error) {
      addDiagnostic('Media', 'warn', `Gameplay media lookup failed for ${enriched.title}: ${error.message}`);
    }

    if (!enriched.trailerEmbedUrl && enriched.trailerLookupStatus !== 'missing') {
      try {
        const trailer = window.electronAPI?.fetchIgdbGameTrailer
          ? await window.electronAPI.fetchIgdbGameTrailer(enriched)
          : await fetchIgdbGameTrailerBrowser(enriched);

        if (trailer?.error) {
          throw new Error(trailer.error);
        }

        if (trailer?.embedUrl && trailer?.videoId) {
          enriched = {
            ...enriched,
            trailerVideoId: trailer.videoId,
            trailerEmbedUrl: trailer.embedUrl,
            trailerName: trailer.name || `${enriched.title} trailer`,
            trailerIgdbId: trailer.igdbId || enriched.igdbId || null,
            trailerLookupStatus: 'ready',
            trailerSource: trailer.source || 'igdb-youtube',
            trailerFetchedAt: new Date().toISOString()
          };
          addDiagnostic('Media', 'info', `Trailer fetched for ${enriched.title}`);
        } else {
          enriched = {
            ...enriched,
            trailerLookupStatus: 'missing',
            trailerVideoId: null,
            trailerEmbedUrl: null,
            trailerName: null,
            trailerIgdbId: enriched.igdbId || null,
            trailerSource: 'igdb-youtube',
            trailerFetchedAt: new Date().toISOString()
          };
        }
      } catch (error) {
        addDiagnostic('Media', 'warn', `Trailer lookup failed for ${enriched.title}: ${error.message}`);
      }
    }

    return enriched;
  };

  const enrichLibraryGame = async (game) => {
    let enriched = { ...game };

    if (!enriched.steamAppId && enriched.title) {
      try {
        const match = window.electronAPI?.resolveSteamAppId
          ? await window.electronAPI.resolveSteamAppId(enriched.title)
          : await resolveSteamAppIdBrowser(enriched.title);

        if (match?.steamAppId) {
          enriched = {
            ...enriched,
            steamAppId: match.steamAppId,
            steamMatchName: match.name || null,
            steamMatchScore: match.matchScore ?? null
          };
          addDiagnostic('Steam', 'info', `Resolved Steam AppID for ${enriched.title}`, match);
        } else if (match?.error) {
          addDiagnostic('Steam', 'warn', `Steam AppID lookup failed for ${enriched.title}: ${match.error}`);
        }
      } catch (error) {
        addDiagnostic('Steam', 'warn', `Steam AppID lookup failed for ${enriched.title}: ${error.message}`);
      }
    }

    if (enriched.steamAppId) {
      try {
        const [details, reviews] = await Promise.all([
          window.electronAPI?.fetchSteamDetails
            ? window.electronAPI.fetchSteamDetails(enriched.steamAppId)
            : fetchSteamDetailsBrowser(enriched.steamAppId),
          window.electronAPI?.fetchSteamReviews
            ? window.electronAPI.fetchSteamReviews(enriched.steamAppId)
            : fetchSteamReviewSummaryBrowser(enriched.steamAppId)
        ]);

        const steamGenres = Array.isArray(details?.genres) ? details.genres.map(item => item?.description).filter(Boolean) : [];
        const steamCategories = Array.isArray(details?.categories) ? details.categories.map(item => item?.description).filter(Boolean) : [];
        const steamTags = [...steamGenres, ...steamCategories].slice(0, 6);
        enriched = {
          ...enriched,
          developer: enriched.developer && enriched.developer !== 'Unknown Developer'
            ? enriched.developer
            : details?.developers?.join(', ') || enriched.developer,
          publisher: enriched.publisher && enriched.publisher !== 'Unknown Publisher'
            ? enriched.publisher
            : details?.publishers?.join(', ') || enriched.publisher,
          genre: enriched.genre && enriched.genre !== 'Game' && enriched.genre !== 'Indie Game'
            ? enriched.genre
            : steamGenres.join(', ') || enriched.genre,
          description: hasUsefulDescription(enriched)
            ? enriched.description
            : details?.short_description || enriched.description,
          coverUrl: enriched.coverUrl || details?.header_image || null,
          bannerUrl: enriched.bannerUrl || getSteamStoreBannerUrl(details, enriched.steamAppId),
          tags: Array.isArray(enriched.tags) && enriched.tags.length && !enriched.tags.includes('Local Import')
            ? enriched.tags
            : steamTags.length ? steamTags : enriched.tags,
          steamReviewScore: reviews || enriched.steamReviewScore || null
        };
        addDiagnostic('Steam', 'info', `Steam metadata merged for ${enriched.title}`);
      } catch (error) {
        addDiagnostic('Steam', 'warn', `Steam metadata failed for ${enriched.title}: ${error.message}`);
      }

      if (settings.protonDbEnabled) {
        const protonDbSummary = await fetchProtonDbSummary(enriched.steamAppId, enriched.title);
        if (protonDbSummary) {
          enriched = {
            ...enriched,
            protonDbSummary
          };
          addDiagnostic('ProtonDB', 'info', `Linux compatibility merged for ${enriched.title}`);
        }
      }
    }

    enriched = applySeededHltbToGame(enriched);
    if (window.electronAPI?.autoFetchHowLongToBeat && shouldFetchHltb(enriched)) {
      try {
        const hltb = await window.electronAPI.autoFetchHowLongToBeat(enriched);
        if (!hltb?.error) {
          enriched = { ...enriched, hltb };
          addDiagnostic('HowLongToBeat', 'info', `HLTB applied to ${enriched.title}`);
        } else {
          addDiagnostic('HowLongToBeat', 'warn', `HLTB lookup failed for ${enriched.title}: ${hltb.error}`);
        }
      } catch (error) {
        addDiagnostic('HowLongToBeat', 'warn', `HLTB lookup failed for ${enriched.title}: ${error.message}`);
      }
    }

    if (window.electronAPI?.autoFetchArtwork) {
      try {
        const artwork = await window.electronAPI.autoFetchArtwork({ ...enriched, forceTitleLookup: true });
        if (!artwork?.error && (artwork.grid || artwork.hero || artwork.logo || artwork.icon)) {
          enriched = applyArtworkToGame(enriched, artwork);
          addDiagnostic('SteamGridDB', 'info', `Artwork applied to ${enriched.title}`);
        } else if (artwork?.error) {
          addDiagnostic('SteamGridDB', 'warn', `Artwork failed for ${enriched.title}: ${artwork.error}`);
        }
      } catch (error) {
        addDiagnostic('SteamGridDB', 'warn', `Artwork failed for ${enriched.title}: ${error.message}`);
      }
    }

    return hydrateLibraryGameMedia(enriched);
  };

  const startImportPromptQueue = (files) => {
    const normalizedFiles = (Array.isArray(files) ? files : [files])
      .map(normalizeImportFile)
      .filter(file => file.path);

    if (normalizedFiles.length === 0) return;
    setImportPromptIndex(0);
    setImportQueue(normalizedFiles);
    setIsCcOpen(false);
    addDiagnostic('Importer', 'info', `Queued ${normalizedFiles.length} local executable${normalizedFiles.length === 1 ? '' : 's'} for naming`);
  };

  const advanceImportPromptQueue = () => {
    setImportQueue(prev => {
      const next = prev.slice(1);
      setImportPromptIndex(index => next.length > 0 ? index + 1 : 0);
      return next;
    });
  };

  const handleConfirmImportName = async ({ title, suggestion }) => {
    const currentFile = importQueue[0];
    if (!currentFile || isImportProcessing) return;

    const existing = gamesRef.current.find(game => game.exePath === currentFile.path);
    if (existing) {
      addDiagnostic('Importer', 'warn', `Skipped duplicate executable ${currentFile.path}`);
      advanceImportPromptQueue();
      return;
    }

    setIsImportProcessing(true);
    try {
      const baseGame = buildImportedGame(currentFile, title, suggestion);
      addDiagnostic('Importer', 'info', `Preparing import for ${baseGame.title}`, {
        exePath: currentFile.path,
        source: suggestion ? 'igdb' : 'typed-name'
      });

      const updated = [...gamesRef.current, baseGame];
      await persistGames(updated);
      setSelectedGame(baseGame);
      setActiveView('library');
      addDiagnostic('Importer', 'info', `Imported ${baseGame.title}`);
      enrichLibraryGameInBackground(baseGame, 'Importer');
    } finally {
      setIsImportProcessing(false);
      advanceImportPromptQueue();
    }
  };

  const handleCancelImportName = () => {
    if (isImportProcessing) return;
    const currentFile = importQueue[0];
    if (currentFile) {
      addDiagnostic('Importer', 'warn', `Skipped local executable ${currentFile.path}`);
    }
    advanceImportPromptQueue();
  };

  // --- Action Trigger: Folder Scanning Batch Imports ---
  const handleImportScannedGames = async (matchedImports) => {
    startImportPromptQueue(matchedImports);
  };

  // --- Action Trigger: Manual EXE Import ---
  const handleManualImport = async () => {
    audioEngine.playClickPulse();
    const mockExe = window.electronAPI?.selectExecutable
      ? await window.electronAPI.selectExecutable()
      : prompt("Input complete Windows Executable file path (.exe):", "C:\\Windows\\notepad.exe");
    if (!mockExe) {
      addDiagnostic('Importer', 'info', 'Manual executable import cancelled');
      return;
    }

    addDiagnostic('Importer', 'info', `Manual executable selected: ${mockExe}`);
    startImportPromptQueue(mockExe);
  };

  // --- Action Trigger: Factory DB Resets ---
  const handleResetDatabase = async () => {
    const seededDefaults = defaultGames.map(applySeededHltbToGame);
    setGames(seededDefaults);
    setSelectedGame(seededDefaults[0] || null);
    if (window.electronAPI) {
      await window.electronAPI.saveDatabase(seededDefaults);
    } else {
      localStorage.removeItem('nexus_games_cache');
    }
  };

  // --- Action Trigger: Clear Pictures Cache ---
  const handleClearArtworkCache = async () => {
    if (window.electronAPI?.clearArtworkCache) {
      addDiagnostic('Artwork', 'info', 'Initiating full artwork cache purge...');
      const result = await window.electronAPI.clearArtworkCache();
      if (result.success) {
        // Reset artwork status in games database
        const updated = games.map(game => {
          if (
            game.artworkSource === 'steamgriddb' ||
            (game.coverUrl && game.coverUrl.startsWith('nexus-artwork:///')) ||
            (game.favoriteVaultGridUrl && game.favoriteVaultGridUrl.startsWith('nexus-artwork:///'))
          ) {
            return {
              ...game,
              coverUrl: null,
              bannerUrl: null,
              logoUrl: null,
              iconUrl: null,
              favoriteVaultGridUrl: null,
              favoriteVaultGridFetched: false,
              favoriteVaultGridSource: null,
              favoriteVaultGridStyle: null,
              favoriteVaultGridWidth: null,
              favoriteVaultGridHeight: null,
              favoriteVaultGridFetchedAt: null,
              artworkFetched: false,
              artworkSource: null
            };
          }
          return game;
        });

        setGames(updated);
        setSelectedGame(prev => updated.find(g => g.id === prev?.id) || updated[0] || null);
        await window.electronAPI.saveDatabase(updated);

        // Reset hydration refs so they can re-hydrate in background
        libraryArtworkHydratedRef.current = false;
        storeArtworkHydratedRef.current = false;
        favoriteVaultGridAttemptedRef.current = new Set();

        // Force a re-fetch of store artwork as well by resetting it
        setStoreArtwork({});
        
        // Trigger useEffects by updating cacheVersion
        setCacheVersion(v => v + 1);

        addDiagnostic('Artwork', 'info', 'Artwork cache cleared successfully. Triggering re-fetch.');
        alert("Artwork cache cleared successfully! The launcher will now re-fetch clean pictures.");
      } else {
        addDiagnostic('Artwork', 'error', `Purge failed: ${result.error}`);
        alert(`Failed to clear artwork cache: ${result.error}`);
      }
    } else {
      // Browser Sandbox fallback
      const updated = games.map(game => {
        return {
          ...game,
          coverUrl: null,
          bannerUrl: null,
          logoUrl: null,
          iconUrl: null,
          artworkFetched: false,
          artworkSource: null
        };
      });
      setGames(updated);
      setSelectedGame(prev => updated.find(g => g.id === prev?.id) || updated[0] || null);
      localStorage.setItem('nexus_games_cache', JSON.stringify(updated));
      
      // Reset hydration refs
      libraryArtworkHydratedRef.current = false;
      storeArtworkHydratedRef.current = false;
      storeReviewsHydratedRef.current = false;
      setStoreArtwork({});
      setStoreReviewScores({});
      setCacheVersion(v => v + 1);
      
      alert("Cache cleared successfully (sandbox mock)!");
    }
  };

  // --- Navigation / View Management ---
  const handleViewChange = (view) => {
    audioEngine.playClickPulse();
    setActiveView(view);
    if (view === 'store') {
      setSelectedStoreItem(null);
      setStoreReturnView('store');
    }
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    if (value.trim()) {
      setActiveView('search');
      return;
    }

    if (activeView === 'search') {
      setActiveView('library');
    }
  };

  const handleSelectStoreItem = (item, returnView = activeView) => {
    prefetchStoreItemDetails(item);
    setSelectedStoreItem(item);
    setStoreReturnView(returnView === 'search' ? 'search' : 'store');
    setActiveView('store-item');
  };

  const handleBackToStore = () => {
    setActiveView(storeReturnView === 'search' && searchQuery.trim() ? 'search' : 'store');
    setSelectedStoreItem(null);
  };

  const handleSelectSearchLibraryGame = (game) => {
    setSelectedGame(game);
    setActiveView('library');
  };

  // --- Store: Mark as Owned ---
  const handleMarkOwned = async (storeItem) => {
    const currentGames = gamesRef.current;
    const libraryStoreItem = stripTransientStoreArtwork(storeItem);
    const existing = currentGames.find(g =>
      g.id === storeItem.id ||
      (storeItem.igdbId && g.igdbId === storeItem.igdbId) ||
      (storeItem.rawgId && g.rawgId === storeItem.rawgId) ||
      (storeItem.itadId && g.itadId === storeItem.itadId) ||
      (storeItem.cheapsharkGameId && g.cheapsharkGameId === storeItem.cheapsharkGameId) ||
      (storeItem.steamAppId && String(g.steamAppId || '') === String(storeItem.steamAppId))
    );

    if (existing) {
      const mergedGame = applySeededHltbToGame({
        ...existing,
        ...libraryStoreItem,
        id: existing.id,
        coverUrl: existing.coverUrl || null,
        bannerUrl: existing.bannerUrl || null,
        logoUrl: existing.logoUrl || null,
        iconUrl: existing.iconUrl || null,
        artworkFetched: existing.artworkFetched || false,
        artworkSource: existing.artworkSource || null,
        steamGridDbId: existing.steamGridDbId || null,
        steamGridDbName: existing.steamGridDbName || null,
        bannerLayout: existing.bannerLayout || null,
        exePath: existing.exePath || storeItem.exePath || '',
        isFavorite: existing.isFavorite || false,
        playtime: existing.playtime ?? 0,
        lastPlayed: existing.lastPlayed || 'Never',
        progress: existing.progress ?? 0,
        owned: true
      });
      const updatedList = currentGames.map(g =>
        g.id === existing.id ? mergedGame : g
      );
      await persistGames(updatedList);
      setSelectedGame(mergedGame);
      enrichLibraryGameInBackground(mergedGame, 'Media');
      return;
    }

    const newGame = applySeededHltbToGame({
      ...libraryStoreItem,
      playtime: 0,
      lastPlayed: "Never",
      progress: 0,
      timeToComplete: "--",
      nextAchievement: "Locked (0% complete)",
      exePath: "",
      isFavorite: false,
      owned: true
    });

    const updatedList = [...currentGames, newGame];
    await persistGames(updatedList);
    setSelectedGame(newGame);
    enrichLibraryGameInBackground(newGame, 'Media');
  };

  // --- Store: Link Executable ---
  const handleLinkExe = async (gameId, exePath) => {
    const existing = gamesRef.current.find(g => g.id === gameId);
    if (!existing) return;

    const updatedGame = { ...existing, exePath };

    const updatedList = gamesRef.current.map(g =>
      g.id === gameId ? updatedGame : g
    );
    await persistGames(updatedList);
    const updated = updatedList.find(g => g.id === gameId);
    if (updated) setSelectedGame(updated);

    if (!updatedGame.mediaLoaded || needsSteamGridDBArtwork(updatedGame)) {
      enrichLibraryGameInBackground(updatedGame, 'Media');
    }
  };

  // --- Filter Catalog Search ---
  const normalizedSearchQuery = useMemo(() => searchQuery.toLowerCase(), [searchQuery]);
  const filteredGames = useMemo(() => (
    games.filter(g =>
      g.title?.toLowerCase().includes(normalizedSearchQuery) ||
      g.developer?.toLowerCase().includes(normalizedSearchQuery) ||
      g.genre?.toLowerCase().includes(normalizedSearchQuery)
    )
  ), [games, normalizedSearchQuery]);

  // --- Action Trigger: Batch SteamGridDB Artwork Fetch ---
  const handleBatchFetchArtwork = async () => {
    audioEngine.playClickPulse();

    if (!window.electronAPI?.autoFetchArtwork || isBatchFetchingArtwork) {
      if (!window.electronAPI) alert("SteamGridDB artwork fetch is available in the desktop app.");
      return;
    }

    setIsBatchFetchingArtwork(true);
    let updatedList = [...games];
    let updatedCount = 0;
    const candidates = updatedList.filter(needsSteamGridDBArtwork);

    for (let i = 0; i < candidates.length; i += 3) {
      const chunk = candidates.slice(i, i + 3);
      await Promise.all(chunk.map(async (game) => {
        const artwork = await window.electronAPI.autoFetchArtwork({ ...game, forceTitleLookup: true });
        if (!artwork?.error && (artwork.grid || artwork.hero || artwork.logo || artwork.icon)) {
          updatedList = updatedList.map(existing =>
            existing.id === game.id ? applyArtworkToGame(existing, artwork) : existing
          );
          updatedCount += 1;
          addDiagnostic('SteamGridDB', 'info', `Batch artwork updated ${game.title}`);
        } else if (artwork?.error) {
          addDiagnostic('SteamGridDB', 'warn', `Batch artwork skipped ${game.title}: ${artwork.error}`);
        }
      }));
    }

    setGames(updatedList);
    setSelectedGame(prev => updatedList.find(g => g.id === prev?.id) || updatedList[0] || null);
    await window.electronAPI.saveDatabase(updatedList);
    setIsBatchFetchingArtwork(false);

    alert(updatedCount > 0
      ? `SteamGridDB artwork updated for ${updatedCount} game${updatedCount === 1 ? '' : 's'}.`
      : 'No new SteamGridDB artwork was found.'
    );
  };

  const filteredFavoriteGames = useMemo(
    () => filteredGames.filter(g => g.isFavorite),
    [filteredGames]
  );

  // Sync store catalog ownership with games library
  const ownedGameLookups = useMemo(() => ({
    libraryIds: new Set(games.map(game => game.id)),
    ownedLibraryIds: new Set(games.filter(game => game.owned).map(game => game.id)),
    igdbIds: new Set(games.map(game => game.igdbId).filter(Boolean)),
    rawgIds: new Set(games.map(game => game.rawgId).filter(Boolean)),
    itadIds: new Set(games.map(game => game.itadId).filter(Boolean)),
    cheapsharkIds: new Set(games.map(game => game.cheapsharkGameId).filter(Boolean)),
    steamAppIds: new Set(games.map(game => String(game.steamAppId || '')).filter(Boolean))
  }), [games]);

  const isOwnedStoreItem = useCallback((item) => (
    ownedGameLookups.libraryIds.has(item.id) ||
    (item.igdbId && ownedGameLookups.igdbIds.has(item.igdbId)) ||
    (item.rawgId && ownedGameLookups.rawgIds.has(item.rawgId)) ||
    (item.itadId && ownedGameLookups.itadIds.has(item.itadId)) ||
    (item.cheapsharkGameId && ownedGameLookups.cheapsharkIds.has(item.cheapsharkGameId)) ||
    (item.steamAppId && ownedGameLookups.steamAppIds.has(String(item.steamAppId)))
  ), [ownedGameLookups]);

  const syncedCatalog = useMemo(() => storeCatalog.map(item => applySeededHltbToGame({
    ...item,
    ...storeArtwork[item.id],
    steamReviewScore: storeReviewScores[item.id] || item.steamReviewScore,
    protonDbSummary: settings.protonDbEnabled
      ? storeProtonDbSummaries[item.id] || item.protonDbSummary || null
      : null,
    owned: ownedGameLookups.ownedLibraryIds.has(item.id)
  })), [
    ownedGameLookups,
    settings.protonDbEnabled,
    storeArtwork,
    storeProtonDbSummaries,
    storeReviewScores
  ]);

  const syncedPopularGames = useMemo(() => popularStoreGames.map(item => ({
    ...item,
    protonDbSummary: settings.protonDbEnabled
      ? storeProtonDbSummaries[item.id] || item.protonDbSummary || null
      : null,
    owned: isOwnedStoreItem(item)
  })), [isOwnedStoreItem, popularStoreGames, settings.protonDbEnabled, storeProtonDbSummaries]);

  const syncedItadDeals = useMemo(() => itadDealGames.map(item => ({
    ...item,
    protonDbSummary: settings.protonDbEnabled
      ? storeProtonDbSummaries[item.id] || item.protonDbSummary || null
      : null,
    owned: isOwnedStoreItem(item)
  })), [isOwnedStoreItem, itadDealGames, settings.protonDbEnabled, storeProtonDbSummaries]);

  const mergedStoreCatalog = useMemo(() => [
    ...syncedPopularGames,
    ...syncedItadDeals,
    ...syncedCatalog
  ], [syncedCatalog, syncedItadDeals, syncedPopularGames]);

  const searchResults = useMemo(() => {
    const normalizedSearchTitles = new Set();

    return [
      ...filteredGames.map(item => ({ ...item, resultType: 'library', owned: true })),
      ...syncedCatalog
        .filter(item => (
          item.title?.toLowerCase().includes(normalizedSearchQuery) ||
          item.developer?.toLowerCase().includes(normalizedSearchQuery) ||
          item.genre?.toLowerCase().includes(normalizedSearchQuery)
        ))
        .map(item => ({ ...item, resultType: 'store', owned: isOwnedStoreItem(item) })),
      ...igdbSearchResults
        .filter(item => item.source === 'igdb' && item.igdbId)
        .map(item => ({
          ...item,
          protonDbSummary: settings.protonDbEnabled
            ? storeProtonDbSummaries[item.id] || item.protonDbSummary || null
            : null,
          resultType: 'igdb',
          owned: isOwnedStoreItem(item)
        }))
    ].filter(item => {
      const key = item.igdbId
        ? `igdb:${item.igdbId}`
        : item.rawgId
          ? `rawg:${item.rawgId}`
          : `title:${item.title?.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
      if (!key || normalizedSearchTitles.has(key)) return false;
      normalizedSearchTitles.add(key);
      return true;
    }).sort((a, b) => {
      const popDiff = (b.igdbPopScore || 0) - (a.igdbPopScore || 0);
      if (popDiff !== 0) return popDiff;
      const aExact = a.title?.toLowerCase() === normalizedSearchQuery ? 1 : 0;
      const bExact = b.title?.toLowerCase() === normalizedSearchQuery ? 1 : 0;
      return bExact - aExact;
    }).slice(0, 20);
  }, [
    filteredGames,
    igdbSearchResults,
    isOwnedStoreItem,
    normalizedSearchQuery,
    settings.protonDbEnabled,
    storeProtonDbSummaries,
    syncedCatalog
  ]);

  const activeStoreItem = useMemo(() => (
    selectedStoreItem
      ? mergedStoreCatalog.find(item => item.id === selectedStoreItem.id) || selectedStoreItem
      : null
  ), [mergedStoreCatalog, selectedStoreItem]);
  const activeStoreItemCacheKey = useMemo(() => getStoreItemCacheKey(activeStoreItem), [activeStoreItem]);
  const activeStoreItemCachedDetails = activeStoreItemCacheKey
    ? storeDetailCache[activeStoreItemCacheKey]
    : null;
  const currentImportFile = importQueue[0] || null;
  const importPromptTotal = importPromptIndex + importQueue.length;

  const hasBlockingOverlay = isSettingsOpen || isMetadataOpen || isProfileOpen || bannerEditMode || !!currentImportFile;
  useEffect(() => {
    const gameId = selectedGame?.id || null;

    if (libraryTrailerVisitRef.current.gameId !== gameId) {
      libraryTrailerVisitRef.current = { gameId, consumed: false };
      setLibraryTrailerPlayback({
        gameId,
        embedUrl: null,
        videoId: null,
        title: null,
        visible: false
      });
    }

    const canArmTrailer = Boolean(
      settings.libraryTrailerAutoplay &&
      gameId &&
      activeView === 'library' &&
      !hasBlockingOverlay &&
      !isCcOpen &&
      !libraryTrailerPlayback.visible
    );
    const shouldHideTrailer = activeView !== 'library' ||
      !settings.libraryTrailerAutoplay ||
      hasBlockingOverlay ||
      isCcOpen;

    if (!canArmTrailer || libraryTrailerVisitRef.current.consumed) {
      if (shouldHideTrailer) {
        setLibraryTrailerPlayback(prev => prev.visible ? { ...prev, visible: false } : prev);
      }
      return undefined;
    }

    const requestId = libraryTrailerRequestRef.current + 1;
    libraryTrailerRequestRef.current = requestId;

    const timer = setTimeout(async () => {
      if (
        libraryTrailerRequestRef.current !== requestId ||
        libraryTrailerVisitRef.current.gameId !== gameId ||
        libraryTrailerVisitRef.current.consumed
      ) {
        return;
      }

      const currentGame = gamesRef.current.find(game => game.id === gameId);
      if (!currentGame) return;

      let trailer = currentGame.trailerEmbedUrl
        ? {
            embedUrl: currentGame.trailerEmbedUrl,
            videoId: currentGame.trailerVideoId || null,
            name: currentGame.trailerName || `${currentGame.title} trailer`
          }
        : null;

      if (!trailer && currentGame.trailerLookupStatus !== 'missing') {
        try {
          const result = window.electronAPI?.fetchIgdbGameTrailer
            ? await window.electronAPI.fetchIgdbGameTrailer(currentGame)
            : await fetchIgdbGameTrailerBrowser(currentGame);

          if (result?.error) {
            throw new Error(result.error);
          }

          if (result?.embedUrl && result?.videoId) {
            trailer = result;
            await cacheLibraryTrailerForGame(gameId, {
              trailerVideoId: result.videoId,
              trailerEmbedUrl: result.embedUrl,
              trailerName: result.name || `${currentGame.title} trailer`,
              trailerIgdbId: result.igdbId || currentGame.igdbId || null,
              trailerLookupStatus: 'ready',
              trailerSource: 'igdb-youtube'
            });
          } else {
            libraryTrailerVisitRef.current.consumed = true;
            if (!window.electronAPI?.fetchIgdbGameTrailer) {
              addDiagnostic('Discovery', 'warn', `No IGDB trailer video found for ${currentGame.title}`);
            }
            await cacheLibraryTrailerForGame(gameId, {
              trailerLookupStatus: 'missing',
              trailerVideoId: null,
              trailerEmbedUrl: null,
              trailerName: null,
              trailerIgdbId: currentGame.igdbId || null,
              trailerSource: 'igdb-youtube'
            });
            return;
          }
        } catch (error) {
          addDiagnostic('Discovery', 'warn', `Trailer lookup skipped ${currentGame.title}: ${error.message}`);
          return;
        }
      }

      if (!trailer?.embedUrl || libraryTrailerVisitRef.current.consumed) return;

      setLibraryTrailerPlayback({
        gameId,
        embedUrl: trailer.embedUrl,
        videoId: trailer.videoId || null,
        title: trailer.name || `${currentGame.title} trailer`,
        visible: true
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [
    activeView,
    cacheLibraryTrailerForGame,
    hasBlockingOverlay,
    isCcOpen,
    libraryTrailerPlayback.visible,
    selectedGame?.id,
    settings.libraryTrailerAutoplay
  ]);

  const handleLibraryTrailerEnded = useCallback((gameId) => {
    if (libraryTrailerVisitRef.current.gameId === gameId) {
      libraryTrailerVisitRef.current.consumed = true;
    }

    setLibraryTrailerPlayback(prev => (
      prev.gameId === gameId ? { ...prev, visible: false } : prev
    ));
  }, []);

  const handleControllerBack = () => {
    if (currentImportFile) {
      if (isImportProcessing) return true;
      handleCancelImportName();
      return true;
    }
    if (isMetadataOpen) {
      setIsMetadataOpen(false);
      return true;
    }
    if (isSettingsOpen) {
      setIsSettingsOpen(false);
      return true;
    }
    if (isProfileOpen) {
      setIsProfileOpen(false);
      return true;
    }
    if (bannerEditMode) {
      setBannerEditMode(false);
      return true;
    }
    if (isCcOpen) {
      setIsCcOpen(false);
      return true;
    }
    if (activeView === 'store-item') {
      handleBackToStore();
      return true;
    }
    if (activeView !== 'library') {
      handleViewChange('library');
      return true;
    }
    return false;
  };

  const handleControllerViewCycle = (step) => {
    if (hasBlockingOverlay || isCcOpen || activeView === 'store-item') return false;

    const currentIndex = Math.max(0, PRIMARY_VIEWS.indexOf(activeView));
    const nextView = PRIMARY_VIEWS[(currentIndex + step + PRIMARY_VIEWS.length) % PRIMARY_VIEWS.length];
    handleViewChange(nextView);
    return true;
  };

  const handleControllerFavorite = () => {
    if (hasBlockingOverlay || isCcOpen || !selectedGame || (activeView !== 'library' && activeView !== 'favourites')) {
      return false;
    }

    audioEngine.playClickPulse();
    handleToggleFavorite(selectedGame.id);
    return true;
  };

  const handleControllerMenu = () => {
    if (hasBlockingOverlay) return false;

    audioEngine.playClickPulse();
    setIsCcOpen(prev => !prev);
    return true;
  };

  const handleControllerMetadata = () => {
    if (hasBlockingOverlay || isCcOpen || !selectedGame || (activeView !== 'library' && activeView !== 'favourites')) return false;

    audioEngine.playClickPulse();
    setIsMetadataOpen(true);
    return true;
  };

  useUnifiedInput({
    onBack: handleControllerBack,
    onShoulderLeft: () => handleControllerViewCycle(-1),
    onShoulderRight: () => handleControllerViewCycle(1),
    onSecondary: handleControllerFavorite,
    onTertiary: handleControllerMetadata,
    onMenu: handleControllerMenu,
    focusDependencies: [
      activeView,
      selectedGame?.id,
      selectedStoreItem?.id,
      searchQuery,
      games.length,
      igdbSearchResults.length,
      isCcOpen,
      isSettingsOpen,
      isMetadataOpen,
      isProfileOpen,
      bannerEditMode,
      importQueue.length,
      isImportProcessing
    ]
  });

  return (
    <div className="app-container">
      {/* 1. Ambient Particle Background */}
      <InteractiveCanvas 
        theme={settings.theme} 
        speedFactor={settings.particleSpeed} 
        density={settings.particleDensity} 
      />

      {/* 2. Top-level Floating Navigation Bar */}
      <NavigationHeader 
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onOpenSettings={() => { audioEngine.playClickPulse(); setIsSettingsOpen(true); }}
        activeView={activeView}
        onViewChange={handleViewChange}
        systemStatusTracking={settings.trackSystemStatus}
        username={username}
        userAvatar={userAvatar}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* 3. Main Dashboard Interactive Workspace */}
      <main className="main-viewport">
        {activeView === 'library' && (
          <>
            <GameMainBanner 
              game={selectedGame}
              onLaunch={handleLaunchGame}
              onToggleFavorite={handleToggleFavorite}
              onEditMetadata={handleOpenMetadata}
              onRemoveGame={handleRemoveGame}
              isRunning={runningGameId === selectedGame?.id}
              bannerAnimation={settings.bannerAnimation}
              trailerPlayback={libraryTrailerPlayback}
              trailerMutedByDefault={settings.libraryTrailerMutedByDefault}
              onTrailerEnded={handleLibraryTrailerEnded}
              studioLogosEnabled={settings.studioLogosEnabled}
              brandfetchClientId={settings.brandfetchClientId}
              brandfetchCacheVersion={cacheVersion}
              protonDbEnabled={settings.protonDbEnabled}
              onUpdateGameBannerLayout={handleUpdateGameBannerLayout}
              editMode={bannerEditMode}
              setEditMode={setBannerEditMode}
            />

            <HorizontalLibrary 
              games={filteredGames}
              selectedGame={selectedGame}
              onSelectGame={setSelectedGame}
              onLaunchGame={handleLaunchGame}
              onEditMetadata={handleOpenMetadata}
              onRemoveGame={handleRemoveGame}
              runningGameId={runningGameId}
            />
          </>
        )}

        {activeView === 'favourites' && (
          <FavouritesTrophyRoom
            games={filteredFavoriteGames}
            selectedGame={selectedGame}
            onSelectGame={setSelectedGame}
            onLaunchGame={handleLaunchGame}
            onToggleFavorite={handleToggleFavorite}
            onEditMetadata={handleOpenMetadata}
            onRemoveGame={handleRemoveGame}
            onReturnToLibrary={() => handleViewChange('library')}
            runningGameId={runningGameId}
          />
        )}

        {activeView === 'store' && (
          <StoreGrid 
            catalog={mergedStoreCatalog}
            popularGames={syncedPopularGames}
            dealGames={syncedItadDeals}
            ownedGames={games}
            onSelectItem={handleSelectStoreItem}
            onPrefetchItem={prefetchStoreItemDetails}
            searchQuery=""
            popularStatus={popularStoreStatus}
            popularError={popularStoreError}
            dealsStatus={itadDealsStatus}
            dealsError={itadDealsError}
            protonDbEnabled={settings.protonDbEnabled}
          />
        )}

        {activeView === 'search' && (
          <SearchResultsPage
            query={searchQuery}
            results={searchResults}
            ownedGames={games}
            igdbSearchStatus={igdbSearchStatus}
            igdbSearchError={igdbSearchError}
            onSelectItem={(item) => handleSelectStoreItem(item, 'search')}
            onPrefetchItem={prefetchStoreItemDetails}
            onSelectLibraryGame={handleSelectSearchLibraryGame}
            onLaunchGame={handleLaunchGame}
            protonDbEnabled={settings.protonDbEnabled}
          />
        )}

        {activeView === 'store-item' && (
          <StoreItemPage 
            item={activeStoreItem}
            cachedDetails={activeStoreItemCachedDetails}
            onCacheDetails={mergeStoreDetailCache}
            onPrefetchItem={prefetchStoreItemDetails}
            ownedGames={games}
            onBack={handleBackToStore}
            onMarkOwned={handleMarkOwned}
            onLinkExe={handleLinkExe}
            onLaunch={handleLaunchGame}
            onEditMetadata={handleOpenMetadata}
            onRemoveGame={handleRemoveGame}
            protonDbEnabled={settings.protonDbEnabled}
          />
        )}
      </main>

      {/* 4. Bottom-up Utility Control Center Dock */}
      <ControlCenter 
        isOpen={isCcOpen}
        onToggle={() => setIsCcOpen(!isCcOpen)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onManualImport={handleManualImport}
        onImportScannedGames={handleImportScannedGames}
        onBatchFetchArtwork={handleBatchFetchArtwork}
        isBatchFetchingArtwork={isBatchFetchingArtwork}
        games={games}
        systemStatusTracking={settings.trackSystemStatus}
        diagnostics={diagnostics}
        onClearDiagnostics={() => setDiagnostics([])}
      />

      {currentImportFile && (
        <ImportNamePrompt
          file={currentImportFile}
          index={importPromptIndex}
          total={importPromptTotal}
          onSearchSuggestions={handleImportSuggestionSearch}
          onConfirm={handleConfirmImportName}
          onCancel={handleCancelImportName}
          isBusy={isImportProcessing}
        />
      )}

      <ControllerHintOverlay
        activeView={activeView}
        isControlCenterOpen={isCcOpen}
        isSettingsOpen={isSettingsOpen}
        isMetadataOpen={isMetadataOpen}
        isProfileOpen={isProfileOpen}
        isBannerEditMode={bannerEditMode}
        selectedGame={selectedGame}
      />



      {/* 6. Settings Panel Configuration pop-up */}
      {isSettingsOpen && (
        <SettingsPanel 
          settings={settings}
          onUpdateSettings={setSettings}
          onResetDatabase={handleResetDatabase}
          onClearArtworkCache={handleClearArtworkCache}
          gamesCount={games.length}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}

      {/* 7. Metadata Editor pop-up */}
      {isMetadataOpen && (
        <MetadataEditor 
          game={selectedGame}
          onSave={handleSaveMetadata}
          onClose={() => setIsMetadataOpen(false)}
          onChangeBannerPosition={() => {
            setIsMetadataOpen(false);
            setBannerEditMode(true);
          }}
        />
      )}

      {/* 8. Gold Profile Selection Overlay */}
      <ProfileOverlay 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        username={username}
        onUsernameChange={handleUsernameChange}
        userAvatar={userAvatar}
        onAvatarChange={handleAvatarChange}
      />
    </div>
  );
}
