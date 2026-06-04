# Agent Codebase Map

This document helps AI agents find the right file quickly and keep their mental model fresh.
It is intentionally compact: update tables and checklists when files or flows change, but avoid
copying implementation details that already live in source.

## Update Protocol

When the codebase changes, update only the sections affected by the change.

- New or renamed files: update "Source Map".
- New UI flow, modal, or page: update "Renderer Flow" and the component table.
- New IPC method: update "Electron Boundary" and verify `main.js` and `preload.js` stay paired.
- New data fields or storage keys: update "Data Shape And Persistence".
- New dependency or script: update "Commands And Dependencies".

Useful refresh commands:

```powershell
rg --files -g "*.md"
rg -n "export default function" src\components
rg -n "ipcMain\.(handle|on)" main.js
rg -n "electronAPI|data-controller|DEFAULT_SETTINGS|storeCatalog|defaultGames" src preload.js main.js
npm run build
```

## Commands And Dependencies

| Need | Command or file | Notes |
| --- | --- | --- |
| Install dependencies | `npm install` | Uses `package-lock.json`. |
| Run desktop dev app | `npm run dev` | Starts Vite, waits on port `5173`, then launches Electron. |
| Build renderer | `npm run build` | Baseline verification. Builds Vite output into `dist/`. |
| Preview renderer only | `npm run preview` | Does not exercise Electron IPC. |
| Script definitions | `package.json` | No test script currently exists. |
| Vite config | `vite.config.js` | Uses React plugin, `base: './'`, strict dev port `5173`. |

## Source Map

| Path | Purpose | Update when |
| --- | --- | --- |
| `main.js` | Electron main process: window creation, custom artwork protocol, native dialogs, filesystem persistence, executable scanning, process launch, external service calls, diagnostics, settings, cache clearing. | Native behavior, IPC, storage paths, scanners, artwork, HLTB, ITAD, RAWG, or launch behavior changes. |
| `preload.js` | Context-isolated bridge exposing `window.electronAPI` to React. | Any IPC method is added, removed, renamed, or has signature changes. |
| `src/main.jsx` | React root mount and global CSS import. | App bootstrap changes. |
| `src/App.jsx` | Renderer state hub, view routing, settings sync, database hydration, artwork and HLTB hydration, import/edit/remove/launch handlers, controller callbacks. | Most app flows, game data mutations, settings, views, and modal wiring. |
| `src/index.css` | Global styles, theme variables, focus styles, layout, and most component CSS. | Visual changes, theme variables, focus/controller styling, responsive layout. |
| `src/components/` | React UI components. See component table below. | Component UI, props, interaction, and local behavior changes. |
| `src/hooks/useUnifiedInput.js` | Keyboard/gamepad navigation and focus management. | Controller mappings, focus rules, or `data-controller-*` behavior changes. |
| `src/utils/mockDatabase.js` | Default library games, store catalog, executable metadata matching. | Catalog entries, game record shape, import defaults. |
| `src/utils/steamgriddb.js` | Renderer-side helpers for applying and checking artwork state. | Artwork field mapping or fetch eligibility changes. |
| `src/utils/hltb.js` | Renderer-side seeded HowLongToBeat data and formatting helpers. | HLTB data shape, stale rules, display text. |
| `src/utils/itad.js` | Renderer-side IsThereAnyDeal helpers, local API key reads, API normalization, seeded fallback history. | Store price insights, ITAD auth/storage, history formatting. |
| `src/utils/rawg.js` | Renderer-side RAWG helpers, browser fallback fetches, game/screenshot normalization. | RAWG feed, search, detail, screenshot, or browser fallback behavior changes. |
| `src/utils/steamReviews.js` | Renderer-side Steam review score label/color mapping from stored ratings or review text. | Review score thresholds or display labels change. |
| `src/utils/brandfetch.js` | Studio-to-domain mapping and Brandfetch logo URL generation. | Studio logo behavior or domain mapping changes. |
| `src/utils/audioEngine.js` | UI sound effects and procedural ambience. | Audio assets, mute behavior, ambience styles. |
| `deprecated_features/` | Archived image trimming code and notes. | Only when restoring or documenting deprecated trimming behavior. |
| Root asset folders | Controller button/icon packs and audio assets. | Asset lookup, controller hints, or media licensing changes. |

## Component Map

