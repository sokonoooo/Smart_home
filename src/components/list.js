import { escape } from "../framework/html.js";

/**
 * One row in a list. Put rows inside <div class="list"> to get lines between them.
 * `leading` (left) and `trailing` (right) are HTML.
 */
export function listRow({ leading = "", title, subtitle = "", meta = "", trailing = "" }) {
  return `
    <div class="list-row">
      ${leading}
      <div class="list-row__body">
        <strong class="list-row__title">${escape(title)}</strong>
        ${subtitle ? `<small class="list-row__subtitle">${escape(subtitle)}</small>` : ""}
      </div>
      ${meta ? `<span class="list-row__meta">${escape(meta)}</span>` : ""}
      ${trailing}
    </div>`;
}
