/**
 * calendarUnread.ts
 * Tracks whether the resident has an unread calendar/collection schedule update.
 * Persists to localStorage so state survives page reloads.
 *
 * ct_cal_latest_id  — ID of the most recent schedule update published
 * ct_cal_read_id    — ID of the last update the resident viewed
 *
 * Unread = latest_id !== read_id  (or read_id absent)
 */

const KEY_LATEST = "ct_cal_latest_id";
const KEY_READ   = "ct_cal_read_id";
const EVENT_NAME = "ct:calendarUnread";

function getLatestId(): string | null { return localStorage.getItem(KEY_LATEST); }
function getReadId(): string | null   { return localStorage.getItem(KEY_READ); }
function dispatch() { window.dispatchEvent(new CustomEvent(EVENT_NAME)); }

export function hasUnreadCalendar(): boolean {
  const latest = getLatestId();
  if (!latest) return false;
  return latest !== getReadId();
}

export function markCalendarRead(): void {
  const latest = getLatestId();
  if (!latest) return;
  localStorage.setItem(KEY_READ, latest);
  dispatch();
}

export function publishCalendarUpdate(updateId: string): void {
  localStorage.setItem(KEY_LATEST, updateId);
  dispatch();
}

export function onCalendarUnreadChange(cb: () => void): () => void {
  window.addEventListener(EVENT_NAME, cb);
  function onStorage(e: StorageEvent) {
    if (e.key === KEY_LATEST || e.key === KEY_READ) cb();
  }
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT_NAME, cb);
    window.removeEventListener("storage", onStorage);
  };
}

// Seed initial unread on first load so the dot is visible as demo
if (typeof window !== "undefined") {
  const INITIAL_UPDATE_ID = "schedule-2026-08-24";
  if (!getLatestId()) {
    localStorage.setItem(KEY_LATEST, INITIAL_UPDATE_ID);
  }
}
