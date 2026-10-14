import { useState } from "react";
import { MAX_TEMP, MIN_TEMP } from "../assistant";
import { rooms, scenes, type Room } from "../data/home";
import type { Device, Page, SceneName } from "../types";
import { BarChart, Badge, Button, Card, CardHeader, ChartAxis, Chip, cn, EmptyState, Eyebrow, Icon, IconButton, IconTile, PageHeader, SectionHeader, Tabs, Toggle, type IconName } from "../ui";

type HomePageProps = {
  devices: Device[];
  temperature: number;
  scene: SceneName;
  setTemperature: (value: number) => void;
  toggleDevice: (id: number) => void;
  activateScene: (scene: SceneName) => void;
  goTo: (page: Page, message?: string) => void;
  askAssistant: (text: string) => void;
};

const energyToday = [48, 65, 42, 78, 55, 70, 38, 52, 68, 43, 62, 84];

function greeting(date: Date) {
  const hour = date.getHours();
  return hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
}

function AssistantTeaser({ askAssistant, open }: { askAssistant: (text: string) => void; open: () => void }) {
  return (
    <Card tone="accent" padding="none" className="mb-9 grid grid-cols-[auto_auto_1fr_auto] items-center gap-3 px-4 py-3.5 max-lg:grid-cols-[auto_1fr_auto] max-sm:grid-cols-[auto_1fr]">
      <IconTile icon="sparkles" size="sm" tone="solid" />
      <div className="grid gap-0.5">
        <strong className="text-sm">Ask Haven</strong>
        <small className="text-2xs text-muted">Your AI home assistant</small>
      </div>
      <div className="flex flex-wrap justify-end gap-1.5 max-lg:col-span-full max-lg:justify-start">
        {["How's my home?", "Turn off the lights", "Good night"].map((prompt) => <Chip key={prompt} onClick={() => askAssistant(prompt)}>{prompt}</Chip>)}
      </div>
      <Button variant="link" iconRight="arrow" onClick={open} className="max-lg:row-start-1 max-lg:col-start-3 max-sm:hidden">Open chat</Button>
    </Card>
  );
}

