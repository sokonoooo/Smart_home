// =========================================================
// STATE — everything that can change while the app runs.
// ---------------------------------------------------------
//   read:    state.temperature
//   change:  setState({ temperature: 21 })   → the page redraws
// Change data with setState (or the functions in home.js /
// chat.js), not by editing `state` directly, or the screen
// won't update.
// =========================================================

import { createStore } from "../framework/index.js";
import { devices, welcomeMessage } from "./data.js";

export const { state, setState, subscribe } = createStore({
  // Navigation
  page: "home",
  room: "Overview",
  energyRange: "Day",

  // The home
  devices: devices.map((device) => ({ ...device })),
  temperature: 22,
  scene: "Morning",
  securityMode: "Home",
  automations: [true, true, true, true],
  notifications: [true, true, false],

  // Assistant chat
  messages: [welcomeMessage],
  thinking: false,
  draft: "",

  // Demo controls on the Design system page
  demoToggle: true,
  demoTab: "Overview",
  demoSegment: "Week",
});
