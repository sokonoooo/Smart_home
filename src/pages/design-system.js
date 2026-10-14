// A living style guide: shows every token and component.
// Because it uses the real components, it's also a quick visual test.
import { badge, banner, barChart, button, cardHeader, chartAxis, chip, emptyState, eyebrow, icon, iconButton, iconNames, iconTile, listRow, pageHeader, progress, sectionHeader, segmented, statCard, tabs, textField, toggle } from "../components/index.js";
import { state } from "../model/state.js";
import { getTheme } from "../services/theme.js";

const colorGroups = [
  { title: "Surfaces", tokens: ["bg", "surface", "surface-muted", "surface-sunken", "surface-inverse"] },
  { title: "Text", tokens: ["text", "text-muted", "text-subtle", "text-on-inverse", "on-brand"] },
  { title: "Brand", tokens: ["brand", "brand-strong", "brand-soft", "brand-softer", "brand-text"] },
  { title: "Lines & status", tokens: ["border", "border-strong", "divider", "success", "success-soft", "danger", "danger-soft", "live"] },
  { title: "Data", tokens: ["chart", "chart-strong", "accent-surface", "accent-border", "toggle-off"] },
];

const palette = {
  sage: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"],
  stone: ["0", "50", "100", "150", "200", "300", "400", "500", "600", "700", "900"],
  clay: ["100", "400", "500", "600"],
};

const fontSizes = [["display", 62], ["3xl", 38], ["2xl", 25], ["xl", 20], ["lg", 17], ["md", 14], ["base", 13], ["sm", 12], ["xs", 11], ["2xs", 10]];
const spaces = [1, 2, 3, 4, 5, 6, 8, 10, 12];

const swatch = (name, cssVar) => `<div class="swatch"><span class="swatch__color" style="background: var(${cssVar})"></span><code>${name}</code></div>`;

function specimen(title, description, body) {
  return `
    <article class="card card--lg specimen">
      <div>
        <h3 class="specimen__title">${title}</h3>
        ${description ? `<p class="text-subtle">${description}</p>` : ""}
      </div>
      ${body}
    </article>`;
}

