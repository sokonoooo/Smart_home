// =========================================================
// THEME SERVICE — light / dark / system
// The :root tokens in src/style.css swap colors when
// <html data-theme="dark"> is set. This file decides which.
// =========================================================

import { load, save } from "./storage.js";

const STORAGE_KEY = "haven-theme";
const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
const listeners = [];

/** The user's choice: "light", "dark" or "system". */
export function getPreference() {
  const value = load(STORAGE_KEY, "system");
  return ["light", "dark", "system"].includes(value) ? value : "system";
}

/** What is showing right now: "light" or "dark". */
export function getTheme() {
  const preference = getPreference();
  if (preference === "system") return darkQuery.matches ? "dark" : "light";
  return preference;
}

export function setPreference(preference) {
  save(STORAGE_KEY, preference);
  applyTheme();
}

/** Runs `listener` whenever the theme changes. */
export function onThemeChange(listener) {
  listeners.push(listener);
}

function applyTheme() {
  document.documentElement.dataset.theme = getTheme();
  listeners.forEach((listener) => listener(getTheme()));
}

// Follow the device setting while the preference is "system".
darkQuery.addEventListener("change", applyTheme);
applyTheme();
