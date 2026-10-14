import { escape } from "../framework/html.js";

/** Circle with a person's initials. size: "sm" | "lg" */
export function avatar(initials, { size = "sm" } = {}) {
  return `<span class="avatar${size === "lg" ? " avatar--lg" : ""}">${escape(initials)}</span>`;
}
