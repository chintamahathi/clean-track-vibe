/**
 * theme.ts
 * Persists light/dark/system preference to localStorage.
 * Applies/removes the `dark` class on <html> immediately and reactively.
 */

export type ThemeMode = "light" | "dark" | "system";

const KEY = "ct_theme";
const EVENT = "ct:theme";

export function getThemeMode(): ThemeMode {
  return ((typeof window !== "undefined" ? localStorage.getItem(KEY) : null) as ThemeMode) ?? "light";
}

function prefersDark(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function isDark(): boolean {
  const m = getThemeMode();
  return m === "dark" ? true : m === "light" ? false : prefersDark();
}

export function applyTheme(): void {
  if (typeof document !== "undefined")
    document.documentElement.classList.toggle("dark", isDark());
}

export function setThemeMode(mode: ThemeMode): void {
  localStorage.setItem(KEY, mode);
  applyTheme();
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function onThemeChange(cb: () => void): () => void {
  window.addEventListener(EVENT, cb);
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const mqh = () => { if (getThemeMode() === "system") { applyTheme(); cb(); } };
  mq.addEventListener("change", mqh);
  const onStorage = (e: StorageEvent) => { if (e.key === KEY) { applyTheme(); cb(); } };
  window.addEventListener("storage", onStorage);
  return () => { window.removeEventListener(EVENT, cb); mq.removeEventListener("change", mqh); window.removeEventListener("storage", onStorage); };
}

// Apply immediately on load to prevent flash
if (typeof window !== "undefined") applyTheme();
