# Theme Toggle UI Contract

## Component
Dashboard header theme toggle

## Behavior

- The toggle button is rendered in the dashboard header next to the title and status text.
- Clicking the toggle switches the UI between dark and light mode immediately.
- The toggle reflects the current theme state with a visible label or icon state.
- The selected theme is persisted in localStorage under a stable key such as `meeting-pain-calculator-theme`.
- On startup, the app loads the persisted theme preference and applies it automatically.
- If localStorage is unavailable, the app defaults to dark mode and continues functioning without failure.

## Validation

- User clicks toggle → theme changes instantly.
- Browser reload preserves the selected theme.
- Light mode remains legible and consistent with the fire/orange palette.
- No server-side call is required for theme persistence.
