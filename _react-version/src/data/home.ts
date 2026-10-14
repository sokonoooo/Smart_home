import type { IconName } from "../ui";
import type { ChatMessage, Device, Page, SceneName, SecurityMode } from "../types";

export const navItems: { page: Page; icon: IconName; short: string }[] = [
  { page: "Home", icon: "home", short: "Home" },
  { page: "Assistant", icon: "sparkles", short: "Ask" },
  { page: "Automations", icon: "clock", short: "Routines" },
  { page: "Energy", icon: "bolt", short: "Energy" },
  { page: "Security", icon: "shield", short: "Security" },
];

export const rooms = ["Overview", "Living room", "Bedroom", "Kitchen", "Office"] as const;
export type Room = (typeof rooms)[number];

export const initialDevices: Device[] = [
  { id: 1, name: "Pendant lights", room: "Living room", detail: "Warm · 68%", icon: "lamp", active: true },
  { id: 2, name: "Front door", room: "Entrance", detail: "Locked", offDetail: "Unlocked", icon: "lock", active: true },
  { id: 3, name: "Air purifier", room: "Bedroom", detail: "Auto · Air is good", icon: "wind", active: true },
  { id: 4, name: "Kitchen speaker", room: "Kitchen", detail: "Playing · Morning mix", offDetail: "Nothing playing", icon: "music", active: false },
];

export const scenes: { name: SceneName; note: string; icon: IconName }[] = [
  { name: "Morning", note: "Lights · Purifier · Music", icon: "sun" },
  { name: "Relax", note: "Warm lights · Music", icon: "sofa" },
  { name: "Away", note: "Security · Energy saver", icon: "lock" },
  { name: "Good night", note: "Lights off · Doors locked", icon: "moon" },
];

/** Device states (by id) and security mode each scene applies. */
export const sceneEffects: Record<SceneName, { devices: Record<number, boolean>; security?: SecurityMode }> = {
  Morning: { devices: { 1: true, 3: true, 4: true } },
  Relax: { devices: { 1: true, 4: true } },
  Away: { devices: { 1: false, 2: true, 4: false }, security: "Away" },
  "Good night": { devices: { 1: false, 2: true, 4: false }, security: "Home" },
};

export const welcomeMessage: ChatMessage = {
  id: 0,
  role: "assistant",
  text: "Hi Alex, I'm Haven. I can control your devices, adjust the climate, run scenes and keep an eye on security. What would you like to do?",
};
