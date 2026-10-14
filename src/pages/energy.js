import { banner, barChart, button, cardHeader, chartAxis, icon, iconTile, pageHeader, progress, segmented, statCard } from "../components/index.js";
import { state } from "../model/state.js";

// Chart data for each time range.
const usage = {
  Day: {
    title: "Today’s consumption",
    total: "8.4 kWh",
    average: "Daily average 9.6 kWh",
    bars: [35, 46, 40, 62, 58, 77, 53, 68, 82, 64, 73, 91, 70, 59, 75, 68, 88, 78, 66, 84, 63, 74, 69, 56],
    axis: ["12 AM", "6 AM", "12 PM", "6 PM", "Now"],
    recent: 4, // how many bars at the end to highlight
  },
  Week: {
    title: "This week",
    total: "61.2 kWh",
    average: "Weekly average 67 kWh",
    bars: [72, 85, 64, 78, 90, 58, 44],
    axis: ["Mon", "Wed", "Fri", "Sun"],
    recent: 1,
  },
  Month: {
    title: "This month",
    total: "248 kWh",
    average: "Monthly average 270 kWh",
    bars: [62, 70, 58, 66, 81, 74, 52, 60, 77, 69, 55, 63, 88, 72, 65, 59, 71, 83, 76, 61, 54, 68, 79, 73, 66, 57, 70, 84, 75, 64],
    axis: ["1", "8", "15", "22", "Today"],
    recent: 7,
  },
};

const consumers = [
  { name: "Heating & cooling", icon: "thermostat", value: "3.2 kWh", share: 38 },
  { name: "Kitchen", icon: "lamp", value: "1.8 kWh", share: 21 },
  { name: "Entertainment", icon: "music", value: "1.1 kWh", share: 13 },
  { name: "Other devices", icon: "bolt", value: "2.3 kWh", share: 28 },
];

const unit = (text) => `<span class="stat-card__unit">${text}</span>`;

export default function energyPage() {
  const data = usage[state.energyRange];
  const ranges = ["Day", "Week", "Month"].map((value) => ({ value, label: value }));

  return `
    ${pageHeader({
      label: "Energy overview",
      title: "Energy",
      text: "Understand your home’s usage and find simple ways to save.",
      action: button({ label: "Set energy goal", iconLeft: "plus", data: { action: "notify", message: "Energy goal settings opened" } }),
    })}

    <section class="grid grid--4">
      ${statCard({ layout: "stack", iconName: "bolt", label: "Used today", value: `8.4 ${unit("kWh")}`, hint: `<span class="stat-card__hint--good">${icon("trend", 14)}</span><span class="stat-card__hint--good">12% below average</span>` })}
      ${statCard({ layout: "stack", iconName: "leaf", label: "Estimated cost", value: "$2.18", hint: "$68.40 projected this month" })}
      ${statCard({ layout: "stack", iconName: "sun", label: "Solar generated", value: `5.7 ${unit("kWh")}`, hint: "68% of today’s usage" })}
      ${statCard({ layout: "stack", iconName: "calendar", label: "Monthly goal", value: "74%", hint: "22 days remaining" })}
    </section>

    <section class="section-sm split split--chart">
      <article class="card card--lg">
        ${cardHeader({ label: "Usage over time", title: data.title, action: segmented({ options: ranges, active: state.energyRange, action: "energy-range", label: "Time range" }) })}
        <div class="usage-total">
          <strong>${data.total}</strong>
          <span>${data.average}</span>
        </div>
        ${barChart({ values: data.bars, label: `${data.title} energy use`, highlight: (index) => index >= data.bars.length - data.recent })}
        ${chartAxis(data.axis)}
      </article>

      <article class="card card--lg stack">
        ${cardHeader({ label: "By device", title: "Top consumers" })}
        ${consumers
          .map(
            (item) => `
              <div class="consumer">
                ${iconTile(item.icon, { size: "sm" })}
                <div class="consumer__body">
                  <span class="consumer__label"><strong>${item.name}</strong><small>${item.value}</small></span>
                  ${progress(item.share, `${item.name} share of usage`)}
                </div>
              </div>`,
          )
          .join("")}
      </article>
    </section>

    <div class="section-sm">
      ${banner({
        iconName: "leaf",
        title: "A small change could save $9 this month",
        text: "Lowering the thermostat by 1° overnight would reduce heating use by around 8%.",
        action: button({ label: "Apply suggestion", data: { action: "notify", message: "Energy-saving schedule applied" } }),
      })}
    </div>`;
}
