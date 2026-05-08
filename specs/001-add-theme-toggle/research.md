# Research: Theme Toggle Persistence and UI Behavior

## Decision: Browser-local persistence with class-based theme switching

The theme toggle will persist the user's choice in browser localStorage and apply the selected theme by toggling a root-level CSS class. This keeps the feature client-only, satisfies the request for session persistence, and avoids introducing backend storage or new external dependencies.

## Rationale

- The user request specifically requires localStorage persistence across sessions.
- The app is a browser-based Next.js dashboard, so localStorage is the simplest and most reliable storage mechanism for a UI preference.
- A class-based theme switch allows the existing Tailwind-based style system to be extended cleanly while preserving the current dark default.
- This approach aligns with the project's minimalist constitution: one small UI change, no extra persistence layer, no unnecessary architecture.

## Alternatives considered

- `prefers-color-scheme` only: rejected because it does not remember an explicit user choice across browser sessions.
- Server-side or profile-based persistence: rejected because the feature is purely a local UI preference and would add complexity against the constitution.
- Theme library like `next-themes`: rejected for this feature because the requirement is small and can be implemented with built-in browser APIs and CSS class toggling.

## Implementation notes

- Use a dedicated localStorage key such as `meeting-pain-calculator-theme`.
- Default to dark theme when no preference exists or storage access is blocked.
- Apply the selected theme by updating `document.documentElement` or `body` from a client component.
- Keep light mode colors consistent with the existing fire/orange palette and ensure WCAG AA contrast for text.
