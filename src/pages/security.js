import { badge, button, cardHeader, eyebrow, icon, iconButton, iconTile, listRow, pageHeader, sectionHeader, segmented, statCard } from "../components/index.js";
import { state } from "../model/state.js";

const cameras = [
  { name: "Front porch", detail: "Front entry · Live" },
  { name: "Back garden", detail: "Garden · Live" },
];

const activity = [
  { name: "Front door locked", detail: "Alex · 10:42 AM", icon: "lock" },
  { name: "Motion detected at front porch", detail: "Person recognized · 9:18 AM", icon: "camera" },
  { name: "Away mode disarmed", detail: "Alex arrived home · 8:56 AM", icon: "key" },
];

const modes = [
  { value: "Home", label: "Home", icon: "home" },
  { value: "Away", label: "Away", icon: "lock" },
  { value: "Disarmed", label: "Disarm", icon: "key", danger: true },
];

export default function securityPage() {
  const disarmed = state.securityMode === "Disarmed";

  return `
    ${pageHeader({
      label: "Home protection",
      title: "Security",
      text: "Your home is protected. All sensors are responding normally.",
      action: button({ label: "Add sensor", iconLeft: "plus", data: { action: "notify", message: "Sensor setup is ready" } }),
    })}

    <section class="card security-status">
      <div class="security-status__orb">
        ${icon("shield", 36)}
        <span class="security-status__check${disarmed ? " is-off" : ""}">${icon(disarmed ? "x" : "check", 13)}</span>
      </div>
      <div>
        ${eyebrow("Current status")}
        <h2 class="security-status__title">${disarmed ? "Security is disarmed" : `Home is armed · ${state.securityMode}`}</h2>
        <p class="text-muted">${disarmed ? "Cameras remain active and will still send alerts." : "Every entry point is secured and being monitored."}</p>
      </div>
      ${segmented({ options: modes, active: state.securityMode, action: "security-mode", label: "Security mode", appearance: "solid", className: "security-status__modes" })}
    </section>

    <section class="section-sm grid grid--3">
      ${statCard({ iconName: "lock", label: "Entry points", value: "3 secured", hint: "All doors locked" })}
      ${statCard({ iconName: "camera", label: "Cameras", value: "2 online", hint: "Recording normally" })}
      ${statCard({ iconName: "wifi", label: "Sensors", value: "6 connected", hint: "No issues found" })}
    </section>

    <section class="section">
      ${sectionHeader({ title: "Live cameras", text: "Last checked just now", action: button({ label: "Manage cameras", variant: "link", iconRight: "arrow", data: { action: "notify", message: "Camera settings opened" } }) })}
      <div class="grid grid--2">
        ${cameras
          .map(
            (camera, index) => `
              <article class="card card--flush">
                <div class="camera-feed camera-feed--${index + 1}">
                  ${badge("LIVE", { tone: "live" })}
                  ${icon("camera", 36)}
                  <small>Encrypted live preview</small>
                </div>
                <div class="camera-footer">
                  <span class="stack-text"><strong>${camera.name}</strong><small>${camera.detail}</small></span>
                  ${iconButton({ iconName: "more", label: `${camera.name} options`, variant: "ghost" })}
                </div>
              </article>`,
          )
          .join("")}
      </div>
    </section>

    <section class="section card card--lg">
      ${cardHeader({ label: "Recent activity", title: "Security timeline", action: button({ label: "View all", variant: "link", data: { action: "notify", message: "Full history coming soon" } }) })}
      <div class="list">
        ${activity.map((item) => listRow({ leading: iconTile(item.icon), title: item.name, subtitle: item.detail, trailing: `<span class="text-subtle">${icon("chevron", 16)}</span>` })).join("")}
      </div>
    </section>`;
}
