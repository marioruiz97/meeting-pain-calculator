# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```powershell
npm run dev        # Start dev server at http://localhost:3000
npm run build      # Production build
npm run lint       # ESLint via next lint
npm run type-check # TypeScript check without emitting files
```

Before first run: copy `.env.example` to `.env.local` and set `OPENAI_API_KEY`. Both `npm run lint` and `npm run type-check` must pass before any PR.

## Spec-Driven Development (spec-kit)

spec-kit is installed via `specify-cli`. Use these skills in order when implementing new features:

| Skill | Purpose |
|---|---|
| `/speckit-constitution` | Establish project principles |
| `/speckit-specify` | Create baseline spec for the feature |
| `/speckit-clarify` | (Optional) Resolve ambiguities before planning |
| `/speckit-plan` | Create implementation plan |
| `/speckit-checklist` | (Optional) Validate plan completeness |
| `/speckit-tasks` | Generate actionable tasks |
| `/speckit-analyze` | (Optional) Cross-artifact consistency check |
| `/speckit-implement` | Execute implementation |

Skills are located in `.claude/skills/` (excluded from git via `.gitignore`).

## Architecture

Single-page app with a two-column layout (`Dashboard.tsx` owns all state):

- **Left sidebar**: `MeetingConfigPanel` (inputs) → `CostBurnCounter` (real-time ticker)
- **Right main**: `AgendaAnalyzer` (textarea + submit) → `AnalysisResults` (charts + breakdown)

State flows top-down from `Dashboard`: `MeetingConfig` (attendees, rate, duration, agenda) is lifted there and passed as props. `MeetingAnalysis | null` is set via `onAnalysisComplete` callback from `AgendaAnalyzer` after a successful API call.

### AI endpoint

`POST /api/analyze` uses Vercel AI SDK's `generateObject` with a Zod schema (`MeetingAnalysisSchema`) to get structured output from `gpt-4o-mini`. The schema is the source of truth for the response shape — `MeetingAnalysis` in `lib/types.ts` mirrors it for the client side.

### Shared utilities (`lib/`)

- `types.ts` — all shared TypeScript interfaces (`MeetingConfig`, `MeetingAnalysis`, `AgendaItem`, `AnalysisState`)
- `utils.ts` — `calculateMeetingCost`, `formatCurrency`, `formatDuration`, `getPainScore`/`getPainLabel` helpers

### Styling conventions

Dark-only theme (no light mode). CSS custom properties are defined in `globals.css` as HSL values on `:root`. Fire-themed utilities are defined there too: `.fire-gradient`, `.fire-text`, `.glow-orange`, `.glow-red`, `.counter-display` (tabular nums). Use `cn()` from `lib/utils.ts` for conditional class merging.

UI primitives in `components/ui/` follow the Shadcn pattern: each wraps a Radix UI primitive with `cn()` and `class-variance-authority` variants.
