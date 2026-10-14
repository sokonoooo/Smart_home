// =========================================================
// ASSISTANT SERVICE
// Reads what the user typed and decides:
//   1. what to reply, and
//   2. which actions to run on the home (turn off lights...).
// It uses keyword matching (regular expressions), not real AI.
//
// An action looks like one of these:
//   { type: "device", id: 1, active: false }
//   { type: "temperature", value: 21 }
//   { type: "scene", scene: "Good night" }
//   { type: "security", mode: "Away" }
// =========================================================

import { MAX_TEMP, MIN_TEMP } from "../model/data.js";

export const suggestions = [
  "How's my home?",
  "Turn off the lights",
  "Set temperature to 21°",
  "Good night",
  "Arm away mode",
  "How can I save energy?",
];

// Words that point at each device id.
const deviceKeywords = [
  { id: 1, words: /\b(lights?|lamps?|pendant)\b/ },
  { id: 2, words: /\b(door|front door|lock)\b/ },
  { id: 3, words: /\b(purifier|air purifier|filter)\b/ },
  { id: 4, words: /\b(speaker|music|song|playlist)\b/ },
];

const sceneKeywords = [
  { scene: "Good night", words: /\b(good ?night|bed ?time|going to (bed|sleep)|sleep)\b/ },
  { scene: "Morning", words: /\b(good morning|morning|wake up)\b/ },
  { scene: "Relax", words: /\b(relax|chill|movie|unwind)\b/ },
  { scene: "Away", words: /\b(leaving|heading out|going out|bye)\b/ },
];

const clamp = (value) => Math.min(MAX_TEMP, Math.max(MIN_TEMP, value));
const isQuestion = (text) => /\?$/.test(text) || /^(is|are|did|was|what|which|how)\b/.test(text);

function deviceState(device) {
  if (device.id === 2) return device.active ? "locked" : "unlocked";
  return device.active ? "on" : "off";
}

export function summarize(home) {
  const on = home.devices.filter((device) => device.active && device.id !== 2);
  const door = home.devices.find((device) => device.id === 2);
  const security = home.securityMode === "Disarmed" ? "security is disarmed" : `security is armed (${home.securityMode})`;
  const onList = on.length ? on.map((device) => device.name.toLowerCase()).join(", ") : "nothing";
  return `It's ${home.temperature}°C inside, the front door is ${door ? deviceState(door) : "unknown"}, and ${security}. Currently on: ${onList}. Active scene: ${home.scene}.`;
}

export function describeAction(action, devices) {
  switch (action.type) {
    case "device": {
      const device = devices.find((item) => item.id === action.id);
      if (!device) return "Device updated";
      return `${device.name} → ${device.id === 2 ? (action.active ? "Locked" : "Unlocked") : action.active ? "On" : "Off"}`;
    }
    case "temperature":
      return `Thermostat → ${action.value}°C`;
    case "scene":
      return `Scene → ${action.scene}`;
    case "security":
      return `Security → ${action.mode}`;
  }
}

function securityIntent(text) {
  if (/\bdisarm\b/.test(text)) return "Disarmed";
  if (!/\b(arm|security|alarm)\b/.test(text)) return null;
  if (/\b(away|leaving)\b/.test(text)) return "Away";
  if (/\b(home|stay|night)\b/.test(text)) return "Home";
  return /\barm\b/.test(text) ? "Away" : null;
}

function temperatureIntent(text, current, mentionsDevice) {
  const explicit = /(temp|thermostat|degree|°|heating)/.test(text);
  // "warm lights" is about the lamp, not the thermostat.
  if (!explicit && (mentionsDevice || !/\b(warm|warmer|cool|cooler|cold|hot|chilly|freezing)\b/.test(text))) return null;
  const number = text.match(/(\d{2})(?:\.\d)?\s*(°|degrees?|c\b)?/);
  if (number) return clamp(Number(number[1]));
  if (/\b(warmer|cold|chilly|freezing|heat up|raise|increase|up)\b/.test(text)) return clamp(current + 1);
  if (/\b(cooler|hot|warm in here|lower|decrease|down)\b/.test(text)) return clamp(current - 1);
  return "query";
}

