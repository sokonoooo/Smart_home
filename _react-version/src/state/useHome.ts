import { useState } from "react";
import { initialDevices, sceneEffects } from "../data/home";
import type { HomeAction, HomeSnapshot, SceneName, SecurityMode } from "../types";

/** All live home state, plus the actions that change it. */
export default function useHome() {
  const [devices, setDevices] = useState(initialDevices);
  const [temperature, setTemperature] = useState(22);
  const [scene, setScene] = useState<SceneName>("Morning");
  const [securityMode, setSecurityMode] = useState<SecurityMode>("Home");

  function setDeviceStates(states: Record<number, boolean>) {
    setDevices((current) => current.map((device) => (device.id in states ? { ...device, active: states[device.id] } : device)));
  }

  function toggleDevice(id: number) {
    setDevices((current) => current.map((device) => (device.id === id ? { ...device, active: !device.active } : device)));
  }

  function applyScene(next: SceneName) {
    const effect = sceneEffects[next];
    setScene(next);
    setDeviceStates(effect.devices);
    if (effect.security) setSecurityMode(effect.security);
  }

  function applyAction(action: HomeAction) {
    if (action.type === "device") setDeviceStates({ [action.id]: action.active });
    else if (action.type === "temperature") setTemperature(action.value);
    else if (action.type === "scene") applyScene(action.scene);
    else setSecurityMode(action.mode);
  }

  const snapshot: HomeSnapshot = { devices, temperature, scene, securityMode };

  return { ...snapshot, snapshot, setTemperature, setSecurityMode, toggleDevice, applyScene, applyAction };
}
