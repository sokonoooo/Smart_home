import { escape } from "../framework/html.js";
import { icon } from "./icon.js";

/** Text input with an optional icon in front. */
export function textField({ name, placeholder, value = "", iconName, label, id = "", autofocus = false, className = "" }) {
  return `
    <label class="field ${className}">
      ${iconName ? icon(iconName, 18) : ""}
      <input class="field__input"${id ? ` id="${id}"` : ""} name="${escape(name)}" value="${escape(value)}" placeholder="${escape(placeholder)}" aria-label="${escape(label)}" autocomplete="off"${autofocus ? " data-autofocus" : ""} />
    </label>`;
}
