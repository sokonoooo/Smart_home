import { Button, Card, cn, Icon, IconButton, IconTile, ListRow, PageHeader, SectionHeader, StatCard, Toggle, type IconName } from "../ui";

type AutomationsPageProps = { enabled: boolean[]; toggle: (index: number) => void; notify: (message: string) => void };

const automations: { name: string; detail: string; icon: IconName; steps: string }[] = [
  { name: "Gentle wake up", detail: "Weekdays at 7:00 AM", icon: "sun", steps: "4 actions" },
  { name: "Leave home", detail: "When everyone leaves", icon: "key", steps: "6 actions" },
  { name: "Welcome home", detail: "When the first person arrives", icon: "home", steps: "3 actions" },
  { name: "Night security", detail: "Every day at 11:00 PM", icon: "shield", steps: "5 actions" },
];

const timeline: { time: string; name: string; icon: IconName }[] = [
  { time: "3:45 PM", name: "Air refresh", icon: "wind" },
  { time: "6:30 PM", name: "Evening lights", icon: "lamp" },
  { time: "11:00 PM", name: "Night security", icon: "shield" },
];

export default function AutomationsPage({ enabled, toggle, notify }: AutomationsPageProps) {
  const activeCount = enabled.filter(Boolean).length;
  return (
    <>
      <PageHeader
        eyebrow="Routines & scenes"
        title="Automations"
        description="Let Haven handle the little things, right on schedule."
        action={<Button icon="plus" onClick={() => notify("Automation builder is ready")}>New automation</Button>}
      />
      <section className="mb-9 grid grid-cols-3 gap-3 max-sm:grid-cols-1">
        <StatCard icon="sparkles" label="Active routines" value={activeCount + 4} hint="2 ran today" />
        <StatCard icon="clock" label="Next event" value="6:30 PM" hint="Evening lights" />
        <StatCard icon="bolt" label="Time saved" value="3.2 hrs" hint="This month" />
      </section>

      <section className="grid grid-cols-[minmax(0,1.65fr)_minmax(250px,0.65fr)] gap-4.5 max-md:grid-cols-1">
        <div>
          <SectionHeader title="Your automations" subtitle="Routines that run around your life" action={<Button variant="link" iconRight="arrow" onClick={() => notify("Activity log coming soon")}>View activity</Button>} />
          <Card padding="none" className="divide-y divide-divider px-4.5 max-sm:px-3.5">
            {automations.map((item, index) => (
              <ListRow
                key={item.name}
                leading={<IconTile icon={item.icon} tone={enabled[index] ? "brand" : "neutral"} />}
                title={item.name}
                subtitle={item.detail}
                meta={item.steps}
                trailing={
                  <>
                    <Toggle on={enabled[index]} label={`Toggle ${item.name}`} onChange={() => toggle(index)} />
                    <IconButton icon="more" label={`${item.name} options`} variant="ghost" className="max-sm:hidden" />
                  </>
                }
              />
            ))}
          </Card>
        </div>
        <aside>
          <SectionHeader title="Today" subtitle="Upcoming at home" />
          <Card padding="none" className="px-5 py-2">
            {timeline.map((item, index) => (
              <div key={item.name} className="relative grid min-h-19 grid-cols-[9px_56px_1fr] items-center gap-2.5">
                {index < timeline.length - 1 && <span className="absolute top-[43px] -bottom-[34px] left-1 w-px bg-divider" />}
                <span className={cn("z-[1] size-[9px] rounded-full border-2 bg-surface", index === 0 ? "border-brand shadow-[0_0_0_4px_var(--brand-soft)]" : "border-border-strong")} />
                <small className="text-2xs text-subtle">{item.time}</small>
                <div className="grid gap-1">
                  <strong className="text-xs">{item.name}</strong>
                  <p className="flex items-center gap-1.5 text-2xs text-subtle"><Icon name={item.icon} size={14} />{index === 0 ? "Running soon" : "Scheduled"}</p>
                </div>
              </div>
            ))}
          </Card>
        </aside>
      </section>
    </>
  );
}
