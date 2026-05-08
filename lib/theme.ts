export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "meeting-pain-calculator-theme";

export function isTheme(value: unknown): value is Theme {
  return value === "dark" || value === "light";
}

function safeLocalStorage(): Storage | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function getStoredTheme(): Theme | null {
  const storage = safeLocalStorage();
  if (!storage) {
    return null;
  }

  const rawValue = storage.getItem(THEME_STORAGE_KEY);
  return isTheme(rawValue) ? rawValue : null;
}

export function saveTheme(theme: Theme): void {
  const storage = safeLocalStorage();
  if (!storage) {
    return;
  }

  try {
    storage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Ignore storage write failures to preserve app stability.
  }
}

export function applyTheme(theme: Theme): void {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;
  if (theme === "light") {
    root.classList.add("light");
  } else {
    root.classList.remove("light");
  }
}

export function getPreferredTheme(): Theme {
  const storedTheme = getStoredTheme();
  return storedTheme ?? "dark";
}

export function initializeTheme(): Theme {
  const theme = getPreferredTheme();
  applyTheme(theme);
  return theme;
}

export function toggleTheme(current: Theme): Theme {
  const nextTheme = current === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  saveTheme(nextTheme);
  return nextTheme;
}
