// Every page, by the name used in the URL (…/#/energy).
// To add a page: create pages/my-page.js, add it here, and put its
// styles in src/style.css under SECTION 6: PAGES.

import assistant from "./assistant.js";
import automations from "./automations.js";
import designSystem from "./design-system.js";
import energy from "./energy.js";
import home from "./home.js";
import security from "./security.js";
import settings from "./settings.js";

export const pages = {
  home,
  assistant,
  automations,
  energy,
  security,
  settings,
  "design-system": designSystem,
};
