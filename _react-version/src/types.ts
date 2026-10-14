import type { IconName } from "./ui/Icon";

export type Page = "Home" | "Assistant" | "Automations" | "Energy" | "Security" | "Settings" | "Design system";
export type SecurityMode = "Home" | "Away" | "Disarmed";
export type SceneName = "Morning" | "Relax" | "Away" | "Good night";

export type Device = {
  id: number;
  name: string;
  room: string;
  detail: string;
  offDetail?: string;
  icon: IconName;
  active: boolean;
};

export type HomeSnapshot = {
  devices: Device[];
  temperature: number;
  scene: SceneName;
  securityMode: SecurityMode;
};

export type HomeAction =
  | { type: "device"; id: number; active: boolean }
  | { type: "temperature"; value: number }
  | { type: "scene"; scene: SceneName }
  | { type: "security"; mode: SecurityMode };

export type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  text: string;
  actions?: string[];
};
