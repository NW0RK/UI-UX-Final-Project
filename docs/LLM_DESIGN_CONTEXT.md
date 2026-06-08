# Nexus Launcher LLM Design Context

Use this file as the saved design context for LLM-assisted UI, UX, product, and frontend work in this repository. For implementation architecture, pair it with `docs/AGENT_CODEBASE_MAP.md`.

## Configured Context

```yaml
context_id: nexus-launcher-design-context
product_name: Nexus Launcher
product_type: Windows-oriented premium game launcher
stack: Vite + React renderer inside Electron
primary_surface: Desktop launcher UI
design_priority: UI/UX quality, usability, learnability, and meaningful feedback
default_verification: npm run build
last_updated: 2026-06-05
```

## Product Brief

Nexus Launcher is a premium desktop launcher for managing, discovering, importing, and launching PC games. It should feel like a focused gaming cockpit: cinematic enough to make the library feel special, but practical enough for repeated daily use with keyboard, mouse, and controller.

The experience is Windows-first. Renderer code should remain browser-tolerant where existing flows already provide fallbacks, but native behavior belongs behind the Electron bridge exposed as `window.electronAPI`.

## Audience

- PC players who want a polished local game library.
- Users who expect gamepad-friendly navigation from a couch or desk.
- Reviewers evaluating UI/UX quality, workflow clarity, functionality, and presentation polish.

## Visual Direction

- Premium dark interface with glass panels, cinematic game artwork, and ambient particle motion.
- Default theme is Aether Core: cyan/deep-space teal accents on a near-black surface.
- Other supported themes are Cyber Glitch, Emerald Matrix, and Imperial Gold.
- Typography uses Inter through `--font-display` and `--font-sans`.
- Prefer existing CSS variables from `src/index.css`, especially `--accent-color`, `--accent-color-rgb`, `--panel-bg`, `--glass-border`, `--glass-border-focus`, `--fs-*`, and transition variables.
- Preserve the launcher feel: compact, confident, game-focused, and media-rich.

## Interaction Model

- Top navigation switches between Library, Favourites, Store, Search, and Store Item flows.
- The library centers on a selected-game hero banner plus a horizontal game rail.
- Store and search flows emphasize discovery, Steam/IGDB media, ownership state, reviews, pricing, and executable linking.
- The Control Center is a bottom utility drawer for imports, scans, diagnostics, artwork actions, system actions, and settings access.
- Settings, metadata editing, profile editing, media lightbox, and controller hints sit above the main workspace as overlays.

## Controller And Keyboard Requirements

- New interactive UI must use real focusable elements.
- Add controller navigation attributes where appropriate:
  - `data-controller-item="true"` for repeated navigable items.
  - `data-controller-selected="true"` for the selected item in a set.
  - `data-controller-default="true"` for the preferred first focus target.
  - `data-controller-back="true"` for modal or detail-view exits.
  - Directional attributes such as `data-controller-left="true"` only when they intentionally trigger scoped movement/actions.
- Preserve visible focus styling and keyboard/gamepad navigation paths.
- Avoid hiding essential actions behind mouse-only hover states.

## UI Rules For LLM Work

- Prefer source-local edits and existing component patterns.
- Keep the interface usable on desktop-size windows and narrower responsive layouts.
- Use existing components before creating new abstractions.
- Use lucide-react icons for icon buttons when an icon exists.
- Keep card radii at 8px or less unless matching an existing local pattern.
- Do not place cards inside cards.
- Keep controls compact, scannable, and task-oriented.
- Avoid marketing-page composition; the first screen should be the actual launcher experience.
- Use real game artwork, cached media, Steam/IGDB imagery, or existing assets where media is expected.
- Ensure text fits its container and does not overlap adjacent UI.

## Data And Integration Sensitivities

- Keep game records compatible across imported games, saved database records, IGDB-backed discovery items, store items, and fallback seeds.
- Common game fields include `id`, `title`, `developer`, `publisher`, `genre`, `rating`, `ageRating`, `releaseDate`, `description`, `tags`, `owned`, `isFavorite`, `playtime`, `lastPlayed`, `progress`, `exePath`, media URLs, Steam IDs, IGDB IDs, legacy RAWG IDs, and HLTB data.
- Do not duplicate API keys or large catalog data in documentation.
- External services include Steam, SteamGridDB, IGDB, HowLongToBeat, IsThereAnyDeal, and Brandfetch.
- Browser fallback behavior matters when the surrounding code already supports it.

## Prompt Starter

```text
You are working on Nexus Launcher, a Windows-first premium game launcher built with Vite, React, and Electron. Preserve the existing dark glass, cinematic, controller-friendly design language. Use the saved design context in docs/LLM_DESIGN_CONTEXT.md and the architecture map in docs/AGENT_CODEBASE_MAP.md before changing UI. Keep renderer code behind window.electronAPI for native behavior, preserve browser fallbacks where they already exist, and verify code changes with npm run build.
```

## Before Shipping Design Changes

- Check the affected component and nearby CSS in `src/index.css`.
- Confirm keyboard and controller focus paths.
- Confirm responsive text and layout do not overlap.
- Update `docs/AGENT_CODEBASE_MAP.md` when architecture, major flows, IPC, persistence, or source shape changes.
- Run `npm run build` for code changes, or note why it was not needed for docs-only changes.
