import { escape } from "../framework/html.js";
import { eyebrow } from "./card.js";

/** Title block at the top of each page. `action` is HTML shown on the right. */
export function pageHeader({ label, title, text, action = "" }) {
  return `
    <section class="page-header">
      <div>
        ${eyebrow(label)}
        <h1 class="page-header__title">${escape(title)}</h1>
        <p class="page-header__text">${escape(text)}</p>
      </div>
      ${action}
    </section>`;
}

/** Heading above a group of cards. */
export function sectionHeader({ title, text, action = "" }) {
  return `
    <div class="section-header">
      <div>
        <h2 class="section-header__title">${escape(title)}</h2>
        ${text ? `<p class="section-header__text">${escape(text)}</p>` : ""}
      </div>
      ${action}
    </div>`;
}
