import { badge, button, cardHeader, icon, pageHeader, segmented, toggle } from "../components/index.js";
import { notificationSettings } from "../model/data.js";
import { state } from "../model/state.js";
import { getPreference } from "../services/theme.js";

// `target` is the id of the card to scroll to. Items without one aren't built yet.
const menu = [
  { name: "Your profile", icon: "user", target: "profile" },
  { name: "Appearance", icon: "palette", target: "appearance" },
  { name: "Notifications", icon: "bell", target: "notifications" },
  { name: "Devices & hubs", icon: "wifi" },
  { name: "Privacy & security", icon: "shield" },
];

const details = [
  ["Display name", "Alex Johnson"],
  ["Phone", "+1 (415) 555-0138"],
  ["Time zone", "Pacific Time"],
  ["Language", "English (US)"],
];

const themes = [
  { value: "light", label: "Light", icon: "sun" },
  { value: "dark", label: "Dark", icon: "moon" },
  { value: "system", label: "System", icon: "monitor" },
];

export default function settingsPage() {
  const menuButtons = menu
    .map((item, index) => {
      const data = item.target ? `data-action="scroll-to" data-target="${item.target}"` : `data-action="notify" data-message="${item.name} settings coming soon"`;
      return `<button class="settings-menu__item${index === 0 ? " is-active" : ""}" ${data}>${icon(item.icon)}<span>${item.name}</span>${icon("chevron", 16)}</button>`;
    })
    .join("");

  const notificationRows = notificationSettings
    .map(
      (item, index) => `
        <div class="setting-row">
          <div class="stack-text"><strong>${item.name}</strong><small>${item.detail}</small></div>
          ${toggle({ on: state.notifications[index], label: `Toggle ${item.name}`, data: { action: "toggle-notification", index } })}
        </div>`,
    )
    .join("");

  return `
    ${pageHeader({
      label: "Haven preferences",
      title: "Settings",
      text: "Manage your home, household, devices, and notifications.",
      action: button({ label: "Add home member", iconLeft: "plus", data: { action: "notify", message: "Invite link copied" } }),
    })}

    <section class="settings-layout">
      <aside class="card settings-menu">${menuButtons}</aside>

      <div class="stack">
        <article class="card card--lg" id="profile">
          ${cardHeader({ label: "Your profile", title: "Personal information", description: "Used for household activity and personalized routines.", action: button({ label: "Edit profile", variant: "link", data: { action: "notify", message: "Profile editing enabled" } }) })}
          <div class="profile-box">
            <span class="avatar avatar--lg">AJ</span>
            <div class="stack-text">
              <strong class="profile-box__name">Alex Johnson</strong>
              <small>alex@havenhome.com</small>
              ${badge("Home owner", { tone: "brand" })}
            </div>
          </div>
          <dl class="detail-grid">
            ${details.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join("")}
          </dl>
        </article>

        <article class="card card--lg" id="appearance">
          ${cardHeader({ label: "Appearance", title: "Theme", description: "Choose light or dark, or follow your device setting." })}
          ${segmented({ options: themes, active: getPreference(), action: "theme", label: "Theme", className: "theme-picker" })}
        </article>

        <article class="card card--lg" id="notifications">
          ${cardHeader({ label: "Preferences", title: "Notifications", description: "Choose what Haven should tell you about." })}
          <div class="list">${notificationRows}</div>
        </article>
      </div>
    </section>`;
}
