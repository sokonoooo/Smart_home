import { classes, dataAttrs, each, escape } from "../framework/html.js";
import { icon } from "./icon.js";

/**
 * A row of buttons where only one is active.
 * options: [{ value, label, icon?, danger? }]
 * appearance: "raised" (subtle) | "solid" (filled green when active)
 */
export function segmented({ options, active, action, label, appearance = "raised", className = "" }) {
  const solid = appearance === "solid";
  return `
    <div role="group" aria-label="${escape(label)}" class="${classes("segmented", solid && "segmented--solid", className)}">
      ${each(
        options,
        (option) => `
          <button type="button" class="${classes("segmented__option", option.value === active && "is-active", option.danger && "segmented__option--danger")}" aria-pressed="${option.value === active}"${dataAttrs({ action, value: option.value })}>
            ${option.icon ? icon(option.icon, solid ? 18 : 15) : ""}${escape(option.label)}
          </button>`,
      )}
    </div>`;
}
