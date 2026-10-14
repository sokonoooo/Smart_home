// =========================================================
// DATA — the starting data and fixed settings for the app.
// In a real product most of this would come from a server.
// =========================================================

// Thermostat limits (°C)
export const MIN_TEMP = 16;
export const MAX_TEMP = 28;

export const rooms = ["Overview", "Living room", "Bedroom", "Kitchen", "Office"];

// `active` means on (or locked, for the door).
export const devices = [
  { id: 1, name: "Pendant lights", room: "Living room", detail: "Warm · 68%", icon: "lamp", active: true },
  { id: 2, name: "Front door", room: "Entrance", detail: "Locked", offDetail: "Unlocked", icon: "lock", active: true },
  { id: 3, name: "Air purifier", room: "Bedroom", detail: "Auto · Air is good", icon: "wind", active: true },
  { id: 4, name: "Kitchen speaker", room: "Kitchen", detail: "Playing · Morning mix", offDetail: "Nothing playing", icon: "music", active: false },
];

export const scenes = [
  { name: "Morning", note: "Lights · Purifier · Music", icon: "sun" },
  { name: "Relax", note: "Warm lights · Music", icon: "sofa" },
  { name: "Away", note: "Security · Energy saver", icon: "lock" },
  { name: "Good night", note: "Lights off · Doors locked", icon: "moon" },
];

// What each scene does: device id → on/off, and optionally a security mode.
export const sceneEffects = {
  Morning: { devices: { 1: true, 3: true, 4: true } },
  Relax: { devices: { 1: true, 4: true } },
  Away: { devices: { 1: false, 2: true, 4: false }, security: "Away" },
  "Good night": { devices: { 1: false, 2: true, 4: false }, security: "Home" },
};

export const automations = [
  { name: "Gentle wake up", detail: "Weekdays at 7:00 AM", icon: "sun", steps: "4 actions" },
  { name: "Leave home", detail: "When everyone leaves", icon: "key", steps: "6 actions" },
  { name: "Welcome home", detail: "When the first person arrives", icon: "home", steps: "3 actions" },
  { name: "Night security", detail: "Every day at 11:00 PM", icon: "shield", steps: "5 actions" },
];

export const notificationSettings = [
  { name: "Security alerts", detail: "Immediate alerts for doors, cameras, and alarms" },
  { name: "Automation updates", detail: "Know when routines run or need attention" },
  { name: "Energy insights", detail: "Weekly reports and saving suggestions" },
];

export const welcomeMessage = {
  role: "assistant",
  text: "Hi Alex, I'm Haven. I can control your devices, adjust the climate, run scenes and keep an eye on security. What would you like to do?",
};
