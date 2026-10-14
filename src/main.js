// =========================================================
// MAIN — starts the app and connects the folders together.
// ---------------------------------------------------------
//   style.css    ALL styles in one file, starting with the :root tokens
//   framework/   our own mini framework (store, router, render, events)
//   components/  UI pieces: button(), card, toggle()…
//   model/       the app's data, state and the functions that change it
//   services/    logic behind the scenes: assistant, theme, storage
//   pages/       one file per page; each returns that page's HTML
//
// The flow:  click → action below → model changes state → page redraws
// =========================================================

import "./style.css";
import { createRouter, handleClicks, handleForms, mount } from "./framework/index.js";
import { setActivePage, setConnectedCount, setThemeButton, setupShell, showToast } from "./components/index.js";
import { pages } from "./pages/index.js";

import { clearChat, sendMessage, setDraft } from "./model/chat.js";
import { applyScene, setSecurityMode, setTemperature, toggleAutomation, toggleDevice, toggleNotification } from "./model/home.js";
import { setState, state, subscribe } from "./model/state.js";
import { getTheme, onThemeChange, setPreference } from "./services/theme.js";

// ---------- Drawing ----------
const render = mount(document.getElementById("page"), () => pages[state.page]());

function update() {
  render();
  setActivePage(state.page);
  setConnectedCount(state.devices.filter((device) => device.active).length + 8);
}

// ---------- Pages ----------
const router = createRouter(Object.keys(pages), "home", (page) => setState({ page }));

// ---------- Actions ----------
// Each name matches a data-action="…" attribute in a page.
// `data` is the element's data-* attributes: data-id="2" → data.id === "2"
const actions = {
  // Home
  "toggle-device": (data) => toggleDevice(Number(data.id)),
  temperature: (data) => setTemperature(state.temperature + Number(data.change)),
  room: (data) => setState({ room: data.value }),
  scene: (data) => {
    applyScene(data.name);
    showToast(`${data.name} scene is now active`);
  },

  // Assistant
  ask: (data) => {
    router.goTo("assistant");
    sendMessage(data.text);
  },
  "clear-chat": () => clearChat(),

  // Automations, energy, security
  "toggle-automation": (data) => toggleAutomation(Number(data.index)),
  "energy-range": (data) => setState({ energyRange: data.value }),
  "security-mode": (data) => {
    setSecurityMode(data.value);
    showToast(`Security set to ${data.value}`);
  },

  // Settings
  "toggle-notification": (data) => toggleNotification(Number(data.index)),
  theme: (data) => setPreference(data.value),
  "scroll-to": (data, element) => {
    document.querySelectorAll(".settings-menu__item").forEach((item) => item.classList.toggle("is-active", item === element));
    document.getElementById(data.target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  },

  // Top bar & general
  "toggle-theme": () => setPreference(getTheme() === "dark" ? "light" : "dark"),
  notifications: () => showToast("You’re all caught up"),
  notify: (data) => showToast(data.message),

  // Design system demo controls
  "demo-toggle": () => setState({ demoToggle: !state.demoToggle }),
  "demo-tab": (data) => setState({ demoTab: data.value }),
  "demo-segment": (data) => setState({ demoSegment: data.value }),
};

handleClicks({ actions, navigate: router.goTo });

handleForms({
  "chat-form": (form) => sendMessage(form.elements.message.value),
  "topbar-search": (form) => {
    const text = form.elements.query.value;
    form.reset();
    if (!text.trim()) return;
    router.goTo("assistant");
    sendMessage(text);
  },
});

// Remember what's typed in the chat box so it survives redraws.
document.addEventListener("input", (event) => {
  if (event.target.id === "chat-input") setDraft(event.target.value);
});

// ---------- Start ----------
setupShell();
setThemeButton(getTheme());
onThemeChange((theme) => {
  setThemeButton(theme);
  update();
});
subscribe(update);
update();
