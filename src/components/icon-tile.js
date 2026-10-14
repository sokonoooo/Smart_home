import { classes } from "../framework/html.js";
import { icon } from "./icon.js";

const iconSizes = { sm: 16, md: 20, lg: 22 };

/**
 * An icon inside a soft rounded square.
 * size: "sm" | "md" | "lg"     tone: "brand" | "neutral" | "solid" | "inverse"
 */
export function iconTile(iconName, { size = "md", tone = "brand" } = {}) {
  return `<span class="${classes("icon-tile", size !== "md" && `icon-tile--${size}`, tone !== "brand" && `icon-tile--${tone}`)}">${icon(iconName, iconSizes[size])}</span>`;
}
