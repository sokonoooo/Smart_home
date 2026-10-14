import { each, escape } from "../framework/html.js";

/**
 * Bar chart. `values` are bar heights in % (0–100).
 * `highlight(index)` returns true for bars to draw in the darker color.
 */
export function barChart({ values, label, small = false, highlight = () => false }) {
  return `
    <div class="bar-chart${small ? " bar-chart--sm" : ""}" role="img" aria-label="${escape(label)}">
      ${each(values, (value, index) => `<i class="bar-chart__bar${highlight(index) ? " is-highlight" : ""}" style="height:${value}%"></i>`)}
    </div>`;
}

/** Labels under a chart, spread evenly. */
export function chartAxis(labels) {
  return `<div class="chart-axis">${each(labels, (label) => `<span>${escape(label)}</span>`)}</div>`;
}

/** Thin bar that fills up to `value` percent. */
export function progress(value, label) {
  return `
    <div class="progress" role="progressbar" aria-label="${escape(label)}" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="100">
      <div class="progress__fill" style="width:${value}%"></div>
    </div>`;
}
