// All components in one place:
//   import { button, card, toggle } from "../components/index.js";
//
// Each component is a .js file that returns HTML.
// Its styles are in src/style.css under SECTION 4: COMPONENTS
// (the CSS class has the same name: button() → .btn, toggle() → .toggle).

export { icon, iconNames, fillIcons } from "./icon.js";
export { button, iconButton } from "./button.js";
export { eyebrow, cardHeader } from "./card.js";
export { pageHeader, sectionHeader } from "./headers.js";
export { iconTile } from "./icon-tile.js";
export { statCard } from "./stat-card.js";
export { listRow } from "./list.js";
export { toggle } from "./toggle.js";
export { badge } from "./badge.js";
export { chip } from "./chip.js";
export { tabs } from "./tabs.js";
export { segmented } from "./segmented.js";
export { textField } from "./text-field.js";
export { avatar } from "./avatar.js";
export { barChart, chartAxis, progress } from "./charts.js";
export { banner } from "./banner.js";
export { emptyState } from "./empty-state.js";
export { showToast } from "./toast.js";
export { setupShell, setActivePage, setConnectedCount, setThemeButton } from "./app-shell.js";
