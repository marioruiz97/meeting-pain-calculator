# Tasks: Add Theme Toggle

**Input**: Design documents from `/specs/001-add-theme-toggle/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare the existing dashboard and global style system for runtime theme switching.

- [x] T001 [P] Create `lib/theme.ts` with theme constants, localStorage key, theme validation, and applyTheme helper
- [x] T002 [P] Update `app/layout.tsx` to render `<html lang="en">` without a hard-coded `dark` class
- [x] T003 [P] Add light theme CSS variable overrides and fire/orange palette support in `app/globals.css`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Implement the shared theme persistence and application behavior before story-specific UI work.

- [x] T004 Add `.light` root-class overrides in `app/globals.css` to support light mode using the existing fire/orange palette
- [x] T005 Implement theme loading on client startup in `components/dashboard/Dashboard.tsx` using `lib/theme.ts`
- [x] T006 Implement graceful fallback when localStorage is unavailable in `lib/theme.ts` and default to dark theme

---

## Phase 3: User Story 1 - Toggle Theme (Priority: P1) 🎯 MVP

**Goal**: Add an in-header theme toggle so users can switch between dark and light mode immediately.

**Independent Test**: Click the header toggle and verify the app switches between dark and light themes instantly.

- [x] T007 [US1] Add a theme toggle button to the dashboard header in `components/dashboard/Dashboard.tsx`
- [x] T008 [US1] Implement the toggle click handler in `components/dashboard/Dashboard.tsx` to switch the current theme
- [x] T009 [US1] Ensure the toggle button includes an accessible label and visible state in `components/dashboard/Dashboard.tsx`

---

## Phase 4: User Story 2 - Persist Theme Preference (Priority: P2)

**Goal**: Remember the selected theme across browser sessions using localStorage.

**Independent Test**: Select a theme, reload the page, and verify the same theme is restored.

- [x] T010 [US2] Persist selected theme to localStorage in `lib/theme.ts`
- [x] T011 [US2] Load and apply the persisted theme on app startup in `components/dashboard/Dashboard.tsx`
- [x] T012 [US2] Verify that invalid or missing stored values fall back to dark theme in `lib/theme.ts`

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final validation, documentation, and build checks for the feature.

- [ ] T013 [P] Update `specs/001-add-theme-toggle/quickstart.md` with verification steps for the theme toggle and persistence behavior
- [ ] T014 [P] Run `npm run lint` and `npm run type-check` from the repository root to validate the feature changes

---

## Dependencies & Execution Order

- **Phase 1** can start immediately and is parallelizable across files
- **Phase 2** depends on Phase 1 completion and blocks all user story implementation
- **Phase 3** and **Phase 4** depend on Phase 2 completion
- **Phase 5** depends on story implementation completion

### User Story Dependencies

- User Story 1 (P1): no dependency on other stories once foundational theme support exists
- User Story 2 (P2): depends on theme storage and startup behavior from Phase 2

### Parallel Opportunities

- `T001`, `T002`, and `T003` can run in parallel because they touch distinct files
- `T004`, `T005`, and `T006` can run in parallel after Phase 1 is complete
- `T013` and `T014` are cross-cutting polish tasks that can run after implementation work is complete

## Implementation Strategy

### MVP First

1. Complete Phase 1 setup and Phase 2 foundation
2. Implement User Story 1 in Phase 3
3. Validate theme switching manually
4. Implement User Story 2 in Phase 4
5. Validate persistence manually
6. Finish polish tasks in Phase 5

### Incremental Delivery

- Start with the toggle UI and runtime theme support
- Add persistence as a second increment
- Keep changes small and confined to `lib/theme.ts`, `app/layout.tsx`, `app/globals.css`, and `components/dashboard/Dashboard.tsx`
