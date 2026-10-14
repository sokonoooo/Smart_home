import { navItems } from "../data/home";
import type { Page } from "../types";
import { cn, Icon } from "../ui";

export default function MobileNav({ page, onNavigate }: { page: Page; onNavigate: (page: Page) => void }) {
  return (
    <nav aria-label="Mobile navigation" className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-5 border-t border-border bg-surface/95 px-3 pt-2 pb-[calc(8px+env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
      {navItems.map((item) => (
        <button
          key={item.page}
          type="button"
          onClick={() => onNavigate(item.page)}
          aria-current={page === item.page ? "page" : undefined}
          className={cn("grid justify-items-center gap-1 text-2xs", page === item.page ? "font-semibold text-brand-text" : "text-subtle")}
        >
          <Icon name={item.icon} />
          {item.short}
        </button>
      ))}
    </nav>
  );
}
