import { escape } from "../framework/index.js";
import { badge, button, chip, eyebrow, icon, iconButton, iconTile, pageHeader } from "../components/index.js";
import { suggestions } from "../services/assistant.js";
import { state } from "../model/state.js";

function message(item) {
  const fromUser = item.role === "user";
  const actions = item.actions?.length ? `<div class="chat__actions">${item.actions.map((action) => badge(action, { tone: "success", iconName: "check" })).join("")}</div>` : "";
  return `
    <div class="chat__row${fromUser ? " chat__row--user" : ""}">
      ${fromUser ? "" : iconTile("sparkles", { size: "sm", tone: "solid" })}
      <div class="chat__bubble">
        <p>${escape(item.text)}</p>
        ${actions}
      </div>
    </div>`;
}

function typing() {
  return `
    <div class="chat__row" aria-label="Haven is typing">
      ${iconTile("sparkles", { size: "sm", tone: "solid" })}
      <div class="chat__bubble chat__typing"><i></i><i></i><i></i></div>
    </div>`;
}

function contextRow(iconName, label, value) {
  return `
    <div class="context-row">
      ${iconTile(iconName, { size: "sm" })}
      <div class="stack-text"><small>${label}</small><strong>${escape(value)}</strong></div>
    </div>`;
}

export default function assistantPage() {
  const door = state.devices.find((device) => device.id === 2);
  const on = state.devices.filter((device) => device.active && device.id !== 2);
  const recent = state.messages.flatMap((item) => item.actions ?? []).slice(-5).reverse();

  return `
    ${pageHeader({
      label: "Haven AI",
      title: "Assistant",
      text: "Ask in plain words — Haven controls your home for you.",
      action: button({ label: "Clear chat", iconLeft: "trash", data: { action: "clear-chat" }, disabled: state.messages.length <= 1 }),
    })}

    <section class="assistant-layout">
      <article class="card card--flush chat">
        <div class="chat__messages" data-scroll="bottom" aria-live="polite">
          ${state.messages.map(message).join("")}
          ${state.thinking ? typing() : ""}
        </div>
        <div class="chat__suggestions">
          ${suggestions.map((text) => chip(text, { data: { action: "ask", text }, disabled: state.thinking })).join("")}
        </div>
        <form class="chat__form" id="chat-form">
          <label class="field chat__field">
            <input class="field__input" id="chat-input" name="message" value="${escape(state.draft)}" placeholder="Ask Haven to do something…" aria-label="Message Haven" autocomplete="off" data-autofocus />
          </label>
          ${iconButton({ iconName: "send", label: "Send message", variant: "primary", type: "submit", disabled: state.thinking, className: "chat__send" })}
        </form>
      </article>

      <aside class="stack assistant-side">
        <article class="card stack-sm">
          ${eyebrow("What Haven sees")}
          ${contextRow("thermostat", "Thermostat", `${state.temperature}°C`)}
          ${contextRow("shield", "Security", state.securityMode === "Disarmed" ? "Disarmed" : `Armed · ${state.securityMode}`)}
          ${contextRow("lock", "Front door", door.active ? "Locked" : "Unlocked")}
          ${contextRow("sparkles", "Scene", state.scene)}
          ${contextRow("bolt", "Devices on", on.length ? on.map((device) => device.name).join(", ") : "None")}
        </article>
        <article class="card stack-sm">
          ${eyebrow("Recent actions")}
          ${recent.length ? recent.map((action) => `<div class="action-log">${icon("check", 14)}${escape(action)}</div>`).join("") : `<p class="text-subtle">Nothing yet. Actions Haven takes will show up here.</p>`}
        </article>
      </aside>
    </section>`;
}
