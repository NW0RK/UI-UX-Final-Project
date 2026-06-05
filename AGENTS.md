# Agent Guide

This file is the first stop for AI agents working in this repo. Keep it short and update
[`docs/AGENT_CODEBASE_MAP.md`](docs/AGENT_CODEBASE_MAP.md) when the codebase shape changes.

## Project Snapshot

- App: Nexus Launcher, a Windows-oriented premium game launcher.
- Stack: Vite + React renderer wrapped by Electron.
- Main runtime files: `main.js`, `preload.js`, `src/App.jsx`, `src/main.jsx`, `src/index.css`.
- Native work lives in Electron main process. Renderer code should go through `window.electronAPI`.
- The large controller icon folders are assets. Avoid broad searches or edits there unless the task is about those assets.

## Commands

- Install dependencies after a fresh clone: `npm install`
- Run the Electron app in development: `npm run dev`
- Build the renderer: `npm run build`
- Preview the built Vite renderer only: `npm run preview`

There is no automated test script in `package.json` right now. Use `npm run build` as the baseline verification command for code changes.

## Work Rules For This Repo

- Prefer small, source-local edits. Most user-facing state and flow wiring is in `src/App.jsx`.
- Do not import Electron APIs directly into React files. Add IPC in `main.js`, expose it in `preload.js`, then call it through `window.electronAPI`.
- Preserve browser fallback behavior where it already exists. Many flows use Electron APIs in desktop mode and `localStorage` or mock behavior in browser mode.
- Keep shared game data shape consistent across `defaultGames`, `storeCatalog`, imported games, and saved database records.
- Use existing CSS variables in `src/index.css` for themes, font scale, glass panels, and focus styling.
- Controller support depends on real focusable elements plus `data-controller-*` attributes. When adding interactive UI, check keyboard and gamepad navigation paths.
- Avoid duplicating API keys or large catalog data in documentation. Link to source files instead.
- Treat `dist/`, `node_modules/`, and package-lock/build output as generated or dependency state unless the task specifically targets them.

## Fast Orientation

Read these in order when starting a non-trivial change:

1. [`docs/AGENT_CODEBASE_MAP.md`](docs/AGENT_CODEBASE_MAP.md) for the current architecture map and update checklist.
2. `src/App.jsx` for active views, state, persistence, and action handlers.
3. `preload.js` and matching `ipcMain` handlers in `main.js` for desktop/native behavior.
4. The relevant component in `src/components/`.
5. `src/index.css` for layout and visual rules.

## When You Change The Codebase

Update [`docs/AGENT_CODEBASE_MAP.md`](docs/AGENT_CODEBASE_MAP.md) if you:

- add, remove, or rename source files;
- add, remove, or rename Electron IPC methods;
- change persistence keys or game data shape;
- add a major view, modal, feature flow, or external integration;
- change setup, build, or verification commands.

Keep docs high-level and link to source. The goal is a maintainable map, not a second copy of the code.
