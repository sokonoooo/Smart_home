import { dataAttrs, each, escape } from "../framework/html.js";

/** Underlined tabs. Clicking one runs `action` with data-value set to the tab's name. */
export function tabs({ items, active, action, label }) {
  return `
    <nav class="tabs" aria-label="${escape(label)}">
      ${each(items, (item) => `<button type="button" class="tabs__tab${item === active ? " is-active" : ""}"${dataAttrs({ action, value: item })}>${escape(item)}</button>`)}
    </nav>`;
}
