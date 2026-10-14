import { button, icon, iconButton, iconTile, listRow, pageHeader, sectionHeader, statCard, toggle } from "../components/index.js";
import { automations } from "../model/data.js";
import { state } from "../model/state.js";

const today = [
  { time: "3:45 PM", name: "Air refresh", icon: "wind" },
  { time: "6:30 PM", name: "Evening lights", icon: "lamp" },
  { time: "11:00 PM", name: "Night security", icon: "shield" },
];

export default function automationsPage() {
  const activeCount = state.automations.filter(Boolean).length + 4;

  const rows = automations.map((item, index) =>
    listRow({
      leading: iconTile(item.icon, { tone: state.automations[index] ? "brand" : "neutral" }),
      title: item.name,
      subtitle: item.detail,
      meta: item.steps,
      trailing:
        toggle({ on: state.automations[index], label: `Toggle ${item.name}`, data: { action: "toggle-automation", index } }) +
        iconButton({ iconName: "more", label: `${item.name} options`, variant: "ghost", className: "hide-on-phone" }),
    }),
  );

  const timeline = today.map(
    (item, index) => `
      <div class="timeline__item${index === 0 ? " is-next" : ""}">
        <span class="timeline__dot"></span>
        <small class="timeline__time">${item.time}</small>
        <div class="stack-text">
          <strong>${item.name}</strong>
          <small class="timeline__note">${icon(item.icon, 14)}${index === 0 ? "Running soon" : "Scheduled"}</small>
        </div>
      </div>`,
  );

  return `
    ${pageHeader({
      label: "Routines & scenes",
      title: "Automations",
      text: "Let Haven handle the little things, right on schedule.",
      action: button({ label: "New automation", iconLeft: "plus", data: { action: "notify", message: "Automation builder is ready" } }),
    })}

    <section class="grid grid--3">
      ${statCard({ iconName: "sparkles", label: "Active routines", value: activeCount, hint: "2 ran today" })}
      ${statCard({ iconName: "clock", label: "Next event", value: "6:30 PM", hint: "Evening lights" })}
      ${statCard({ iconName: "bolt", label: "Time saved", value: "3.2 hrs", hint: "This month" })}
    </section>

    <section class="section split split--wide-left">
      <div>
        ${sectionHeader({ title: "Your automations", text: "Routines that run around your life", action: button({ label: "View activity", variant: "link", iconRight: "arrow", data: { action: "notify", message: "Activity log coming soon" } }) })}
        <div class="card card--flush list list--padded">${rows.join("")}</div>
      </div>
      <aside>
        ${sectionHeader({ title: "Today", text: "Upcoming at home" })}
        <div class="card timeline">${timeline.join("")}</div>
      </aside>
    </section>`;
}
