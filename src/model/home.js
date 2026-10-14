// =========================================================
// HOME — functions that change the home's devices,
// temperature, scenes and security.
// =========================================================

import { MAX_TEMP, MIN_TEMP, sceneEffects } from "./data.js";
import { setState, state } from "./state.js";

/** Turns several devices on/off at once. `changes` looks like { 1: false, 4: true } (device id → on). */
export function setDevices(changes) {
  setState({
    devices: state.devices.map((device) => (device.id in changes ? { ...device, active: changes[device.id] } : device)),
  });
}

export function toggleDevice(id) {
  const device = state.devices.find((item) => item.id === id);
  setDevices({ [id]: !device.active });
}

/** Sets the thermostat, kept between MIN_TEMP and MAX_TEMP. */
export function setTemperature(value) {
  setState({ temperature: Math.min(MAX_TEMP, Math.max(MIN_TEMP, value)) });
}

/** Runs a scene: switches its devices and (sometimes) the security mode. */
export function applyScene(name) {
  const effect = sceneEffects[name];
  setDevices(effect.devices);
  setState({ scene: name, securityMode: effect.security ?? state.securityMode });
}

export function setSecurityMode(mode) {
  setState({ securityMode: mode });
}

/** Turns the item at `index` in a list of on/off values on or off. */
export function flip(list, index) {
  return list.map((value, i) => (i === index ? !value : value));
}

export function toggleAutomation(index) {
  setState({ automations: flip(state.automations, index) });
}

export function toggleNotification(index) {
  setState({ notifications: flip(state.notifications, index) });
}

/** Runs one action from the assistant, e.g. { type: "temperature", value: 21 } */
export function applyAction(action) {
  if (action.type === "device") setDevices({ [action.id]: action.active });
  if (action.type === "temperature") setTemperature(action.value);
  if (action.type === "scene") applyScene(action.scene);
  if (action.type === "security") setSecurityMode(action.mode);
}
