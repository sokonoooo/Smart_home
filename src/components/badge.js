import { escape } from "../framework/html.js";
import { icon } from "./icon.js";

/** Small status label. tone: "neutral" | "success" | "danger" | "brand" | "live" */
export function badge(text, { tone = "neutral", iconName } = {}) {
  return `<span class="badge${tone !== "neutral" ? ` badge--${tone}` : ""}">${iconName ? icon(iconName, 12) : ""}${escape(text)}</span>`;
}
