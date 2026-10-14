import type { ReactNode } from "react";
import type { Page } from "../types";
import { Toast } from "../ui";
import MobileNav from "./MobileNav";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

type AppShellProps = {
  page: Page;
  onNavigate: (page: Page) => void;
  onSearch: (query: string) => void;
  notify: (message: string) => void;
  notice: string;
  connectedDevices: number;
  children: ReactNode;
};

export default function AppShell({ page, onNavigate, onSearch, notify, notice, connectedDevices, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <Sidebar page={page} onNavigate={onNavigate} connectedDevices={connectedDevices} />
      <main className="min-h-screen md:ml-60 max-md:pb-18">
        <Topbar onSearch={onSearch} onNotifications={() => notify("You’re all caught up")} onProfile={() => onNavigate("Settings")} />
        <div className="mx-auto w-[min(1240px,92%)] pt-11 pb-[70px] max-md:pt-7">{children}</div>
      </main>
      <MobileNav page={page} onNavigate={onNavigate} />
      {notice && <Toast message={notice} />}
    </div>
  );
}
