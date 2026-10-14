import { useState, type FormEvent } from "react";
import { Avatar, Icon, IconButton, TextField, useTheme } from "../ui";
import Brand from "./Brand";

type TopbarProps = { onSearch: (query: string) => void; onNotifications: () => void; onProfile: () => void };

export default function Topbar({ onSearch, onNotifications, onProfile }: TopbarProps) {
  const { theme, setPreference } = useTheme();
  const [query, setQuery] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
    setQuery("");
  }

  return (
    <header className="sticky top-0 z-[8] flex h-18 items-center justify-between border-b border-border bg-bg/90 px-[4.5%] backdrop-blur-md max-md:h-16 max-md:px-[4%]">
      <Brand className="text-lg md:hidden" />
      <form onSubmit={submit} className="max-md:hidden">
        <TextField icon="search" value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Ask Haven or search" placeholder="Ask Haven anything…" wrapperClassName="w-[min(340px,36vw)] py-2" />
      </form>
      <div className="flex items-center gap-3 sm:gap-4">
        <span className="flex items-center gap-1.5 text-base font-semibold">
          <Icon name="sun" size={18} />
          18° <small className="font-normal text-subtle max-md:hidden">Clear</small>
        </span>
        <IconButton icon={theme === "dark" ? "sun" : "moon"} label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} onClick={() => setPreference(theme === "dark" ? "light" : "dark")} />
        <IconButton icon="bell" label="Notifications" onClick={onNotifications} className="max-md:hidden">
          <span className="absolute top-[7px] right-[7px] size-1.5 rounded-full border border-surface bg-danger" />
        </IconButton>
        <button type="button" onClick={onProfile} aria-label="Open settings" className="md:hidden">
          <Avatar initials="AJ" />
        </button>
      </div>
    </header>
  );
}
