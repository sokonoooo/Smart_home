import { escape } from "../framework/index.js";
import { badge, barChart, button, cardHeader, chartAxis, chip, emptyState, eyebrow, icon, iconButton, iconTile, pageHeader, sectionHeader, tabs, toggle } from "../components/index.js";
import { MAX_TEMP, MIN_TEMP, rooms, scenes } from "../model/data.js";
import { state } from "../model/state.js";

const energyToday = [48, 65, 42, 78, 55, 70, 38, 52, 68, 43, 62, 84];

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function assistantTeaser() {
  const prompts = ["How's my home?", "Turn off the lights", "Good night"];
  return `
    <section class="card card--accent teaser">
      ${iconTile("sparkles", { size: "sm", tone: "solid" })}
      <div class="stack-text">
        <strong>Ask Haven</strong>
        <small>Your AI home assistant</small>
      </div>
      <div class="teaser__chips">
        ${prompts.map((prompt) => chip(prompt, { data: { action: "ask", text: prompt } })).join("")}
      </div>
      ${button({ label: "Open chat", variant: "link", iconRight: "arrow", data: { page: "assistant" }, className: "teaser__open" })}
    </section>`;
}

function climateCard() {
  const t = state.temperature;
  return `
    <article class="card card--lg climate">
      ${cardHeader({ label: "Indoor climate", iconName: "thermostat", title: "Perfectly comfortable", action: iconButton({ iconName: "more", label: "Climate options", variant: "ghost" }) })}
      <div class="climate__body">
        <div class="climate__now">
          <span class="climate__temp">${t}°</span>
          <small>Heating to ${t}°</small>
        </div>
        <div class="climate__controls">
          <button class="climate__step" data-action="temperature" data-change="-1" aria-label="Lower temperature" ${t <= MIN_TEMP ? "disabled" : ""}>−</button>
          <div class="climate__set"><span>SET TO</span><strong>${t}°C</strong></div>
          <button class="climate__step" data-action="temperature" data-change="1" aria-label="Raise temperature" ${t >= MAX_TEMP ? "disabled" : ""}>+</button>
        </div>
      </div>
      <div class="climate__stats">
        <div>${icon("air", 18)}<span class="stack-text"><small>Humidity</small><strong>46%</strong></span></div>
        <div>${icon("leaf", 18)}<span class="stack-text"><small>Air quality</small><strong>Excellent</strong></span></div>
        <div>${icon("wind", 18)}<span class="stack-text"><small>Mode</small><strong>Auto</strong></span></div>
      </div>
    </article>`;
}

function securitySummary() {
  const locked = state.devices.find((device) => device.id === 2).active;
  return `
    <article class="card card--lg card--inverse security-summary">
      ${iconTile("shield", { size: "lg", tone: "inverse" })}
      ${eyebrow("Home status")}
      <h2 class="card__title">${locked ? "Safe & secure" : "Front door unlocked"}</h2>
      <p class="security-summary__text">${locked ? "All doors are locked and cameras are active." : "Cameras are active. Lock the door when you can."}</p>
      <div class="security-summary__list">
        <div><span>${icon("lock", 17)} Doors</span><strong>${locked ? "3 locked" : "2 of 3 locked"}</strong></div>
        <div><span>${icon("camera", 17)} Cameras</span><strong>2 active</strong></div>
      </div>
      <button class="security-summary__link" data-page="security">View security ${icon("arrow", 16)}</button>
    </article>`;
}

function sceneCard(scene) {
  const selected = state.scene === scene.name;
  return `
    <button class="scene-card${selected ? " is-selected" : ""}" data-action="scene" data-name="${scene.name}" aria-pressed="${selected}">
      ${iconTile(scene.icon)}
      <span class="stack-text"><strong>${scene.name}</strong><small>${scene.note}</small></span>
      ${icon("chevron", 17)}
    </button>`;
}

function deviceCard(device) {
  return `
    <article class="card device-card">
      <div class="device-card__top">
        ${iconTile(device.icon, { tone: device.active ? "brand" : "neutral" })}
        ${toggle({ on: device.active, label: `Toggle ${device.name}`, data: { action: "toggle-device", id: device.id } })}
      </div>
      <div class="stack-text">
        <strong>${escape(device.name)}</strong>
        <small>${escape(device.room)}</small>
      </div>
      <p class="device-card__state${device.active ? " is-on" : ""}">${escape(device.active ? device.detail : (device.offDetail ?? "Off"))}</p>
    </article>`;
}

export default function homePage() {
  const visible = state.room === "Overview" ? state.devices : state.devices.filter((device) => device.room === state.room);
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return `
    ${pageHeader({
      label: today,
      title: `${greeting()}, Alex.`,
      text: "Everything at home is calm and running smoothly.",
      action: button({ label: "Add device", iconLeft: "plus", data: { action: "notify", message: "Ready to connect a new device" } }),
    })}

    ${assistantTeaser()}
    ${tabs({ items: rooms, active: state.room, action: "room", label: "Rooms" })}

    <section class="home-hero">
      ${climateCard()}
      ${securitySummary()}
    </section>

    <section class="section">
      ${sectionHeader({ title: "Quick scenes", text: "Set the mood with one tap", action: button({ label: "Manage scenes", variant: "link", iconRight: "arrow", data: { page: "automations" } }) })}
      <div class="grid grid--4">${scenes.map(sceneCard).join("")}</div>
    </section>

    <section class="section home-lower">
      <div>
        ${sectionHeader({
          title: state.room === "Overview" ? "Favorite devices" : state.room,
          text: `${visible.length} devices shown`,
          action: state.room !== "Overview" ? button({ label: "View all", variant: "link", iconRight: "arrow", data: { action: "room", value: "Overview" } }) : "",
        })}
        <div class="device-grid">
          ${visible.length ? visible.map(deviceCard).join("") : emptyState("No favorite devices in this room yet.")}
        </div>
      </div>
      <aside class="card energy-mini">
        ${cardHeader({ label: "Energy today", iconName: "bolt", title: "8.4 kWh", action: badge("−12%", { tone: "success" }) })}
        <p class="energy-mini__text">You’re using less than your daily average.</p>
        ${barChart({ values: energyToday, label: "Energy use today", small: true, highlight: (index) => index >= energyToday.length - 3 })}
        ${chartAxis(["6 AM", "Now"])}
        <button class="energy-mini__link" data-page="energy">See energy details ${icon("arrow", 16)}</button>
      </aside>
    </section>`;
}
