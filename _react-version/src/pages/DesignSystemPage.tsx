import { useState, type ReactNode } from "react";
import {
  Avatar, Badge, Banner, BarChart, Button, Card, CardHeader, ChartAxis, Chip, EmptyState, Eyebrow, Icon, IconButton, iconNames, IconTile,
  ListRow, PageHeader, ProgressBar, SectionHeader, SegmentedControl, StatCard, Tabs, TextField, Toggle, useTheme,
  type BadgeTone, type ButtonVariant, type IconTileTone,
} from "../ui";

const semanticGroups: { title: string; tokens: string[] }[] = [
  { title: "Surfaces", tokens: ["bg", "surface", "surface-muted", "surface-sunken", "surface-inverse"] },
  { title: "Text", tokens: ["fg", "muted", "subtle", "on-inverse", "on-brand"] },
  { title: "Brand", tokens: ["brand", "brand-strong", "brand-soft", "brand-softer", "brand-text"] },
  { title: "Lines & status", tokens: ["border", "border-strong", "divider", "success", "success-soft", "danger", "danger-soft", "live"] },
  { title: "Data", tokens: ["chart", "chart-strong", "accent-surface", "accent-border", "toggle-off"] },
];

const palettes: { name: string; steps: string[] }[] = [
  { name: "sage", steps: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"] },
  { name: "stone", steps: ["0", "50", "100", "150", "200", "300", "400", "500", "600", "700", "800", "900"] },
  { name: "clay", steps: ["100", "400", "500", "600"] },
];

const typeScale = [
  { token: "display", size: "62px", className: "font-display text-display font-medium tracking-[-0.06em]" },
  { token: "3xl", size: "38px", className: "font-display text-3xl font-semibold tracking-[-0.04em]" },
  { token: "2xl", size: "25px", className: "font-display text-2xl font-semibold" },
  { token: "xl", size: "20px", className: "font-display text-xl font-semibold" },
  { token: "lg", size: "17px", className: "font-display text-lg font-semibold" },
  { token: "md", size: "14px", className: "text-md" },
  { token: "base", size: "13px", className: "text-base" },
  { token: "sm", size: "12px", className: "text-sm" },
  { token: "xs", size: "11px", className: "text-xs" },
  { token: "2xs", size: "10px", className: "text-2xs" },
];

// Full class names so Tailwind can find them when scanning.
const radii = [["sm", "rounded-sm"], ["md", "rounded-md"], ["lg", "rounded-lg"], ["xl", "rounded-xl"], ["full", "rounded-full"]];
const shadows = [["card", "shadow-card"], ["hover", "shadow-hover"], ["pop", "shadow-pop"]];

function Swatch({ name, value, small }: { name: string; value: string; small?: boolean }) {
  return (
    <div className="grid min-w-0 gap-1.5">
      <span className={`rounded-md border border-border ${small ? "h-10" : "h-14"}`} style={{ background: value }} />
      <code className="truncate text-2xs text-muted">{name}</code>
    </div>
  );
}

function Specimen({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <Card padding="lg" className="grid gap-5">
      <div>
        <h3 className="font-display text-md font-semibold">{title}</h3>
        {description && <p className="mt-1 text-xs text-subtle">{description}</p>}
      </div>
      {children}
    </Card>
  );
}

export default function DesignSystemPage() {
  const { theme } = useTheme();
  const [toggle, setToggle] = useState(true);
  const [tab, setTab] = useState<"Overview" | "Living room" | "Kitchen">("Overview");
  const [segment, setSegment] = useState<"Day" | "Week" | "Month">("Week");

  return (
    <>
      <PageHeader eyebrow="Haven UI" title="Design system" description={`Tokens and components that build every screen. Showing the ${theme} theme.`} />

      <SectionHeader title="Color tokens" subtitle="Use these semantic names in components (bg-surface, text-muted…). They switch with the theme." />
      <div className="mb-9 grid gap-4">
        {semanticGroups.map((group) => (
          <Specimen key={group.title} title={group.title}>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-3">
              {group.tokens.map((token) => <Swatch key={token} name={token} value={`var(--${token})`} />)}
            </div>
          </Specimen>
        ))}
        <Specimen title="Primitive palette" description="Raw colors. Only tokens.css should reference these directly.">
          {palettes.map((palette) => (
            <div key={palette.name} className="grid grid-cols-[repeat(auto-fill,minmax(64px,1fr))] gap-2">
              {palette.steps.map((step) => <Swatch key={step} small name={`${palette.name}-${step}`} value={`var(--color-${palette.name}-${step})`} />)}
            </div>
          ))}
        </Specimen>
      </div>

      <SectionHeader title="Foundations" subtitle="Type, radius and elevation scales" />
      <div className="mb-9 grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-4 max-lg:grid-cols-1">
        <Specimen title="Typography" description="Manrope for headings and numbers, DM Sans for everything else.">
          <div className="grid gap-3">
            {typeScale.map((item) => (
              <div key={item.token} className="flex items-baseline gap-4 border-b border-divider pb-3 last:border-0">
                <code className="w-20 shrink-0 text-2xs text-subtle">text-{item.token}<br />{item.size}</code>
                <span className={`${item.className} truncate`}>Calm home</span>
              </div>
            ))}
          </div>
        </Specimen>
        <div className="grid content-start gap-4">
          <Specimen title="Radius">
            <div className="flex flex-wrap gap-4">
              {radii.map(([radius, className]) => (
                <div key={radius} className="grid justify-items-center gap-1.5">
                  <span className={`size-14 border border-brand bg-brand-soft ${className}`} />
                  <code className="text-2xs text-muted">{radius}</code>
                </div>
              ))}
            </div>
          </Specimen>
          <Specimen title="Elevation">
            <div className="grid grid-cols-3 gap-4">
              {shadows.map(([shadow, className]) => (
                <div key={shadow} className={`grid h-16 place-items-center rounded-lg bg-surface text-2xs text-muted ${className}`}>{shadow}</div>
              ))}
            </div>
          </Specimen>
          <Specimen title="Icons" description={`${iconNames.length} icons, 24px grid, 1.8 stroke.`}>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(36px,1fr))] gap-2 text-muted">
              {iconNames.map((name) => <span key={name} title={name} className="grid h-9 place-items-center rounded-md hover:bg-surface-sunken hover:text-fg"><Icon name={name} /></span>)}
            </div>
          </Specimen>
        </div>
      </div>

      <SectionHeader title="Components" subtitle="Import from src/ui" />
      <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1">
        <Specimen title="Button" description="variant: primary · outline · ghost · link — size: sm · md">
          {(["primary", "outline", "ghost", "link"] as ButtonVariant[]).map((variant) => (
            <div key={variant} className="flex flex-wrap items-center gap-2.5">
              <Button variant={variant} icon="plus">{variant}</Button>
              <Button variant={variant} size="sm">Small</Button>
              <Button variant={variant} disabled>Disabled</Button>
            </div>
          ))}
        </Specimen>

        <Specimen title="IconButton, Chip, Avatar">
          <div className="flex flex-wrap items-center gap-2.5">
            <IconButton icon="bell" label="Outline" />
            <IconButton icon="more" label="Ghost" variant="ghost" />
            <IconButton icon="send" label="Primary" variant="primary" />
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Chip>How's my home?</Chip>
            <Chip>Good night</Chip>
            <Chip disabled>Disabled</Chip>
          </div>
          <div className="flex items-center gap-3">
            <Avatar initials="AJ" />
            <Avatar initials="AJ" size="lg" tone="brand" />
          </div>
        </Specimen>

        <Specimen title="Toggle, Tabs, SegmentedControl">
          <div className="flex items-center gap-3">
            <Toggle on={toggle} label="Demo toggle" onChange={() => setToggle(!toggle)} />
            <span className="text-sm text-muted">{toggle ? "On" : "Off"}</span>
            <Toggle on={false} label="Disabled toggle" onChange={() => {}} disabled />
          </div>
          <Tabs items={["Overview", "Living room", "Kitchen"] as const} value={tab} onChange={setTab} label="Demo tabs" />
          <SegmentedControl label="Demo segmented" value={segment} onChange={setSegment} options={[{ value: "Day", label: "Day" }, { value: "Week", label: "Week" }, { value: "Month", label: "Month" }]} className="max-w-xs" />
          <SegmentedControl label="Demo solid segmented" appearance="solid" value={segment} onChange={setSegment} options={[{ value: "Day", label: "Day", icon: "sun" }, { value: "Week", label: "Week", icon: "calendar" }, { value: "Month", label: "Month", icon: "moon", danger: true }]} />
        </Specimen>

        <Specimen title="Badge & IconTile" description="Badge tone: success · neutral · danger · brand · live — IconTile tone: brand · neutral · solid · inverse">
          <div className="flex flex-wrap gap-2">
            {(["success", "neutral", "danger", "brand"] as BadgeTone[]).map((tone) => <Badge key={tone} tone={tone}>{tone}</Badge>)}
            <Badge tone="live">LIVE</Badge>
            <Badge tone="success" icon="check">With icon</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-3 rounded-lg bg-surface-inverse p-3">
            {(["brand", "neutral", "solid", "inverse"] as IconTileTone[]).map((tone) => <IconTile key={tone} icon="lamp" tone={tone} />)}
            <IconTile icon="lamp" size="sm" />
            <IconTile icon="lamp" size="lg" />
          </div>
        </Specimen>

        <Specimen title="TextField">
          <TextField icon="search" placeholder="Search devices, rooms…" aria-label="Demo search" />
          <TextField placeholder="Without icon" aria-label="Demo field" />
        </Specimen>

        <Specimen title="Charts">
          <div>
            <BarChart values={[40, 62, 55, 78, 49, 88, 70, 60]} label="Demo chart" highlight={(index) => index >= 6} size="sm" />
            <ChartAxis labels={["Start", "Now"]} />
          </div>
          <ProgressBar value={64} label="Demo progress" />
        </Specimen>

        <div className="grid content-start gap-4">
          <StatCard icon="sparkles" label="StatCard · row" value="8" hint="2 ran today" />
          <StatCard layout="stack" icon="bolt" label="StatCard · stack" value="8.4 kWh" hint="12% below average" />
        </div>

        <Specimen title="Card, CardHeader, ListRow">
          <Card className="shadow-none">
            <CardHeader eyebrow="Eyebrow" icon="bolt" title="Card title" description="Optional description" action={<Badge tone="success">−12%</Badge>} />
          </Card>
          <Card tone="inverse">
            <Eyebrow className="text-on-inverse-muted">Inverse card</Eyebrow>
            <p className="mt-2 text-sm">For high-emphasis summaries.</p>
          </Card>
          <div className="divide-y divide-divider">
            <ListRow leading={<IconTile icon="sun" />} title="List row" subtitle="With subtitle and meta" meta="4 actions" trailing={<Toggle on label="Demo" onChange={() => {}} />} />
            <ListRow leading={<IconTile icon="moon" tone="neutral" />} title="Another row" subtitle="Rows divide automatically" />
          </div>
        </Specimen>
      </div>

      <div className="mt-4 grid gap-4">
        <Banner icon="leaf" title="Banner" description="A highlighted message with an optional action." action={<Button>Action</Button>} />
        <EmptyState>EmptyState — shown when a list has nothing in it.</EmptyState>
      </div>
    </>
  );
}