export default function designSystemPage() {
  const colors = colorGroups.map((group) => specimen(group.title, "", `<div class="swatches">${group.tokens.map((token) => swatch(token, `--color-${token}`)).join("")}</div>`)).join("");

  const paletteRows = Object.entries(palette)
    .map(([name, steps]) => `<div class="swatches swatches--small">${steps.map((step) => swatch(`${name}-${step}`, `--${name}-${step}`)).join("")}</div>`)
    .join("");

  const type = fontSizes.map(([token, px]) => `<div class="type-row"><code>--text-${token}<br>${px}px</code><span style="font-size: var(--text-${token})">Calm home</span></div>`).join("");

  const spacing = spaces.map((n) => `<div class="space-row"><code>--space-${n}</code><span class="space-row__bar" style="width: var(--space-${n})"></span></div>`).join("");

  const radius = ["sm", "md", "lg", "xl", "full"].map((r) => `<div class="token-demo"><span class="token-demo__box" style="border-radius: var(--radius-${r})"></span><code>${r}</code></div>`).join("");

  const shadows = ["card", "hover", "pop"].map((s) => `<div class="shadow-demo" style="box-shadow: var(--shadow-${s})">${s}</div>`).join("");

  const icons = iconNames.map((name) => `<span class="icon-cell" title="${name}">${icon(name)}</span>`).join("");

  const ranges = ["Day", "Week", "Month"];

  return `
    ${pageHeader({ label: "Haven UI", title: "Design system", text: `Tokens and components that build every screen. Showing the ${getTheme()} theme.` })}

    ${sectionHeader({ title: "Color tokens", text: "Use these in CSS as var(--color-…). They switch automatically in dark mode." })}
    <div class="stack">
      ${colors}
      ${specimen("Palette", "Raw colors. Only the :root tokens in style.css should use these directly.", paletteRows)}
    </div>

    <section class="section">
      ${sectionHeader({ title: "Foundations", text: "Type, spacing, radius and shadows" })}
      <div class="split split--wide-left">
        ${specimen("Font sizes", "Manrope for headings, DM Sans for everything else.", `<div class="list">${type}</div>`)}
        <div class="stack">
          ${specimen("Spacing", "Multiples of 4px", spacing)}
          ${specimen("Radius", "", `<div class="row-wrap">${radius}</div>`)}
          ${specimen("Shadows", "", `<div class="grid grid--3">${shadows}</div>`)}
        </div>
      </div>
    </section>

    <section class="section">
      ${sectionHeader({ title: "Icons", text: `${iconNames.length} icons — use icon("name") in JS or <span data-icon="name"> in HTML` })}
      <div class="card icon-grid">${icons}</div>
    </section>

    <section class="section">
      ${sectionHeader({ title: "Components", text: "Functions in src/components/, styles in src/style.css (Section 4)" })}
      <div class="grid grid--2">
        ${specimen(
          "button()",
          "variant: primary · outline · ghost · link",
          ["primary", "outline", "ghost", "link"]
            .map((variant) => `<div class="row-wrap">${button({ label: variant, variant, iconLeft: "plus" })}${button({ label: "Small", variant, size: "sm" })}${button({ label: "Disabled", variant, disabled: true })}</div>`)
            .join(""),
        )}
        ${specimen(
          "iconButton(), chip()",
          "",
          `<div class="row-wrap">${iconButton({ iconName: "bell", label: "Outline" })}${iconButton({ iconName: "more", label: "Ghost", variant: "ghost" })}${iconButton({ iconName: "send", label: "Primary", variant: "primary" })}</div>
           <div class="row-wrap">${chip("How's my home?")}${chip("Good night")}${chip("Disabled", { disabled: true })}</div>
           <div class="row-wrap"><span class="avatar">AJ</span><span class="avatar avatar--lg">AJ</span></div>`,
        )}
        ${specimen(
          "toggle(), tabs(), segmented()",
          "Try clicking them",
          `<div class="row-wrap">${toggle({ on: state.demoToggle, label: "Demo toggle", data: { action: "demo-toggle" } })}<span class="text-muted">${state.demoToggle ? "On" : "Off"}</span>${toggle({ on: false, label: "Disabled", disabled: true })}</div>
           ${tabs({ items: ["Overview", "Living room", "Kitchen"], active: state.demoTab, action: "demo-tab", label: "Demo tabs" })}
           ${segmented({ options: ranges.map((value) => ({ value, label: value })), active: state.demoSegment, action: "demo-segment", label: "Demo" })}
           ${segmented({ options: [{ value: "Day", label: "Day", icon: "sun" }, { value: "Week", label: "Week", icon: "calendar" }, { value: "Month", label: "Month", icon: "moon", danger: true }], active: state.demoSegment, action: "demo-segment", label: "Demo solid", appearance: "solid" })}`,
        )}
        ${specimen(
          "badge(), iconTile()",
          "badge tone: neutral · success · danger · brand · live",
          `<div class="row-wrap">${["neutral", "success", "danger", "brand"].map((tone) => badge(tone, { tone })).join("")}${badge("LIVE", { tone: "live" })}${badge("With icon", { tone: "success", iconName: "check" })}</div>
           <div class="row-wrap inverse-box">${["brand", "neutral", "solid", "inverse"].map((tone) => iconTile("lamp", { tone })).join("")}${iconTile("lamp", { size: "sm" })}${iconTile("lamp", { size: "lg" })}</div>`,
        )}
        ${specimen("textField()", "", `${textField({ name: "demo", placeholder: "Search devices, rooms…", iconName: "search", label: "Demo search" })}${textField({ name: "demo2", placeholder: "Without icon", label: "Demo field" })}`)}
        ${specimen("barChart(), progress()", "", `<div>${barChart({ values: [40, 62, 55, 78, 49, 88, 70, 60], label: "Demo chart", small: true, highlight: (i) => i >= 6 })}${chartAxis(["Start", "Now"])}</div>${progress(64, "Demo progress")}`)}
        <div class="stack">
          ${statCard({ iconName: "sparkles", label: "statCard · row", value: "8", hint: "2 ran today" })}
          ${statCard({ layout: "stack", iconName: "bolt", label: "statCard · stack", value: "8.4 kWh", hint: "12% below average" })}
        </div>
        ${specimen(
          "card, cardHeader(), listRow()",
          "",
          `<div class="card">${cardHeader({ label: "Eyebrow", iconName: "bolt", title: "Card title", description: "Optional description", action: badge("−12%", { tone: "success" }) })}</div>
           <div class="card card--inverse">${eyebrow("Inverse card")}<p>For high-emphasis summaries.</p></div>
           <div class="list">
             ${listRow({ leading: iconTile("sun"), title: "List row", subtitle: "With subtitle and meta", meta: "4 actions", trailing: toggle({ on: true, label: "Demo", data: { action: "demo-toggle" } }) })}
             ${listRow({ leading: iconTile("moon", { tone: "neutral" }), title: "Another row", subtitle: "Rows get dividers automatically" })}
           </div>`,
        )}
      </div>
      <div class="section-sm stack">
        ${banner({ iconName: "leaf", title: "banner()", text: "A highlighted message with an optional action.", action: button({ label: "Action" }) })}
        ${emptyState("emptyState() — shown when a list has nothing in it.")}
      </div>
    </section>`;
}
