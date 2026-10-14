import { escape } from "../framework/html.js";
import { icon } from "./icon.js";

// A card is just a <div class="card">. Variants are CSS classes:
//   card--lg (more padding)   card--flush (no padding)
//   card--inverse (dark)      card--accent (soft green)

/** Small uppercase label that sits above a title. */
export function eyebrow(text, iconName) {
  return `<span class="eyebrow">${iconName ? icon(iconName, 16) : ""}${escape(text)}</span>`;
}

/**
 * Title block at the top of a card.
 * `title` and `action` are HTML (so you can pass a button or a badge).
 */
export function cardHeader({ label, iconName, title, description, action = "" }) {
  return `
    <div class="card__header">
      <div>
        ${label ? eyebrow(label, iconName) : ""}
        <h2 class="card__title">${title}</h2>
        ${description ? `<p class="card__description">${escape(description)}</p>` : ""}
      </div>
      ${action}
    </div>`;
}
