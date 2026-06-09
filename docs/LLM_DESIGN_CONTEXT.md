# Nexus Launcher Product Design Context

Use this file as the durable Product Design and LLM context for UI, UX, product, and frontend work in this repository. Pair it with `docs/AGENT_CODEBASE_MAP.md` before making implementation changes.

## Context Metadata

```yaml
context_id: nexus-launcher-product-design-context
product_name: Nexus Launcher
product_type: Windows-oriented premium PC game launcher
stack: Vite + React renderer wrapped by Electron
primary_surface: Desktop launcher UI
target_platform: Windows desktop, with browser fallback where existing code supports it
default_verification: npm run build
browser_verification: do not use browser verification for this repo
last_updated: 2026-06-09
```

## Product Brief

Nexus Launcher is a premium desktop game launcher for managing, discovering, importing, and launching PC games. It should feel like a focused gaming cockpit: cinematic and media-rich enough to make the user's library feel special, but practical enough for repeated daily use with mouse, keyboard, and controller.

The app is Windows-first. Native work belongs in the Electron main process and should be exposed through `window.electronAPI` from `preload.js`. React files should not import Electron APIs directly.

## Audience

- PC players who want a polished local game library and discovery surface.
- Users navigating from a couch or desk with controller support.
- Reviewers evaluating UI/UX quality, workflow clarity, functionality, accessibility, and presentation polish.
- Future LLM agents that need stable product/design context without rereading the whole codebase.

## Core Experience

- Library: a selected-game cinematic hero banner plus a horizontal game rail.
- Favourites: a trophy-room style view for favorite titles.
- Store: a split discovery surface with IGDB PopScore trending games and ITAD/CheapShark deal feeds.
- Search: a dedicated results view combining local library matches, store items, and IGDB discovery.
- Store item: a media-rich detail page with Steam/IGDB media, review summaries, pricing, owned state, executable linking, and launch/edit/remove actions.
- Control Center: a bottom drawer for imports, executable scans, diagnostics, batch artwork, settings, and system actions.
- Overlays: settings, metadata editing, profile editing, import name confirmation, controller hints, and selected media/lightbox experiences.

## Visual Direction

- Premium dark interface with near-black surfaces, glass panels, cinematic artwork, and ambient particle motion.
- Default theme is Aether Core: cyan/deep-space teal accents.
- Other supported themes are Cyber Glitch, Emerald Matrix, and Imperial Gold.
- Typography uses Inter through `--font-display` and `--font-sans`.
- Prefer existing CSS variables from `src/index.css`, especially `--accent-color`, `--accent-color-rgb`, `--panel-bg`, `--panel-bg-solid`, `--glass-border`, `--glass-border-focus`, `--fs-*`, and transition variables.
- The UI should read compact, confident, game-focused, and media-rich. Avoid marketing-page layouts.
- Use real game artwork, cached artwork, Steam/IGDB imagery, or existing assets where media is expected.

## Interaction Model

- Top navigation switches Store, Library, and Favourites; search promotes the app into the Search view.
- Selected game state drives the Library hero and rail selection.
- Store and search item selection opens the Store Item view without saving to the library until the user marks the item owned.
- Imported local games should preserve `exePath`, `owned`, and user-editable metadata while being enriched by Steam, IGDB, HLTB, and SteamGridDB where available.
- Hover effects should have keyboard/controller equivalents through focus states.
- Essential actions must not be hidden behind mouse-only hover affordances.

## Controller And Keyboard Requirements

New interactive UI must use real focusable elements and keep visible focus styling intact.

Use controller attributes where appropriate:

- `data-controller-item="true"` for repeated navigable items.
- `data-controller-selected="true"` for the selected item in a set.
- `data-controller-default="true"` for the preferred first focus target.
- `data-controller-back="true"` for modal or detail-view exits.
- Directional attributes such as `data-controller-left="true"` only when they intentionally trigger scoped movement or actions.

Controller behavior is centralized in `src/hooks/useUnifiedInput.js`. Check that new controls are reachable by keyboard/gamepad and do not create focus traps.

## Design Rules For LLM Work

