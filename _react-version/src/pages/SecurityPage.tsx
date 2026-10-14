import type { SecurityMode } from "../types";
import { Badge, Button, Card, CardHeader, Eyebrow, Icon, IconButton, IconTile, ListRow, PageHeader, SectionHeader, SegmentedControl, StatCard, type IconName } from "../ui";

type SecurityPageProps = { mode: SecurityMode; setMode: (mode: SecurityMode) => void; notify: (message: string) => void };

const cameras = [
  { name: "Front porch", detail: "Front entry · Live" },
  { name: "Back garden", detail: "Garden · Live" },
];

const activity: { name: string; detail: string; icon: IconName }[] = [
  { name: "Front door locked", detail: "Alex · 10:42 AM", icon: "lock" },
  { name: "Motion detected at front porch", detail: "Person recognized · 9:18 AM", icon: "camera" },
  { name: "Away mode disarmed", detail: "Alex arrived home · 8:56 AM", icon: "key" },
];

export default function SecurityPage({ mode, setMode, notify }: SecurityPageProps) {
  const disarmed = mode === "Disarmed";
  return (
    <>
      <PageHeader
        eyebrow="Home protection"
        title="Security"
        description="Your home is protected. All sensors are responding normally."
        action={<Button icon="plus" onClick={() => notify("Sensor setup is ready")}>Add sensor</Button>}
      />
      <Card padding="none" as="section" className="grid grid-cols-[auto_1fr_auto] items-center gap-5 px-6 py-5.5 max-md:grid-cols-[auto_1fr] max-sm:grid-cols-1 max-sm:text-center">
        <div className="relative grid size-17 place-items-center rounded-full bg-surface-inverse text-on-inverse max-sm:mx-auto">
          <Icon name="shield" size={36} />
          <span className={`absolute right-0 bottom-0.5 grid size-6 place-items-center rounded-full border-3 border-surface text-stone-0 ${disarmed ? "bg-danger" : "bg-success"}`}>
            <Icon name={disarmed ? "x" : "check"} size={13} />
          </span>
        </div>
        <div>
          <Eyebrow className="max-sm:justify-center">Current status</Eyebrow>
          <h2 className="mt-2 mb-1 font-display text-xl font-semibold">{disarmed ? "Security is disarmed" : `Home is armed · ${mode}`}</h2>
          <p className="text-xs text-muted">{disarmed ? "Cameras remain active and will still send alerts." : "Every entry point is secured and being monitored."}</p>
        </div>
        <SegmentedControl
          label="Security mode"
          appearance="solid"
          value={mode}
          onChange={setMode}
          className="max-md:col-span-full"
          options={[
            { value: "Home", label: "Home", icon: "home" },
            { value: "Away", label: "Away", icon: "lock" },
            { value: "Disarmed", label: "Disarm", icon: "key", danger: true },
          ]}
        />
      </Card>

      <section className="mt-4.5 mb-9 grid grid-cols-3 gap-3 max-sm:grid-cols-1">
        <StatCard icon="lock" label="Entry points" value="3 secured" hint="All doors locked" />
        <StatCard icon="camera" label="Cameras" value="2 online" hint="Recording normally" />
        <StatCard icon="wifi" label="Sensors" value="6 connected" hint="No issues found" />
      </section>

      <section>
        <SectionHeader title="Live cameras" subtitle="Last checked just now" action={<Button variant="link" iconRight="arrow" onClick={() => notify("Camera settings opened")}>Manage cameras</Button>} />
        <div className="grid grid-cols-2 gap-3.5 max-sm:grid-cols-1">
          {cameras.map((camera, index) => (
            <Card key={camera.name} padding="none" className="overflow-hidden">
              <div
                className="relative grid min-h-48 place-items-center content-center gap-2 text-stone-0/75 max-sm:min-h-41"
                style={{ background: `linear-gradient(${index === 0 ? 140 : 200}deg, var(--camera-from), var(--camera-to))` }}
              >
                <Badge tone="live" className="absolute top-3.5 left-3.5">LIVE</Badge>
                <Icon name="camera" size={36} />
                <small className="text-2xs text-stone-0/60">Encrypted live preview</small>
              </div>
              <div className="flex items-center justify-between px-4 py-3.5">
                <span className="grid gap-0.5">
                  <strong className="text-sm">{camera.name}</strong>
                  <small className="text-2xs text-subtle">{camera.detail}</small>
                </span>
                <IconButton icon="more" label={`${camera.name} options`} variant="ghost" />
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Card padding="lg" as="section" className="mt-7">
        <CardHeader eyebrow="Recent activity" title="Security timeline" action={<Button variant="link" onClick={() => notify("Full history coming soon")}>View all</Button>} />
        <div className="mt-2 divide-y divide-divider">
          {activity.map((item) => (
            <ListRow key={item.name} leading={<IconTile icon={item.icon} />} title={item.name} subtitle={item.detail} trailing={<Icon name="chevron" size={16} className="text-subtle" />} className="last:pb-0" />
          ))}
        </div>
      </Card>
    </>
  );
}
