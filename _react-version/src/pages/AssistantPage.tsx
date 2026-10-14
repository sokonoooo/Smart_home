import { useEffect, useRef, useState, type FormEvent } from "react";
import { suggestions } from "../assistant";
import type { ChatMessage, HomeSnapshot } from "../types";
import { Badge, Button, Card, Chip, cn, Eyebrow, Icon, IconButton, IconTile, PageHeader, TextField, type IconName } from "../ui";

type AssistantPageProps = {
  messages: ChatMessage[];
  thinking: boolean;
  home: HomeSnapshot;
  onSend: (text: string) => void;
  onClear: () => void;
};

function Message({ message }: { message: ChatMessage }) {
  const user = message.role === "user";
  return (
    <div className={cn("flex max-w-[82%] items-end gap-2.5 max-sm:max-w-[92%]", user && "self-end")}>
      {!user && <IconTile icon="sparkles" size="sm" tone="solid" />}
      <div className={cn("px-3.5 py-2.5 text-base", user ? "rounded-[14px_14px_4px_14px] bg-brand text-on-brand" : "rounded-[14px_14px_14px_4px] bg-surface-sunken")}>
        <p>{message.text}</p>
        {message.actions?.length ? (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {message.actions.map((action) => <Badge key={action} tone="success" icon="check">{action}</Badge>)}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Typing() {
  return (
    <div className="flex items-end gap-2.5" aria-label="Haven is typing">
      <IconTile icon="sparkles" size="sm" tone="solid" />
      <div className="flex gap-1 rounded-[14px_14px_14px_4px] bg-surface-sunken p-3.5">
        {[0, 150, 300].map((delay) => <i key={delay} className="size-1.5 animate-typing rounded-full bg-subtle" style={{ animationDelay: `${delay}ms` }} />)}
      </div>
    </div>
  );
}

function ContextRow({ icon, label, value }: { icon: IconName; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <IconTile icon={icon} size="sm" />
      <div className="grid min-w-0 gap-0.5">
        <small className="text-2xs text-subtle">{label}</small>
        <strong className="text-sm">{value}</strong>
      </div>
    </div>
  );
}

export default function AssistantPage({ messages, thinking, home, onSend, onClear }: AssistantPageProps) {
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  useEffect(() => inputRef.current?.focus(), []);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!draft.trim() || thinking) return;
    onSend(draft);
    setDraft("");
  }

  const activeDevices = home.devices.filter((device) => device.active && device.id !== 2);
  const door = home.devices.find((device) => device.id === 2);
  const actionLog = messages.flatMap((message) => message.actions ?? []).slice(-5).reverse();

  return (
    <>
      <PageHeader
        eyebrow="Haven AI"
        title="Assistant"
        description="Ask in plain words — Haven controls your home for you."
        action={<Button icon="trash" onClick={onClear} disabled={messages.length <= 1}>Clear chat</Button>}
      />
      <section className="grid grid-cols-[minmax(0,1fr)_290px] gap-4.5 max-lg:grid-cols-1">
        <Card padding="none" className="flex h-[min(640px,calc(100vh-260px))] min-h-105 flex-col overflow-hidden max-sm:h-[calc(100vh-290px)]">
          <div ref={listRef} aria-live="polite" className="flex flex-1 flex-col gap-3.5 overflow-y-auto p-5.5 max-sm:p-4">
            {messages.map((message) => <Message key={message.id} message={message} />)}
            {thinking && <Typing />}
          </div>
          <div className="flex gap-1.5 overflow-x-auto px-5.5 pb-3 max-sm:px-4">
            {suggestions.map((item) => <Chip key={item} onClick={() => onSend(item)} disabled={thinking}>{item}</Chip>)}
          </div>
          <form onSubmit={submit} className="flex gap-2 border-t border-divider p-3.5">
            <TextField ref={inputRef} value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Ask Haven to do something…" aria-label="Message Haven" wrapperClassName="flex-1" />
            <IconButton type="submit" icon="send" label="Send message" variant="primary" iconSize={18} disabled={!draft.trim() || thinking} className="h-auto w-11" />
          </form>
        </Card>
        <aside className="grid content-start gap-4.5 max-lg:grid-cols-2 max-sm:grid-cols-1">
          <Card className="grid gap-3.5">
            <Eyebrow>What Haven sees</Eyebrow>
            <ContextRow icon="thermostat" label="Thermostat" value={`${home.temperature}°C`} />
            <ContextRow icon="shield" label="Security" value={home.securityMode === "Disarmed" ? "Disarmed" : `Armed · ${home.securityMode}`} />
            <ContextRow icon="lock" label="Front door" value={door?.active ? "Locked" : "Unlocked"} />
            <ContextRow icon="sparkles" label="Scene" value={home.scene} />
            <ContextRow icon="bolt" label="Devices on" value={activeDevices.length ? activeDevices.map((device) => device.name).join(", ") : "None"} />
          </Card>
          <Card className="grid gap-3">
            <Eyebrow>Recent actions</Eyebrow>
            {actionLog.length
              ? actionLog.map((action, index) => <div key={`${action}-${index}`} className="flex items-center gap-2 text-xs text-brand-text"><Icon name="check" size={14} />{action}</div>)
              : <p className="text-xs text-subtle">Nothing yet. Actions Haven takes will show up here.</p>}
          </Card>
        </aside>
      </section>
    </>
  );
}
