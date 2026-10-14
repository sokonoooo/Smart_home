// =========================================================
// HTML HELPERS — small tools for building HTML strings.
// =========================================================

/** Makes text safe to put inside HTML (stops code injection from user input). */
export function escape(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/** Joins class names and skips empty ones: classes("btn", isBig && "btn--big") */
export function classes(...names) {
  return names.filter(Boolean).join(" ");
}

/** Turns { action: "x", id: 2 } into ' data-action="x" data-id="2"' */
export function dataAttrs(data = {}) {
  return Object.entries(data)
    .map(([key, value]) => ` data-${key}="${escape(value)}"`)
    .join("");
}

/** Builds HTML for a list: each(items, (item) => `<li>…</li>`) */
export function each(items, toHtml) {
  return items.map(toHtml).join("");
}
