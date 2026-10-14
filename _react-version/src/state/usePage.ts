import { useEffect, useState } from "react";
import type { Page } from "../types";

const pages: Page[] = ["Home", "Assistant", "Automations", "Energy", "Security", "Settings", "Design system"];

const toHash = (page: Page) => `#/${page.toLowerCase().replace(/\s+/g, "-")}`;
const fromHash = (hash: string): Page => pages.find((page) => toHash(page) === hash) ?? "Home";

/** Current page, kept in the URL hash so links, reloads and the back button work. */
export default function usePage() {
  const [page, setPageState] = useState<Page>(() => fromHash(window.location.hash));

  useEffect(() => {
    const onHashChange = () => setPageState(fromHash(window.location.hash));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  function setPage(next: Page) {
    if (toHash(next) !== window.location.hash) window.location.hash = toHash(next);
    setPageState(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return [page, setPage] as const;
}