- Prefer source-local edits and existing component patterns.
- Use existing components before adding new abstractions.
- Use `lucide-react` icons for icon buttons when an icon exists.
- Keep controls compact, scannable, and task-oriented.
- Preserve stable dimensions for cards, rails, toolbars, counters, media frames, and repeated tiles so text, hover states, and loading states do not shift layout.
- Make text fit its container on narrow and desktop layouts; wrap or clamp deliberately.
- Avoid cards inside cards. Use cards for repeated items, modals, or intentionally framed tools.
- Avoid decorative-only visual noise. Any media or motion should clarify product state, gameplay media, discovery context, or hierarchy.
- Maintain responsive behavior for narrower windows even though the primary product is desktop.
- Do not add in-app instructional copy that explains obvious UI mechanics, keyboard shortcuts, or the design itself.

## Data And Integration Sensitivities

Keep shared game data compatible across imported games, saved database records, IGDB-backed discovery items, store items, and fallback seeds.

Common game fields include:

- Identity and metadata: `id`, `title`, `developer`, `publisher`, `genre`, `rating`, `ageRating`, `releaseDate`, `description`, `tags`.
- Library state: `owned`, `isFavorite`, `playtime`, `lastPlayed`, `progress`, `timeToComplete`, `nextAchievement`, `exePath`.
- Media and artwork: `coverUrl`, `bannerUrl`, `logoUrl`, `iconUrl`, `bannerLayout`, `artworkFetched`, `artworkSource`, `steamAppId`, `steamGridDbId`, `steamGridDbName`, `trailerVideoId`, `trailerEmbedUrl`, `trailerLookupStatus`.
- Integrations: `hltb`, `igdbId`, `igdbSlug`, `igdbUrl`, `igdbRating`, `source: 'igdb'`, legacy `rawgId`, transient `steamReviewScore`, ITAD deal fields, and CheapShark deal fields.

Do not duplicate API keys, secrets, tokens, credentials, or large catalog data in documentation. External services include Steam, SteamGridDB, IGDB, HowLongToBeat, IsThereAnyDeal, CheapShark, and Brandfetch.

## Source Anchors

- Product architecture and update checklist: `docs/AGENT_CODEBASE_MAP.md`.
- App state hub and view routing: `src/App.jsx`.
- Global tokens, layout, focus styles, and most CSS: `src/index.css`.
- Electron bridge: `preload.js`.
- Native IPC and persistence: `main.js`.
- Keyboard/gamepad navigation: `src/hooks/useUnifiedInput.js`.
- Empty first-run/reset seeds and fallback game shape: `src/utils/mockDatabase.js`.
- Library hero: `src/components/GameMainBanner.jsx`.
- Library rail: `src/components/HorizontalLibrary.jsx`.
- Store landing: `src/components/StoreGrid.jsx`.
- Store detail: `src/components/StoreItemPage.jsx`.
- Search results: `src/components/SearchResultsPage.jsx`.
- Settings and API configuration: `src/components/SettingsPanel.jsx`.

## Prompt Starter

```text
You are working on Nexus Launcher, a Windows-first premium game launcher built with Vite, React, and Electron. Use docs/LLM_DESIGN_CONTEXT.md for product/design context and docs/AGENT_CODEBASE_MAP.md for architecture. Preserve the dark glass, cinematic, media-rich, controller-friendly design language. Keep native behavior behind window.electronAPI, preserve browser fallbacks where existing flows already support them, and verify code changes with npm run build only.
```

## Product Design Request Starter

```text
For Product Design work, treat Nexus Launcher as a premium desktop gaming cockpit. Ground recommendations in the existing Library, Favourites, Store, Search, Store Item, Control Center, Settings, Metadata Editor, Profile, Import Prompt, and Controller Hint flows. Prioritize usability, focus navigation, media hierarchy, responsive text, and implementation fit with the existing React/Electron codebase.
```

## Before Shipping UI Or UX Changes

- Read the affected component and nearby CSS in `src/index.css`.
- Confirm keyboard and controller focus paths from source.
- Preserve Electron boundaries and browser fallbacks where they already exist.
- Keep game data shape compatible across library, store, imported, and persisted records.
- Update `docs/AGENT_CODEBASE_MAP.md` when architecture, source shape, major flows, IPC, persistence, or verification commands change.
- Run `npm run build` for code changes. For docs-only changes, a successful build is still acceptable as baseline verification.
