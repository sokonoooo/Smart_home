import { useState } from "react";
import AppShell from "./layout/AppShell";
import AssistantPage from "./pages/AssistantPage";
import AutomationsPage from "./pages/AutomationsPage";
import DesignSystemPage from "./pages/DesignSystemPage";
import EnergyPage from "./pages/EnergyPage";
import HomePage from "./pages/HomePage";
import SecurityPage from "./pages/SecurityPage";
import SettingsPage from "./pages/SettingsPage";
import useAssistant from "./state/useAssistant";
import useHome from "./state/useHome";
import usePage from "./state/usePage";
import useToast from "./state/useToast";
import type { Page, SceneName, SecurityMode } from "./types";

const flip = (items: boolean[], index: number) => items.map((item, i) => (i === index ? !item : item));

export default function App() {
  const [page, setPage] = usePage();
  const home = useHome();
  const assistant = useAssistant(home.snapshot, home.applyAction);
  const { notice, notify } = useToast();
  const [automations, setAutomations] = useState([true, true, true, true]);
  const [preferences, setPreferences] = useState([true, true, false]);

  function navigate(next: Page, message?: string) {
    setPage(next);
    if (message) notify(message);
  }
  function ask(text: string) {
    navigate("Assistant");
    assistant.send(text);
  }
  function activateScene(scene: SceneName) {
    home.applyScene(scene);
    notify(`${scene} scene is now active`);
  }
  function setSecurityMode(mode: SecurityMode) {
    home.setSecurityMode(mode);
    notify(`Security set to ${mode}`);
  }

  const connectedDevices = home.devices.filter((device) => device.active).length + 8;

  return (
    <AppShell page={page} onNavigate={navigate} onSearch={ask} notify={notify} notice={notice} connectedDevices={connectedDevices}>
      {page === "Home" && <HomePage devices={home.devices} temperature={home.temperature} scene={home.scene} setTemperature={home.setTemperature} toggleDevice={home.toggleDevice} activateScene={activateScene} goTo={navigate} askAssistant={ask} />}
      {page === "Assistant" && <AssistantPage messages={assistant.messages} thinking={assistant.thinking} home={home.snapshot} onSend={assistant.send} onClear={assistant.clear} />}
      {page === "Automations" && <AutomationsPage enabled={automations} toggle={(index) => setAutomations((items) => flip(items, index))} notify={notify} />}
      {page === "Energy" && <EnergyPage notify={notify} />}
      {page === "Security" && <SecurityPage mode={home.securityMode} setMode={setSecurityMode} notify={notify} />}
      {page === "Settings" && <SettingsPage preferences={preferences} togglePreference={(index) => setPreferences((items) => flip(items, index))} notify={notify} />}
      {page === "Design system" && <DesignSystemPage />}
    </AppShell>
  );
}
