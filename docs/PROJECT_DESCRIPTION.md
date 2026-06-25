# Nexus Launcher Project Description

## Project Overview

Nexus Launcher is a premium Windows-focused game launcher built with Electron, Vite, and React. The project was designed to make a local PC game library feel closer to a modern console dashboard: visual, fast, controller-friendly, and centered around the games themselves. Instead of making users jump between folders, shortcuts, browser tabs, and separate storefronts, Nexus brings imported games, launch actions, artwork, trailers, discovery, deals, settings, and profile customization into one polished desktop application.

The main experience is the Library view. A selected game is shown with large banner artwork, game metadata, launch controls, favorite actions, trailer support, playtime context, and a horizontal collection for quick browsing. The Favorites view gives important games a more curated gallery-style space. The Store and Search flows extend the launcher beyond installed games by showing IGDB-backed discovery results, Steam-related information, review context, screenshots, trailers, and pricing data from services such as IsThereAnyDeal and CheapShark.

The project also includes desktop-focused functionality that makes it feel like a real launcher rather than only a web interface. Users can import a single executable, scan folders for installed games, edit metadata, save game records, fetch artwork, cache media locally, and launch games from the app. Native work is handled in the Electron main process, while the React renderer communicates with it through the safe preload bridge exposed as `window.electronAPI`.

## Features And Technology

The core technology stack is Electron for the desktop shell, React 18 for the renderer, and Vite for development and production builds. The most important files are `main.js` for Electron IPC and native behavior, `preload.js` for the secure renderer bridge, `src/App.jsx` for app state and routing, `src/components/` for the UI, `src/utils/` for external service helpers, and `src/index.css` for global styling and design tokens.

Major features include:

- Local game library with manual import, folder scanning, launch controls, and playtime tracking.
- Rich game presentation using covers, banners, logos, icons, screenshots, trailers, and metadata.
- Favorites gallery for a more personal collection view.
- Store-style discovery with trending games, owned-state awareness, deals, and review context.
- Detailed game pages with media, pricing information, Steam/IGDB data, and ownership actions.
- SteamGridDB artwork search and automatic artwork enrichment.
- HowLongToBeat estimates and optional ProtonDB compatibility summaries.
- Theme, audio, artwork, trailer, profile, accessibility, and system settings.
- Keyboard and controller-aware navigation using focusable elements and controller attributes.

The architecture keeps React UI code separate from native desktop behavior. React files do not import Electron directly. When the renderer needs access to files, saved settings, game launching, cache clearing, API keys, or artwork downloads, the feature is implemented in `main.js`, exposed through `preload.js`, and then called from React through `window.electronAPI`. This made the project easier to expand while keeping Electron's context isolation model intact.

## Development Workflow

The team followed an iterative workflow. The first step was building the Electron, Vite, and React foundation, then shaping the Library around saved game records, selected-game state, artwork fields, launch actions, and persistence. Once the main library experience was stable, the project expanded into supporting flows: settings, metadata editing, imports, folder scanning, store discovery, search, favorites, controller hints, and external data enrichment.

Most user-facing changes were made in `src/App.jsx`, components under `src/components/`, and shared styling in `src/index.css`. Native desktop changes were made as paired updates in `main.js` and `preload.js` so that the renderer always used the bridge rather than direct Electron imports. Documentation was maintained in `README.md`, `docs/AGENT_CODEBASE_MAP.md`, and this description file.

The main verification command for the project is:

```powershell
npm run build
```

There is currently no automated npm test script, so a successful production build is the baseline check for code changes. The repository also includes early Selenium/JUnit-style test groundwork under `src/tests`, which can support future automated UI testing work.

## Team Contributions

### NW0RK (Nikoloz Modebadze)

Nikoloz led the core application implementation and overall product direction. They set up and expanded the Electron, Vite, and React application structure, then built the main launcher flows around library state, game selection, importing, launching, saving, and background enrichment. Their work also included the Library view, Store view, Search results, Store Item page behavior, Favorites gallery improvements, metadata editing flow, profile customization, settings, controller navigation, artwork handling, and production build updates.

They also connected many of the external data and media services used by the launcher. This included SteamGridDB artwork, Steam details and reviews, IGDB discovery and media, IsThereAnyDeal and CheapShark pricing data, HowLongToBeat estimates, ProtonDB compatibility summaries, Brandfetch studio logos, local artwork caching, animated banners, store hero caching, and the related documentation in the README and agent/codebase map. This contribution helped turn the project from a simple launcher into a richer game-library experience.

### Temsika (Teimuraz Mefarishvili)

Temo made important contributions across native behavior, dependencies, setup, and UI integration. Their work included adding the open-external IPC handler, helping with dependency and npm audit fixes, resolving merge conflicts, contributing environment setup changes, and touching shared areas such as `main.js`, `src/App.jsx`, `HorizontalLibrary`, `InteractiveCanvas`, and `NavigationHeader`. These changes helped keep the Electron side, package setup, and shared interface pieces stable while the project grew.

Their contribution was especially useful for keeping the project practical as a desktop app. By supporting IPC behavior, package maintenance, and integration fixes, they helped make sure the launcher could keep moving forward without losing the native-app foundation.

### ksovro (Giorgi Ksovreli)

Giorgi contributed the initial automated UI testing groundwork and also helped with manual testing and feedback during development. Their work added TestNG configuration and Selenium-style page objects and test classes for the main app areas, including the library, navigation header, settings, store, and control center. The files under `src/tests` show a structured testing approach with page classes such as `LibraryPage`, `SettingsPage`, `StorePage`, `NavigationHeaderPage`, and `ControlCenterPage`, plus matching test classes. Their manual testing and feedback helped review whether the main launcher flows felt understandable, usable, and ready for a final-project demo.

## Final Status

Nexus Launcher can be run locally from source and demonstrates a complete desktop launcher concept. It includes local game management, native Electron integration, rich game artwork, external metadata enrichment, discovery features, customization settings, and controller-aware navigation. Future improvements could include a packaged Windows installer, fully wired automated tests, deeper profile persistence, and release distribution through GitHub Releases.
