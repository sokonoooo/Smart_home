import { escape } from "../framework/html.js";

/** Placeholder shown when a list has nothing in it. */
export function emptyState(text) {
  return `<div class="empty-state">${escape(text)}</div>`;
}