| Component | Current role | Key coupling |
| --- | --- | --- |
| `NavigationHeader.jsx` | Top navigation, search, view tabs, window buttons, profile entry. | Calls window controls through `window.electronAPI`; active view labels come from `App.jsx`. |
| `InteractiveCanvas.jsx` | Ambient canvas background driven by theme, speed, density. | Receives settings from `App.jsx`. |
| `GameMainBanner.jsx` | Primary selected-game hero, launch/favorite/edit/remove actions, banner positioning. | Uses HLTB and Brandfetch helpers; includes `LibraryOverflowMenu`. |
| `HorizontalLibrary.jsx` | Horizontal library cards for the main library view. | Uses `data-controller-*` selection attributes. |
| `FavouritesTrophyRoom.jsx` | Favorites view with trophy-room style cards. | Uses `data-controller-*` selection attributes and local injected styles. |
| `StoreGrid.jsx` | Store landing view with RAWG popular games, ITAD best deals, and owned-state presentation. | Receives synced feeds from `App.jsx`. |
| `SearchResultsPage.jsx` | Dedicated top-bar search results page for library, store, and RAWG discovery matches. | Receives normalized result data from `App.jsx` and routes item selections back through app handlers. |
| `StoreItemPage.jsx` | Store detail view, Steam/RAWG media/details, ITAD price insights, ownership/link/launch actions, media lightbox. | Uses ITAD helpers, Steam and RAWG detail/media IPC, and executable picker. |
| `ControlCenter.jsx` | Bottom drawer for imports, scans, diagnostics, batch artwork, system actions. | Calls directory picker, executable scan, shutdown, import callbacks. |
| `SettingsPanel.jsx` | Theme/accessibility/system/artwork/API settings. | Reads and saves SteamGridDB API key through Electron APIs. |
| `MetadataEditor.jsx` | Edit selected-game metadata and artwork, manual SGDB search/fetch, HLTB refresh. | Calls image picker, SGDB IPC, auto artwork IPC, HLTB IPC. |
| `ProfileOverlay.jsx` | Profile name and avatar editing. | Persists values in `localStorage` through `App.jsx`. |
| `ControllerHintOverlay.jsx` | On-screen controller hints, keyboard hints, visibility toggle. | Mirrors active view/modal state and reads controller family from Gamepad API. |
| `LibraryOverflowMenu.jsx` | Edit/remove menu with confirm-delete state. | Used by library/store item surfaces. |
| `PiPSidebar.jsx` | Picture-in-picture style game info sidebar. | Present in source but not currently mounted by `App.jsx`. |

## Renderer Flow

- `src/main.jsx` mounts `App` and imports `src/index.css`.
- `App.jsx` owns high-level state: `games`, `selectedGame`, `searchQuery`, `activeView`, overlays, settings, diagnostics, profile data, running session state, artwork cache version.
- Active views are currently `library`, `favourites`, `store`, `search`, and `store-item`.
- `NavigationHeader` changes top-level views and search text.
- `GameMainBanner` plus `HorizontalLibrary` render the library view.
- `FavouritesTrophyRoom` renders favorite games.
- `StoreGrid` renders the split RAWG popular-games and ITAD best-deals store landing view.
- `SearchResultsPage` renders top-bar search results from the local library, seeded store catalog, and RAWG discovery matches.
- `StoreItemPage` renders one store or search item detail.
- `ControlCenter`, `SettingsPanel`, `MetadataEditor`, `ProfileOverlay`, and `ControllerHintOverlay` sit above the active view.

## Electron Boundary

Renderer code should call `window.electronAPI`. The public bridge is defined in `preload.js`; native handlers live in `main.js`.

Current IPC groups:

| Group | Bridge methods | Main handlers/events |
| --- | --- | --- |
| Window controls | `windowMinimize`, `windowMaximize`, `windowClose` | `window-minimize`, `window-maximize`, `window-close` |
| Database | `loadDatabase`, `saveDatabase` | `load-database`, `save-database` |
| File selection and scans | `selectDirectory`, `selectExecutable`, `selectImage`, `scanExecutables` | `select-directory`, `select-executable`, `select-image`, `scan-executables` |
| Launch/process state | `launchGame`, `onGameStatusChanged` | `launch-game`, `game-status-changed` |
| System | `powerOff`, `getSystemMemoryUsage` | `power-off`, `get-system-memory-usage` |
| Artwork and game metadata | `searchSteamGridDB`, `fetchArtwork`, `autoFetchArtwork`, `getCachedArtwork`, `clearArtworkCache`, `fetchSteamDetails`, `fetchSteamReviews`, `searchRawgGames`, `fetchRawgPopularGames`, `fetchRawgScreenshots`, `fetchRawgGameDetails` | SGDB search/fetch/auto/cache handlers, Steam details/reviews handlers, RAWG search/popular/screenshots/details handlers, `clear-artwork-cache` |
| HowLongToBeat | `searchHowLongToBeat`, `autoFetchHowLongToBeat` | `hltb-search`, `hltb-auto-fetch` |
| ITAD | `fetchItadJson` | `itad-fetch-json` |
| Settings/API key | `saveApiKey`, `getApiKey`, `saveSettings`, `loadSettings` | matching handlers in `main.js` |
| Diagnostics | `onDiagnosticEvent` | `diagnostic-event` |

When adding IPC:

1. Implement and validate the handler in `main.js`.
2. Expose the smallest safe wrapper in `preload.js`.
3. Use the wrapper from React and keep a browser fallback if the surrounding flow already supports one.
4. Update the IPC table above.
5. Run `npm run build`.

## Data Shape And Persistence

Primary game records come from `src/utils/mockDatabase.js` and are later persisted.

Common fields include:

