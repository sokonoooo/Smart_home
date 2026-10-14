import { dataAttrs, escape } from "../framework/html.js";

/** Pill-shaped suggestion button. */
export function chip(text, { data, disabled = false } = {}) {
  return `<button type="button" class="chip"${dataAttrs(data)}${disabled ? " disabled" : ""}>${escape(text)}</button>`;
}
