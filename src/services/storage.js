// =========================================================
// STORAGE SERVICE — saves small values in the browser.
// localStorage can be blocked (private browsing, strict
// settings), so every call is wrapped in try/catch and the
// app keeps working even when nothing can be saved.
// =========================================================

export function load(key, fallback) {
  let value;
  try {
    value = localStorage.getItem(key);
  } catch {
    return fallback;
  }
  if (value === null) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return value; // saved as plain text by an older version
  }
}

export function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Not saved — that's okay, it still works for this visit.
  }
}
