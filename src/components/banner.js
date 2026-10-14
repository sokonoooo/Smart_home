import { escape } from "../framework/html.js";
import { icon } from "./icon.js";

/** Highlighted message with an optional button (`action` is HTML). */
export function banner({ iconName, title, text, action = "" }) {
  return `
    <section class="card card--accent banner">
      <span class="banner__icon">${icon(iconName, 24)}</span>
      <div>
        <strong class="banner__title">${escape(title)}</strong>
        <p class="banner__text">${escape(text)}</p>
      </div>
      ${action}
    </section>`;
}
