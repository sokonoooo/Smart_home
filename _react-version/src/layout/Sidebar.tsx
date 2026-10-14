import { navItems } from "../data/home";
import type { Page } from "../types";
import { Avatar, cn, Icon, type IconName } from "../ui";
import Brand from "./Brand";

type SidebarProps = { page: Page; onNavigate: (page: Page) => void; connectedDevices: number };

function NavItem({ icon, label, active, onClick }: { icon: IconName; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-md transition-colors",
        active ? "bg-brand-soft font-semibold text-brand-text" : "text-muted hover:bg-surface-sunken hover:text-fg",
      )}
    >
      <Icon name={icon} />
      {label}
    </button>
  );
}

export default function Sidebar({ page, onNavigate, connectedDevices }: SidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 flex w-60 flex-col border-r border-border bg-surface px-4.5 pt-7 pb-5.5 max-md:hidden">
      <Brand className="px-2.5" />
      <nav aria-label="Primary navigation" className="mt-10 grid gap-1">
        {navItems.map((item) => <NavItem key={item.page} icon={item.icon} label={item.page} active={page === item.page} onClick={() => onNavigate(item.page)} />)}
      </nav>
      <div className="flex-1" />
      <div className="mx-2.5 mt-2 mb-4.5 flex items-start gap-2.5 border-b border-border pb-4.5">
        <span className="mt-1.5 size-2 shrink-0 rounded-full bg-success shadow-[0_0_0_4px_var(--success-soft)]" />
        <div className="grid gap-0.5">
          <strong className="text-sm font-semibold">Home is online</strong>
          <small className="text-2xs text-subtle">{connectedDevices} devices connected</small>
        </div>
      </div>
      <div className="grid gap-1">
        <NavItem icon="palette" label="Design system" active={page === "Design system"} onClick={() => onNavigate("Design system")} />
        <NavItem icon="settings" label="Settings" active={page === "Settings"} onClick={() => onNavigate("Settings")} />
      </div>
      <div className="mt-3.5 grid grid-cols-[auto_1fr_auto] items-center gap-2.5 border-t border-border px-2 pt-3.5">
        <Avatar initials="AJ" />
        <div className="grid min-w-0 gap-0.5">
          <strong className="text-sm font-semibold">Alex Johnson</strong>
          <small className="text-2xs text-subtle">Home owner</small>
        </div>
        <Icon name="more" className="text-subtle" />
      </div>
    </aside>
  );
}
