import { dataAttrs, escape } from "../framework/html.js";

/** On/off switch. Give it data: { action: "..." } to react to clicks. */
export function toggle({ on, label, data, disabled = false }) {
  return `
    <button type="button" role="switch" class="toggle${on ? " is-on" : ""}" aria-checked="${on}" aria-label="${escape(label)}"${dataAttrs(data)}${disabled ? " disabled" : ""}>
      <span class="toggle__knob"></span>
    </button>`;
}