function ClimateCard({ temperature, setTemperature }: { temperature: number; setTemperature: (value: number) => void }) {
  const stats: { icon: IconName; label: string; value: string }[] = [
    { icon: "air", label: "Humidity", value: "46%" },
    { icon: "leaf", label: "Air quality", value: "Excellent" },
    { icon: "wind", label: "Mode", value: "Auto" },
  ];
  const stepper = "grid size-[33px] place-items-center rounded-full border border-border-strong bg-surface-sunken text-xl transition-colors hover:bg-brand-soft disabled:opacity-40";
  return (
    <Card padding="lg">
      <CardHeader eyebrow="Indoor climate" icon="thermostat" title="Perfectly comfortable" action={<IconButton icon="more" label="Climate options" variant="ghost" />} />
      <div className="flex min-h-30 items-center justify-between">
        <div className="grid">
          <span className="font-display text-display font-medium tracking-[-0.06em] max-sm:text-[54px]">{temperature}°</span>
          <small className="mt-1 text-2xs text-subtle">Heating to {temperature}°</small>
        </div>
        <div className="flex items-center gap-3.5 max-sm:gap-2">
          <button type="button" className={stepper} onClick={() => setTemperature(temperature - 1)} disabled={temperature <= MIN_TEMP} aria-label="Lower temperature">−</button>
          <div className="grid gap-0.5 text-center">
            <span className="text-2xs tracking-[0.1em] text-subtle">SET TO</span>
            <strong className="font-display text-lg">{temperature}°C</strong>
          </div>
          <button type="button" className={stepper} onClick={() => setTemperature(temperature + 1)} disabled={temperature >= MAX_TEMP} aria-label="Raise temperature">+</button>
        </div>
      </div>
      <div className="grid grid-cols-3 border-t border-divider pt-4 max-sm:grid-cols-2 max-sm:gap-y-4">
        {stats.map((stat, index) => (
          <div key={stat.label} className={cn("flex items-center gap-2.5 px-4 text-brand-text first:pl-0", index < 2 && "border-r border-divider", "max-sm:last:col-span-full max-sm:last:pl-0 max-sm:nth-2:border-0")}>
            <Icon name={stat.icon} size={18} />
            <span className="grid gap-0.5">
              <small className="text-2xs text-subtle">{stat.label}</small>
              <strong className="text-sm text-fg">{stat.value}</strong>
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function SecuritySummary({ devices, onOpen }: { devices: Device[]; onOpen: () => void }) {
  const doorLocked = devices.find((device) => device.id === 2)?.active;
  return (
    <Card tone="inverse" padding="lg" className="flex flex-col max-md:min-h-75">
      <IconTile icon="shield" size="lg" tone="inverse" className="mb-5 size-12" />
      <Eyebrow className="text-on-inverse-muted">Home status</Eyebrow>
      <h2 className="mt-2 font-display text-lg font-semibold">{doorLocked ? "Safe & secure" : "Front door unlocked"}</h2>
      <p className="mt-2 mb-4.5 text-sm text-on-inverse-muted">{doorLocked ? "All doors are locked and cameras are active." : "Cameras are active. Lock the door when you can."}</p>
      <div className="mt-auto grid gap-2.5 text-xs">
        <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-on-inverse-muted"><Icon name="lock" size={17} /> Doors</span><strong className="font-medium">{doorLocked ? "3 locked" : "2 of 3 locked"}</strong></div>
        <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-on-inverse-muted"><Icon name="camera" size={17} /> Cameras</span><strong className="font-medium">2 active</strong></div>
      </div>
      <button type="button" onClick={onOpen} className="mt-5 flex items-center gap-1 border-t border-on-inverse/15 pt-3.5 text-sm font-semibold">View security <Icon name="arrow" size={16} /></button>
    </Card>
  );
}

function DeviceCard({ device, onToggle }: { device: Device; onToggle: () => void }) {
  return (
    <Card padding="sm" className="min-h-40 shadow-none max-sm:min-h-37">
      <div className="mb-5.5 flex items-start justify-between">
        <IconTile icon={device.icon} tone={device.active ? "brand" : "neutral"} />
        <Toggle on={device.active} label={`Toggle ${device.name}`} onChange={onToggle} />
      </div>
      <div className="grid gap-0.5">
        <strong className="text-sm">{device.name}</strong>
        <small className="text-2xs text-subtle">{device.room}</small>
      </div>
      <p className={cn("mt-3 text-2xs", device.active ? "text-brand-text" : "text-subtle")}>{device.active ? device.detail : (device.offDetail ?? "Off")}</p>
    </Card>
  );
}

export default function HomePage({ devices, temperature, scene, setTemperature, toggleDevice, activateScene, goTo, askAssistant }: HomePageProps) {
  const [room, setRoom] = useState<Room>("Overview");
  const visibleDevices = room === "Overview" ? devices : devices.filter((device) => device.room === room);
  const now = new Date();

  return (
    <>
      <PageHeader
        eyebrow={now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        title={`${greeting(now)}, Alex.`}
        description="Everything at home is calm and running smoothly."
        action={<Button icon="plus" onClick={() => goTo("Settings", "Ready to connect a new device")}>Add device</Button>}
      />
      <AssistantTeaser askAssistant={askAssistant} open={() => goTo("Assistant")} />
      <Tabs items={rooms} value={room} onChange={setRoom} label="Rooms" className="mb-6" />

      <section className="grid grid-cols-[minmax(0,1.7fr)_minmax(270px,0.8fr)] gap-4 max-md:grid-cols-1">
        <ClimateCard temperature={temperature} setTemperature={setTemperature} />
        <SecuritySummary devices={devices} onOpen={() => goTo("Security")} />
      </section>

      <section className="mt-9 max-sm:mt-7.5">
        <SectionHeader title="Quick scenes" subtitle="Set the mood with one tap" action={<Button variant="link" iconRight="arrow" onClick={() => goTo("Automations")}>Manage scenes</Button>} />
        <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {scenes.map((item) => (
            <button
              key={item.name}
              type="button"
              aria-pressed={scene === item.name}
              onClick={() => activateScene(item.name)}
              className={cn(
                "grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-lg border p-4 text-left transition hover:-translate-y-0.5 hover:border-brand hover:shadow-hover max-sm:p-3.5",
                scene === item.name ? "border-brand bg-brand-softer" : "border-border bg-surface",
              )}
            >
              <IconTile icon={item.icon} />
              <span className="grid min-w-0 gap-0.5">
                <strong className="text-sm">{item.name}</strong>
                <small className="truncate text-2xs text-subtle">{item.note}</small>
              </span>
              <Icon name="chevron" size={17} className="text-subtle" />
            </button>
          ))}
        </div>
      </section>

      <section className="mt-9 grid grid-cols-[minmax(0,1fr)_285px] gap-4 max-lg:grid-cols-[1fr_260px] max-md:grid-cols-1 max-sm:mt-7.5">
        <div>
          <SectionHeader
            title={room === "Overview" ? "Favorite devices" : room}
            subtitle={`${visibleDevices.length} devices shown`}
            action={room !== "Overview" && <Button variant="link" iconRight="arrow" onClick={() => setRoom("Overview")}>View all</Button>}
          />
          <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2">
            {visibleDevices.length
              ? visibleDevices.map((device) => <DeviceCard key={device.id} device={device} onToggle={() => toggleDevice(device.id)} />)
              : <EmptyState>No favorite devices in this room yet.</EmptyState>}
          </div>
        </div>
        <Card as="aside" className="max-md:-order-1">
          <CardHeader eyebrow="Energy today" icon="bolt" title={<span className="text-2xl">8.4 kWh</span>} action={<Badge tone="success">−12%</Badge>} />
          <p className="mt-2.5 text-xs text-subtle">You’re using less than your daily average.</p>
          <BarChart values={energyToday} size="sm" label="Energy use today" highlight={(index) => index >= energyToday.length - 3} />
          <ChartAxis labels={["6 AM", "Now"]} />
          <button type="button" onClick={() => goTo("Energy")} className="mt-4.5 flex w-full items-center justify-between border-t border-divider pt-3.5 text-xs font-semibold text-brand-text">
            See energy details <Icon name="arrow" size={16} />
          </button>
        </Card>
      </section>
    </>
  );
}
