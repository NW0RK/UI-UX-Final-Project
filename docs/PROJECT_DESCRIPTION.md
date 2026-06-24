# Nexus Launcher Project Description

## Project Overview

Nexus Launcher is a premium Windows-focused game launcher built with Electron, Vite, and React. The goal of the project is to give a local PC game library the feel of a modern console dashboard: visual, controller-friendly, fast to navigate, and rich with game information. Instead of forcing users to browse folders, desktop shortcuts, and different storefronts separately, Nexus Launcher brings imported games, artwork, launch actions, discovery feeds, deals, settings, and profile customization into one desktop application.

The application is designed around a polished player experience. The Library view highlights a selected game with large banner artwork, metadata, launch controls, favorite actions, trailer preview support, playtime context, and a horizontal game collection. The Favorites view presents a more curated gallery for the user's most important games. The Store and Search flows help users discover games through IGDB-backed trending data, Steam-related details, review summaries, screenshots, trailers, and price information from deal services such as IsThereAnyDeal and CheapShark.

Nexus Launcher also includes practical desktop features. Users can import a single executable, scan folders for installed games, save game records, edit metadata, fetch artwork, and launch games through the Electron main process. The renderer keeps browser fallback behavior where possible, while desktop-only work such as file selection, process launching, local database storage, artwork caching, and secure API key handling is routed through the preload bridge exposed as `window.electronAPI`.

## Main Features

- Local game library with manual import, folder scanning, launch controls, and playtime tracking.
- Premium game presentation using covers, banners, logos, icons, screenshots, trailers, and metadata.
- Favorites gallery for a more personal collection view.
- Store-style discovery page with trending games, owned-state awareness, deals, and review context.
- Game detail page with media, pricing history, Steam/IGDB data, and ownership actions.
- SteamGridDB artwork search and automatic artwork enrichment.
- HowLongToBeat playtime estimates and optional ProtonDB compatibility summaries.
- Theme, sound, profile, trailer, artwork, accessibility, and system settings.
- Keyboard and controller-aware navigation using real focusable elements and controller data attributes.

## Technology And Architecture

The project uses Electron as the desktop shell, React 18 for the renderer, and Vite for development and production builds. The most important runtime files are:

- `main.js`: Electron main process, native IPC handlers, local persistence, artwork caching, executable scanning, game launching, and external service requests.
- `preload.js`: context-isolated bridge that safely exposes desktop functionality to the renderer through `window.electronAPI`.
- `src/App.jsx`: main renderer state hub for routing, library data, settings, imports, store/search flows, modals, and persistence.
- `src/components/`: UI surfaces such as the navigation header, library banner, store grid, search page, settings panel, metadata editor, control center, profile overlay, and favorites room.
- `src/utils/`: integration helpers for SteamGridDB, Steam, IGDB, HowLongToBeat, CheapShark, IsThereAnyDeal, ProtonDB, audio, and artwork placement.
- `src/index.css`: global styling, design tokens, layout rules, theme variables, focus states, and responsive behavior.

The architecture separates native desktop behavior from React UI logic. React files do not import Electron directly. When the renderer needs native functionality, the feature is implemented in `main.js`, exposed in `preload.js`, and then called from React through the safe bridge. This keeps the UI easier to reason about and preserves Electron's context isolation model.

## Development Workflow

The team workflow followed an iterative feature-building process. First, the launcher structure was created with the core Electron, Vite, and React setup. Then the main library experience was built around game records, selected-game state, artwork fields, launch actions, and persistent storage. After the library foundation was stable, the project expanded into supporting views and workflows: settings, metadata editing, imports, store discovery, search, favorites, controller hints, and external data enrichment.

Most user-facing work happens in `src/App.jsx` and the components under `src/components/`. Native desktop behavior is added through paired changes in `main.js` and `preload.js`. Styling is centralized in `src/index.css`, which helps keep visual changes consistent across the launcher. Documentation is maintained in `README.md`, `docs/AGENT_CODEBASE_MAP.md`, and this project description.

The baseline verification command is:

```powershell
npm run build
```

There is currently no automated test script in `package.json`, so production build success is the main required verification step for code changes. The repository also contains Selenium/JUnit-style test groundwork under `src/tests`, but that flow is not wired into the npm command set.

## Team Contributions

to do

## Final Status

Nexus Launcher is an active final-project prototype that can be run locally from source. It demonstrates a complete desktop launcher concept with a polished UI, local game management, native desktop integration, external metadata enrichment, discovery features, and customization settings. Future work could include a packaged Windows installer, a fully wired automated test command, deeper account/profile persistence, and release distribution through GitHub Releases.
