// =========================================================
// CHAT — the conversation with the Haven assistant.
// The assistant service decides the reply; this file stores
// the messages and runs the actions on the home.
// =========================================================

import { describeAction, respond } from "../services/assistant.js";
import { applyAction } from "./home.js";
import { setState, state } from "./state.js";

const REPLY_DELAY = 650; // ms — a short pause so it feels like Haven is thinking

export function sendMessage(text) {
  const message = text.trim();
  if (!message || state.thinking) return;

  const reply = respond(message, state);
  setState({ messages: [...state.messages, { role: "user", text: message }], thinking: true, draft: "" });

  setTimeout(() => {
    const labels = reply.actions.map((action) => describeAction(action, state.devices));
    reply.actions.forEach(applyAction);
    setState({ messages: [...state.messages, { role: "assistant", text: reply.text, actions: labels }], thinking: false });
  }, REPLY_DELAY);
}

export function clearChat() {
  setState({ messages: state.messages.slice(0, 1), thinking: false });
}

/** Remembers what's typed in the chat box without redrawing the page. */
export function setDraft(text) {
  state.draft = text;
}
