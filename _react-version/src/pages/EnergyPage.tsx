import { useState } from "react";
import { Banner, BarChart, Button, Card, CardHeader, ChartAxis, Icon, IconTile, PageHeader, ProgressBar, SegmentedControl, StatCard, type IconName } from "../ui";

type Range = "Day" | "Week" | "Month";

const usage: Record<Range, { title: string; total: string; average: string; bars: number[]; axis: string[]; current: (index: number, length: number) => boolean }> = {
  Day: {
    title: "Today’s consumption",
    total: "8.4 kWh",
    average: "Daily average 9.6 kWh",
    bars: [35, 46, 40, 62, 58, 77, 53, 68, 82, 64, 73, 91, 70, 59, 75, 68, 88, 78, 66, 84, 63, 74, 69, 56],
    axis: ["12 AM", "6 AM", "12 PM", "6 PM", "Now"],
    current: (index) => index > 19,
  },
  Week: {
    title: "This week",
    total: "61.2 kWh",
    average: "Weekly average 67 kWh",
    bars: [72, 85, 64, 78, 90, 58, 44],
    axis: ["Mon", "Wed", "Fri", "Sun"],
    current: (index, length) => index === length - 1,
  },
  Month: {
    title: "This month",
    total: "248 kWh",
    average: "Monthly average 270 kWh",
    bars: [62, 70, 58, 66, 81, 74, 52, 60, 77, 69, 55, 63, 88, 72, 65, 59, 71, 83, 76, 61, 54, 68, 79, 73, 66, 57, 70, 84, 75, 64],
    axis: ["1", "8", "15", "22", "Today"],
    current: (index, length) => index >= length - 7,
  },
};

const consumers: { name: string; icon: IconName; value: string; share: number }[] = [
  { name: "Heating & cooling", icon: "thermostat", value: "3.2 kWh", share: 38 },
  { name: "Kitchen", icon: "lamp", value: "1.8 kWh", share: 21 },
  { name: "Entertainment", icon: "music", value: "1.1 kWh", share: 13 },
  { name: "Other devices", icon: "bolt", value: "2.3 kWh", share: 28 },
];

export default function EnergyPage({ notify }: { notify: (message: string) => void }) {
  const [range, setRange] = useState<Range>("Day");
  const data = usage[range];

  return (
    <>
      <PageHeader
        eyebrow="Energy overview"
        title="Energy"
        description="Understand your home’s usage and find simple ways to save."
        action={<Button icon="plus" onClick={() => notify("Energy goal settings opened")}>Set energy goal</Button>}
      />
      <section className="mb-4.5 grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
        <StatCard layout="stack" icon="bolt" label="Used today" value={<>8.4 <em className="text-xs font-normal tracking-normal text-muted not-italic">kWh</em></>} hint={<span className="flex items-center gap-1 text-success"><Icon name="trend" size={14} /> 12% below average</span>} />
        <StatCard layout="stack" icon="leaf" label="Estimated cost" value="$2.18" hint="$68.40 projected this month" />
        <StatCard layout="stack" icon="sun" label="Solar generated" value={<>5.7 <em className="text-xs font-normal tracking-normal text-muted not-italic">kWh</em></>} hint="68% of today’s usage" />
        <StatCard layout="stack" icon="calendar" label="Monthly goal" value="74%" hint="22 days remaining" />
      </section>

      <section className="grid grid-cols-[minmax(0,1.6fr)_minmax(260px,0.7fr)] gap-4.5 max-lg:grid-cols-1">
        <Card padding="lg">
          <CardHeader
            eyebrow="Usage over time"
            title={data.title}
            action={<SegmentedControl label="Time range" value={range} onChange={setRange} options={[{ value: "Day", label: "Day" }, { value: "Week", label: "Week" }, { value: "Month", label: "Month" }]} />}
          />
          <div className="mt-7 flex items-baseline gap-2.5">
            <strong className="font-display text-2xl">{data.total}</strong>
            <span className="text-2xs text-subtle">{data.average}</span>
          </div>
          <BarChart values={data.bars} label={`${data.title} energy use`} highlight={(index) => data.current(index, data.bars.length)} />
          <ChartAxis labels={data.axis} />
        </Card>
        <Card padding="lg" className="grid content-start gap-4.5">
          <CardHeader eyebrow="By device" title="Top consumers" />
          {consumers.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <IconTile icon={item.icon} size="sm" />
              <div className="grid flex-1 gap-2">
                <span className="flex justify-between text-xs"><strong>{item.name}</strong><small className="text-subtle">{item.value}</small></span>
                <ProgressBar value={item.share} label={`${item.name} share of usage`} />
              </div>
            </div>
          ))}
        </Card>
      </section>

      <Banner
        className="mt-4.5"
        icon="leaf"
        title="A small change could save $9 this month"
        description="Lowering the thermostat by 1° overnight would reduce heating use by around 8%."
        action={<Button onClick={() => notify("Energy-saving schedule applied")}>Apply suggestion</Button>}
      />
    </>
  );
}
