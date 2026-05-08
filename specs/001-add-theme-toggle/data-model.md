# Data Model: Theme Preference

## Entity: Theme Preference

Represents the user's current display theme selection within the browser.

### Fields

- `theme` — `dark` | `light`
- `source` — `default` | `localStorage`
- `storageKey` — constant string used to read/write the value in browser storage

### Validation

- Only `dark` and `light` are accepted values.
- Stored values must be validated before application.
- Invalid or missing stored values should fall back to the default `dark` theme.

### State Transitions

- `default` → `light` when the user selects light mode
- `default` → `dark` when dark mode is selected or no stored preference exists
- `light` ↔ `dark` on each toggle action
- persisted state is reloaded from localStorage on app startup

## Notes

- This is a client-only model that does not involve backend storage.
- The theme preference is independent from meeting configuration and only affects UI presentation.
