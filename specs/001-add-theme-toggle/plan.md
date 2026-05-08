# Implementation Plan: Add Theme Toggle

**Branch**: `001-add-theme-toggle` | **Date**: May 8, 2026 | **Spec**: specs/001-add-theme-toggle/spec.md
**Input**: Feature specification from `/specs/001-add-theme-toggle/spec.md`

**Note**: This file is the output of `/speckit.plan`. It captures the phase 0 and phase 1 design work for adding a persistent theme toggle to the dashboard.

## Summary

Add a dark/light theme toggle to the existing Meeting Pain Calculator dashboard header. The feature will enable explicit theme switching, store the user preference in browser localStorage, and preserve the current fire/orange palette in light mode while keeping dark mode as the default experience.

## Technical Context

**Language/Version**: TypeScript 5.5 with Next.js 14.2  
**Primary Dependencies**: React 18.3, Next.js, Tailwind CSS, lucide-react, Zod, `ai`/OpenAI SDK  
**Storage**: Browser localStorage for theme preference  
**Testing**: `npm run lint`, `npm run type-check`, manual browser validation via `npm run dev`  
**Target Platform**: Web browser on a Next.js application  
**Project Type**: web application  
**Performance Goals**: Theme switching must update visually within 100ms and not add measurable render cost; preserve existing page load performance  
**Constraints**: No new backend persistence; minimal runtime overhead; use existing UI structure in the dashboard header; fallback gracefully when localStorage is unavailable  
**Scale/Scope**: Single-page UI enhancement inside the current web dashboard; no new API routes or backend services required

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

[Gates determined based on constitution file]

## Project Structure

### Documentation (this feature)

```text
specs/001-add-theme-toggle/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── theme-toggle-ui-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
app/
├── globals.css
├── layout.tsx
└── page.tsx
components/
├── dashboard/
│   ├── AgendaAnalyzer.tsx
│   ├── AnalysisResults.tsx
│   ├── CostBurnCounter.tsx
│   ├── Dashboard.tsx
│   └── MeetingConfigPanel.tsx
└── ui/
    ├── badge.tsx
    ├── button.tsx
    ├── card.tsx
    ├── input.tsx
    ├── label.tsx
    ├── progress.tsx
    ├── separator.tsx
    └── textarea.tsx
lib/
└── types.ts
```

**Structure Decision**: Use the existing Next.js app structure under `app/` and `components/`. This is a client-side UI-only feature, so no separate backend or package layout is needed.

## Complexity Tracking

> No constitution violations detected. No additional architectural complexity is required.