- Identity and metadata: `id`, `title`, `developer`, `publisher`, `genre`, `rating`, `ageRating`, `releaseDate`, `description`, `tags`.
- Library state: `owned`, `isFavorite`, `playtime`, `lastPlayed`, `progress`, `timeToComplete`, `nextAchievement`, `exePath`.
- Media/artwork: `coverUrl`, `bannerUrl`, `logoUrl`, `iconUrl`, `bannerLayout`, `artworkFetched`, `artworkSource`, `steamAppId`, `steamGridDbId`, `steamGridDbName`.
- Integrations: `hltb` for HowLongToBeat data; `rawgId`, `rawgSlug`, `rawgUrl`, and `source: 'rawg'` for RAWG-backed discovery/library records; transient store items can include `steamReviewScore` from Steam review summaries.

Persistence locations:

| Data | Desktop persistence | Browser fallback |
| --- | --- | --- |
| Game database | Electron user data `nexus-db.json`; legacy path copied if present. | `localStorage` key `nexus_games_cache`. |
| Settings | Electron user data `nexus-config.json`, under `settings`. | `localStorage` key `nexus_settings`. |
| SteamGridDB API key | Electron user data `nexus-config.json`, or `STEAMGRIDDB_API_KEY` env var. | Not used by most desktop-only fetch paths. |
| Profile | `localStorage` keys `nexus_username`, `nexus_user_avatar`. | Same. |
| Controller hints | `localStorage` key `controllerHintsHidden`. | Same. |
| ITAD client data | `localStorage` keys used in `src/utils/itad.js` and `StoreItemPage.jsx`. | Same. |
| Artwork cache | Electron user data `artwork/`, served by `nexus-artwork:///`. | No equivalent native cache. |

## Integration Flows

Artwork:

- `App.jsx` and `MetadataEditor.jsx` ask for artwork through `window.electronAPI`.
- `main.js` resolves and downloads artwork using cached files, Steam CDN, Steam Store lookup, SteamGridDB, and lower-resolution Steam fallbacks.
- `src/utils/steamgriddb.js` maps returned `grid`, `hero`, `logo`, and `icon` values onto game fields.
- Cached artwork is served through the custom `nexus-artwork` protocol.

HowLongToBeat:

- `src/utils/hltb.js` applies seeded data and decides when live data is stale.
- `main.js` performs live HLTB lookup with seeded fallback for known games.
- UI display helpers live in `src/utils/hltb.js`.

Store and pricing:

- Store search/detail fallback data starts in `storeCatalog`; the default store landing view is hydrated from RAWG popular games and ITAD best deals.
- `App.jsx` merges owned status from the saved library.
- Store landing uses `fetchRawgPopularGames` or `src/utils/rawg.js` browser fallbacks for the left popular-games feed and `src/utils/itad.js` for the right best-deals feed.
- Top-bar searches route to the dedicated `search` view, combining local library/store matches with RAWG discovery results from `searchRawgGames`; selecting a store/RAWG result opens `StoreItemPage` without saving until the user marks it owned.
- `App.jsx` hydrates Steam review summaries for store items with Steam App IDs through `fetchSteamReviews`.
- `StoreItemPage.jsx` fetches Steam details through Electron, automatically looks up RAWG screenshots by RAWG ID or title when entering a game detail page through IPC or `src/utils/rawg.js`, and loads ITAD insights through `src/utils/itad.js`.
- `StoreItemPage.jsx` fetches RAWG details for RAWG-backed items through `fetchRawgGameDetails` and displays RAWG attribution.

Import and launch:

- `ControlCenter.jsx` triggers manual import or folder scan.
- `main.js` scans directories and attaches Steam App IDs when it can.
- `App.jsx` converts scan results to game records with `matchGameMetadata`.
- `main.js` launches executables with `spawn` and emits `game-status-changed`; `App.jsx` updates session time and persisted playtime.

Controller and keyboard:

- `src/hooks/useUnifiedInput.js` maps keyboard and gamepad actions to focus movement and app callbacks.
- Add `data-controller-item="true"`, `data-controller-selected`, `data-controller-default`, `data-controller-back`, or directional attributes where needed.
- Interactive controls should remain keyboard-focusable; the hook filters invisible and nested focus targets.
- `ControllerHintOverlay.jsx` displays current action hints and can be hidden with the hints toggle.

## Styling Notes

- Global styling is centralized in `src/index.css`.
- Theme values live in CSS variables and are adjusted by `App.jsx` settings effects.
- Use existing variables like `--accent-color`, `--accent-color-rgb`, `--panel-bg`, `--glass-border`, `--fs-*`, and transition variables.
- Focus styling is important for controller navigation; test keyboard focus after changing interactive elements.
- Several components have component-specific class names but still rely on the global CSS file.

## Documentation Maintenance Checklist

Before closing a change that affects architecture or agent workflows:

- Source map still names the important files and their current roles.
- Component map includes any added, removed, renamed, or newly mounted components.
- IPC table matches both `preload.js` and `main.js`.
- Persistence keys and game fields match the current code.
- Commands match `package.json`.
- Guide avoids copied catalogs, API keys, or large source excerpts.
- `npm run build` was run or the reason it was skipped is recorded.
