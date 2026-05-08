# Quickstart: Validate the Theme Toggle Feature

1. Install dependencies

```bash
npm install
```

2. Start the local development server

```bash
npm run dev
```

3. Open the app in a browser

http://localhost:3000

4. Verify the theme toggle appears in the dashboard header.

5. Click the toggle to switch from dark mode to light mode and confirm the visual styling updates immediately.

6. Reload the page or close and reopen the browser tab.

7. Confirm the selected theme remains active after reload.

8. If localStorage is unavailable, verify the app continues using the dark theme and does not throw errors.

## Verification notes

- Light mode should still use fire/orange styling and maintain text legibility.
- The toggle should be discoverable in the header and should not disrupt the existing navigation or layout.
