import { fillIcons, icon } from "./icon.js";

// The shell (sidebar, top bar, mobile nav) is written in index.html.
// These functions update the few parts of it that change.

/** Run once at start: turns every <span data-icon="..."> into an SVG. */
export function setupShell() {
  fillIcons();
}

/** Highlights the current page in the sidebar and the mobile nav. */
export function setActivePage(page) {
  document.querySelectorAll(".nav-item, .mobile-nav__item").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.page === page);
  });
}

/** Updates "11 devices connected" in the sidebar. */
export function setConnectedCount(count) {
  document.getElementById("connected-count").textContent = `${count} devices connected`;
}

/** Shows a sun in dark mode (to switch to light) and a moon in light mode. */
export function setThemeButton(theme) {
  const dark = theme === "dark";
  const button = document.getElementById("theme-button");
  button.innerHTML = icon(dark ? "sun" : "moon", 19);
  button.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
}
