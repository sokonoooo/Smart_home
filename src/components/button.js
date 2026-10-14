import { classes, dataAttrs, escape } from "../framework/html.js";
import { icon } from "./icon.js";

/**
 * Button
 *   button({ label: "Save", variant: "primary", iconLeft: "plus", data: { action: "save" } })
 * variant: "primary" | "outline" | "ghost" | "link"     size: "md" | "sm"
 */
export function button({ label, variant = "outline", size = "md", iconLeft, iconRight, data, disabled = false, type = "button", className = "" }) {
  return `
    <button type="${type}" class="${classes("btn", `btn--${variant}`, size === "sm" && "btn--sm", className)}"${dataAttrs(data)}${disabled ? " disabled" : ""}>
      ${iconLeft ? icon(iconLeft, size === "sm" ? 16 : 18) : ""}
      ${escape(label)}
      ${iconRight ? icon(iconRight, 16) : ""}
    </button>`;
}

/**
 * Square button with only an icon. `label` is read aloud by screen readers.
 * variant: "outline" | "ghost" | "primary"
 */
export function iconButton({ iconName, label, variant = "outline", data, disabled = false, type = "button", className = "" }) {
  return `<button type="${type}" class="${classes("icon-btn", variant !== "outline" && `icon-btn--${variant}`, className)}" aria-label="${escape(label)}" title="${escape(label)}"${dataAttrs(data)}${disabled ? " disabled" : ""}>${icon(iconName, 19)}</button>`;
}
