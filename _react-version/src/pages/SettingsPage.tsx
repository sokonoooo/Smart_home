import { useState } from "react";
import { Avatar, Badge, Button, Card, CardHeader, cn, Icon, PageHeader, SegmentedControl, Toggle, useTheme, type IconName, type ThemePreference } from "../ui";

type SettingsPageProps = { preferences: boolean[]; togglePreference: (index: number) => void; notify: (message: string) => void };

const menu: { name: string; icon: IconName; target?: string }[] = [
  { name: "Your profile", icon: "user", target: "profile" },
  { name: "Appearance", icon: "palette", target: "appearance" },
  { name: "Notifications", icon: "bell", target: "notifications" },
  { name: "Devices & hubs", icon: "wifi" },
  { name: "Privacy & security", icon: "shield" },
];

const details = [
  { label: "Display name", value: "Alex Johnson" },
  { label: "Phone", value: "+1 (415) 555-0138" },
  { label: "Time zone", value: "Pacific Time" },
  { label: "Language", value: "English (US)" },
];

const notificationPrefs = [
  { name: "Security alerts", detail: "Immediate alerts for doors, cameras, and alarms" },
  { name: "Automation updates", detail: "Know when routines run or need attention" },
  { name: "Energy insights", detail: "Weekly reports and saving suggestions" },
];

export default function SettingsPage({ preferences, togglePreference, notify }: SettingsPageProps) {
  const { preference, setPreference } = useTheme();
  const [active, setActive] = useState(menu[0].name);

  function select(item: (typeof menu)[number]) {
    if (!item.target) return notify(`${item.name} settings coming soon`);
    setActive(item.name);
    document.getElementById(item.target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <PageHeader
        eyebrow="Haven preferences"
        title="Settings"
        description="Manage your home, household, devices, and notifications."
        action={<Button icon="plus" onClick={() => notify("Invite link copied")}>Add home member</Button>}
      />
      <section className="grid grid-cols-[225px_minmax(0,1fr)] gap-4.5 max-md:grid-cols-1">
        <Card as="aside" padding="none" className="self-start p-2 md:sticky md:top-24 max-md:flex max-md:overflow-x-auto">
          {menu.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => select(item)}
              className={cn(
                "grid w-full grid-cols-[auto_1fr_auto] items-center gap-2.5 rounded-md p-3 text-left text-xs transition-colors max-md:w-auto max-md:shrink-0 max-md:grid-cols-[auto_auto] max-md:whitespace-nowrap",
                active === item.name ? "bg-brand-soft font-semibold text-brand-text" : "text-muted hover:bg-surface-sunken",
              )}
            >
              <Icon name={item.icon} />
              <span>{item.name}</span>
              <Icon name="chevron" size={16} className="text-subtle max-md:hidden" />
            </button>
          ))}
        </Card>

        <div className="grid gap-4.5">
          <Card padding="lg" id="profile" className="scroll-mt-24">
            <CardHeader eyebrow="Your profile" title="Personal information" description="Used for household activity and personalized routines." action={<Button variant="link" onClick={() => notify("Profile editing enabled")}>Edit profile</Button>} className="max-sm:flex-col" />
            <div className="mt-6 flex items-center gap-4 rounded-lg bg-surface-sunken p-4.5 max-sm:p-3.5">
              <Avatar initials="AJ" size="lg" tone="brand" />
              <div className="grid gap-1">
                <strong className="font-display text-md">Alex Johnson</strong>
                <small className="text-2xs text-subtle">alex@havenhome.com</small>
                <Badge tone="brand" className="mt-0.5">Home owner</Badge>
              </div>
            </div>
            <div className="mt-5.5 grid grid-cols-2 border-t border-divider max-sm:grid-cols-1">
              {details.map((item) => (
                <div key={item.label} className="grid gap-1 pt-4">
                  <small className="text-2xs tracking-[0.1em] text-subtle uppercase">{item.label}</small>
                  <strong className="text-xs font-medium">{item.value}</strong>
                </div>
              ))}
            </div>
          </Card>

          <Card padding="lg" id="appearance" className="scroll-mt-24">
            <CardHeader eyebrow="Appearance" title="Theme" description="Choose light or dark, or follow your device setting." />
            <SegmentedControl<ThemePreference>
              label="Theme"
              value={preference}
              onChange={setPreference}
              className="mt-5 max-w-sm"
              options={[
                { value: "light", label: "Light", icon: "sun" },
                { value: "dark", label: "Dark", icon: "moon" },
                { value: "system", label: "System", icon: "monitor" },
              ]}
            />
          </Card>

          <Card padding="lg" id="notifications" className="scroll-mt-24">
            <CardHeader eyebrow="Preferences" title="Notifications" description="Choose what Haven should tell you about." />
            <div className="mt-2 divide-y divide-divider">
              {notificationPrefs.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between gap-4.5 py-4 last:pb-0">
                  <div className="grid gap-1">
                    <strong className="text-xs">{item.name}</strong>
                    <small className="text-2xs text-subtle">{item.detail}</small>
                  </div>
                  <Toggle on={preferences[index]} label={`Toggle ${item.name}`} onChange={() => togglePreference(index)} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