export function respond(rawInput, home) {
  const text = rawInput.toLowerCase().trim();
  const find = (id) => home.devices.find((device) => device.id === id);

  if (!text || /\b(help|what can you do|commands)\b/.test(text)) {
    return {
      text: "I can control your lights, door lock, air purifier and speaker, adjust the thermostat, run scenes like Morning or Good night, arm or disarm security, and give you a status or energy summary. Try “Set temperature to 21°” or “Lock the front door”.",
      actions: [],
    };
  }

  if (/^(hi|hey|hello|yo)\b/.test(text) && text.split(" ").length <= 3) {
    return { text: "Hi! What can I do around the house for you?", actions: [] };
  }

  const security = securityIntent(text);
  if (security) {
    if (security === home.securityMode) return { text: `Security is already set to ${security}.`, actions: [] };
    const reply = security === "Disarmed" ? "Security is now disarmed. Cameras will keep recording and still send alerts." : `Done — security is armed in ${security} mode. All entry points are being monitored.`;
    return { text: reply, actions: [{ type: "security", mode: security }] };
  }

  const mentionsDevice = deviceKeywords.some((item) => item.words.test(text));
  const temperature = temperatureIntent(text, home.temperature, mentionsDevice);
  if (temperature === "query") {
    return { text: `It's ${home.temperature}°C inside, with 46% humidity and excellent air quality.`, actions: [] };
  }
  if (temperature !== null) {
    if (temperature === home.temperature) return { text: `The thermostat is already at ${temperature}°C.`, actions: [] };
    const limit = temperature === MIN_TEMP || temperature === MAX_TEMP ? ` (the allowed range is ${MIN_TEMP}–${MAX_TEMP}°C)` : "";
    return { text: `Setting the thermostat to ${temperature}°C${limit}.`, actions: [{ type: "temperature", value: temperature }] };
  }

  const lockMatch = text.match(/\b(un)?lock(ed)?\b/);
  if (lockMatch) {
    const door = find(2);
    if (isQuestion(text) && !/\b(can you|please)\b/.test(text)) return { text: `The front door is ${deviceState(door)}.`, actions: [] };
    const lock = !lockMatch[1];
    if (door.active === lock) return { text: `The front door is already ${deviceState(door)}.`, actions: [] };
    return { text: lock ? "Locking the front door." : "Unlocking the front door. I'll keep an eye on it.", actions: [{ type: "device", id: 2, active: lock }] };
  }

  const scene = sceneKeywords.find((item) => item.words.test(text) || text.includes(`${item.scene.toLowerCase()} scene`));
  if (scene && !/\b(on|off)\b/.test(text)) {
    return { text: `Activating the ${scene.scene} scene.`, actions: [{ type: "scene", scene: scene.scene }] };
  }

  const everything = /\b(everything|all devices|all of it)\b/.test(text);
  const targets = everything ? home.devices.filter((device) => device.id !== 2) : deviceKeywords.filter((item) => item.words.test(text)).map((item) => find(item.id));
  if (targets.length) {
    if (isQuestion(text) && !/\b(turn|switch|can you|please)\b/.test(text)) {
      return { text: targets.map((device) => `${device.name} ${device.id === 1 ? "are" : "is"} ${deviceState(device)}.`).join(" "), actions: [] };
    }
    const wantsOff = /\b(off|stop|pause|disable|shut)\b/.test(text);
    const wantsOn = /\b(on|start|play|enable|resume)\b/.test(text);
    if (!wantsOff && !wantsOn && !/\btoggle\b/.test(text)) {
      return { text: `Would you like me to turn ${targets.map((device) => device.name.toLowerCase()).join(" and ")} on or off?`, actions: [] };
    }
    const changes = targets.filter((device) => (wantsOff ? device.active : wantsOn ? !device.active : true));
    if (!changes.length) return { text: `${targets.length > 1 ? "Those are" : "That's"} already ${wantsOff ? "off" : "on"}.`, actions: [] };
    const actions = changes.map((device) => ({ type: "device", id: device.id, active: wantsOff ? false : wantsOn ? true : !device.active }));
    return { text: `Okay, ${changes.map((device) => device.name.toLowerCase()).join(", ")} ${wantsOff ? "turned off" : wantsOn ? "turned on" : "toggled"}.`, actions };
  }

  if (/\b(energy|power|electric|electricity|kwh|bill|save|saving|usage)\b/.test(text)) {
    const running = home.devices.filter((device) => device.active && device.id !== 2).length;
    return {
      text: `You've used 8.4 kWh today — 12% below your average, about $2.18. ${running} devices are running right now. Tip: lowering the thermostat by 1° overnight could save around $9 this month${home.temperature > 21 ? `; you're currently at ${home.temperature}°C` : ""}.`,
      actions: [],
    };
  }

  if (/\b(status|summary|overview|everything ok|what's on|whats on|how('s| is) (my |the )?(home|house))\b/.test(text)) {
    return { text: summarize(home), actions: [] };
  }

  if (/\b(thanks|thank you|cheers)\b/.test(text)) return { text: "Anytime!", actions: [] };

  return {
    text: "Sorry, I didn't catch that. You can ask me to control a device, change the temperature, run a scene, or check on your home.",
    actions: [],
  };
}
