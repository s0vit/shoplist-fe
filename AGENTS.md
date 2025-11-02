# Repository Guidelines

## Project Structure & Module Organization
Source lives in `src/` with a feature-sliced layout: `app/` bootstraps, `pages/` handle routes, `widgets/` and `entities/` host reusable UI, and `shared/` keeps cross-cutting code. Stories stay in `src/stories/`, locales in `locales/`, Playwright specs under `tests/`, built assets in `dist/`, static files in `public/`, and helper scripts/config at the repo root.

## Build, Test, and Development Commands
- `pnpm install`: Sync dependencies using the repository’s pinned pnpm version.
- `pnpm dev`: Start the Vite dev server with hot reloading.
- `pnpm build`: Type-check with `tsc` and produce a production bundle in `dist/`.
- `pnpm preview`: Serve the built app locally to validate the production bundle.
- `pnpm test:unit`: Run Vitest with the happy-dom environment and Testing Library helpers.
- `pnpm test:e2e`: Execute Playwright specs in `tests/playwright`.
- `pnpm lint` / `pnpm format`: Enforce eslint and prettier rules; use `:fix` variants to auto-correct.

## Coding Style & Naming Conventions
TypeScript and React are the default; prefer `.tsx` for components and hooks. Follow Prettier’s 2-space indentation and keep imports grouped (external → shared → local). Name components and widgets in PascalCase, hooks in `useCamelCase`, and co-locate files with their owning feature. Global styling starts in `src/index.css`; prefer Emotion or styled-components for scoped styles. Resolve eslint/prettier findings before committing.

## Testing Guidelines
Write unit and integration specs alongside code as `*.spec.ts(x)` and use Testing Library assertions (`vitest.setup.ts` wires jest-dom). Stub network calls with MSW or Playwright fixtures to stay deterministic. For UI flows, keep Playwright specs in `tests/` and capture traces with `pnpm test:e2e:debug` when triaging. Cover new logic with Vitest and hit critical journeys in Playwright before merging.

## Commit & Pull Request Guidelines
Commits must pass commitlint’s Conventional Commit rules; run `pnpm cm` for the guided Commitizen flow. Keep commits scoped and reference Jira/GitHub issue keys when available. PRs should summarize changes, list impacted screens, note new env vars, link issues, and confirm lint/test status. Add screenshots or Playwright traces for UI shifts.

## Environment & Security Notes
App secrets load from `.env` files consumed by Vite; never commit secrets—mirror additions in `.env.example`. Before Storybook (`pnpm storybook`), run `scripts/generateColorPalette.cjs` to sync design tokens. Use `docker-compose.yml` or provided mocks for local APIs and keep Playwright storage artifacts out of version control.
