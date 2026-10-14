import { escape } from "../framework/html.js";
import { iconTile } from "./icon-tile.js";

/**
 * Card with an icon, a label, a big value and a hint.
 * layout: "row" (icon on the left) | "stack" (icon on top, bigger value)
 * `value` and `hint` are HTML.
 */
export function statCard({ iconName, label, value, hint = "", layout = "row" }) {
  const stack = layout === "stack";
  return `
    <article class="card stat-card${stack ? " stat-card--stack" : ""}">
      ${iconTile(iconName, { size: stack ? "sm" : "lg" })}
      <div class="stat-card__body">
        <span class="stat-card__label">${escape(label)}</span>
        <strong class="stat-card__value">${value}</strong>
        ${hint ? `<span class="stat-card__hint">${hint}</span>` : ""}
      </div>
    </article>`;
}
