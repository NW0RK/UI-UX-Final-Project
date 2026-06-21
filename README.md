# Nexus Launcher

**A premium Windows game launcher built for players who want their library to feel as good as the games inside it.**

Nexus Launcher turns a local game collection into a polished, controller-friendly command center. It brings your games, artwork, launch actions, discovery feeds, deals, trailers, playtime context, and customization settings into one cinematic desktop experience.

Whether you want a cleaner way to launch installed games, a richer way to browse your favorites, or a storefront-style discovery view without leaving your launcher, Nexus gives your library the kind of presentation usually reserved for console dashboards and premium gaming clients.

> Current distribution note: Nexus Launcher does not yet ship with a packaged Windows installer. To try it today, clone the repository, install dependencies, and run the Electron app locally.

## Preview

Add your screenshots to these slots when they are ready.

> [Screenshot: Nexus Launcher library hero]

**Library hero**  
Show the main launcher view with a selected game, rich banner artwork, metadata, launch controls, and the horizontal library shelf.

> [Screenshot: Store discovery and deals view]

**Store discovery and deals**  
Show the split store view with IGDB trending games beside live deal cards from IsThereAnyDeal and CheapShark.

> [Screenshot: Game detail page with media and price history]

**Game details**  
Show a store or discovery detail page with screenshots, reviews, price history, ownership actions, and compatibility information.

> [Screenshot: Settings and theme customization]

**Customization**  
Show the settings panel with themes, audio controls, artwork options, API credentials, and system preferences.

## Why Nexus Launcher

### Your PC Library, Presented Like A Premium Console

Import local executables, scan folders for games, and launch them from a unified library built around large artwork, readable metadata, play actions, and fast navigation. Nexus is designed for players who want their PC setup to feel intentional rather than scattered across folders and shortcuts.

### Artwork That Makes Every Game Feel At Home

Nexus can enrich imported games with covers, hero banners, logos, icons, and media through Steam, SteamGridDB, and IGDB-backed lookups. The launcher also caches artwork locally in the desktop app so your library stays fast and visually consistent.

### Discovery Without Leaving The Launcher

The store view brings together IGDB PopScore trending games, Steam review context, trailers, screenshots, and owned-state awareness. Search can blend local library results with discovery results, letting you move from "what do I own?" to "what should I play next?" in one flow.

### Deals, Reviews, Playtime, And Compatibility

Nexus layers useful decision-making signals into the browsing experience:

- Best-price cards from IsThereAnyDeal and CheapShark.
- Steam review summaries when a Steam match is available.
- HowLongToBeat playtime estimates for supported games.
- Optional ProtonDB compatibility summaries for Steam-matched titles.

### Built For Keyboard And Controller Navigation

The interface uses real focusable controls and controller navigation attributes, so it works naturally from a desk setup or a couch setup. Controller hint overlays help make the launcher feel like a gaming-first interface rather than a web page pretending to be one.

### Make It Yours

Tune the launcher with themes, glass intensity, particle effects, font scale, banner motion, trailer preview behavior, studio logos, menu music, volume, and system status readouts. Nexus is meant to feel personal, not generic.

## Feature Highlights

- Unified desktop game library for imported executables.
- Folder scanning and manual executable import.
- Game launch tracking with playtime updates.
- Favorites gallery for spotlighting your best games.
- Rich library hero with artwork, metadata, launch controls, and trailer preview support.
- Store-style discovery view powered by IGDB, ITAD, and CheapShark integrations.
- Detailed game pages with media, reviews, price history, and ownership actions.
- SteamGridDB artwork search and batch artwork fetching.
- HowLongToBeat metadata lookup.
- Optional ProtonDB Linux compatibility display.
- Theme, audio, artwork, trailer, profile, and system settings.
- Keyboard and controller-aware navigation.
- Browser fallback behavior for parts of the renderer, with full native behavior in Electron.

## Tech Stack

- **Desktop shell:** Electron
- **Renderer:** React 18
- **Build tool:** Vite
- **UI icons:** lucide-react
- **Native bridge:** Electron preload script using `window.electronAPI`
- **Primary platform:** Windows desktop

## Installation

Nexus currently runs from source. You will need Node.js and npm installed.

1. Clone the repository:

```powershell
git clone https://github.com/NW0RK/UI-UX-Final-Project.git
cd UI-UX-Final-Project
```

2. Install dependencies:

```powershell
npm install
```

3. Start the desktop app in development mode:

```powershell
npm run dev
```

This starts the Vite renderer on port `5173`, waits for it to be ready, and then launches Electron.

## Optional API Setup

Nexus can run without every external credential, but the richest artwork and discovery experience works best with API keys.

Copy the example environment file:

```powershell
copy .env.example .env
```

Then fill in any credentials you want to use:

```env
STEAMGRIDDB_API_KEY=
IGDB_CLIENT_ID=
IGDB_CLIENT_SECRET=
```

What these unlock:

- `STEAMGRIDDB_API_KEY` improves cover, banner, logo, and icon fetching.
- `IGDB_CLIENT_ID` and `IGDB_CLIENT_SECRET` enable richer IGDB discovery, search, screenshots, details, and trailers.

The desktop app also exposes API credential controls in the Settings panel where supported.

## Developer Commands

Run the Electron app in development mode:

```powershell
npm run dev
```

Build the production renderer:

```powershell
npm run build
```

Preview the built Vite renderer only:

```powershell
npm run preview
```

Note: `npm run preview` previews the renderer and does not exercise the full Electron IPC/native desktop layer.

## Project Structure

```text
.
|-- main.js                  # Electron main process and native IPC handlers
|-- preload.js               # Context-isolated bridge exposed as window.electronAPI
|-- src/
|   |-- App.jsx              # Main React state, routing, persistence, and app flows
|   |-- main.jsx             # React entrypoint
|   |-- index.css            # Global styling, themes, layout, and focus rules
|   |-- components/          # Launcher views, overlays, panels, and UI components
|   |-- hooks/               # Keyboard and controller navigation helpers
|   `-- utils/               # Integrations, metadata helpers, artwork, audio, and data tools
|-- scripts/                 # Development helper scripts
|-- docs/                    # Architecture notes and project documentation
`-- audio/                   # Launcher audio assets
```

## Development Notes

- Renderer code should use `window.electronAPI` for native behavior.
- Do not import Electron APIs directly into React files.
- Preserve browser fallback behavior where it already exists.
- Keep game data fields consistent across imported games, store results, and saved records.
- Use `npm run build` as the baseline verification command. There is currently no automated test script in `package.json`.

## Status

Nexus Launcher is an active final project prototype with a polished desktop experience and several live-service integrations. It is ready to run locally from source, and future work could add packaged Windows releases through GitHub Releases.
