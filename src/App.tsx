import { useMemo, useState } from "react";

type Page = "Home" | "Automations" | "Energy" | "Security" | "Settings";
type IconName =
  | "air" | "arrow" | "bell" | "bolt" | "calendar" | "camera" | "check"
  | "chevron" | "clock" | "home" | "key" | "lamp" | "leaf" | "lock"
  | "moon" | "more" | "music" | "plus" | "search" | "settings" | "shield"
  | "sofa" | "sparkles" | "sun" | "thermostat" | "trend" | "user" | "wifi" | "wind";

const iconPaths: Record<IconName, React.ReactNode> = {
  air: <><path d="M4 9h10a3 3 0 1 0-3-3"/><path d="M4 15h13a3 3 0 1 1-3 3"/></>,
  arrow: <path d="m9 18 6-6-6-6"/>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
  bolt: <path d="m13 2-9 12h8l-1 8 9-12h-8l1-8Z"/>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
  camera: <><rect x="3" y="5" width="18" height="14" rx="3"/><circle cx="12" cy="12" r="3"/><path d="M8 5 9.5 3h5L16 5"/></>,
  check: <path d="m5 12 4 4L19 6"/>,
  chevron: <path d="m9 18 6-6-6-6"/>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  home: <><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></>,
  key: <><circle cx="8" cy="15" r="4"/><path d="m11 12 8-8M15 8l2 2M17 6l2 2"/></>,
  lamp: <><path d="M9 18h6M10 22h4"/><path d="M8.5 14.5A6 6 0 1 1 15.5 14.5C14.5 15.3 14 16 14 18h-4c0-2-.5-2.7-1.5-3.5Z"/></>,
  leaf: <><path d="M20 4C12 4 5 7 5 14c0 3 2 5 5 5 7 0 10-7 10-15Z"/><path d="M4 21c2-6 7-10 13-13"/></>,
  lock: <><rect x="4" y="10" width="16" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
  moon: <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z"/>,
  more: <><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></>,
  music: <><path d="M9 18V5l10-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="16" cy="16" r="3"/></>,
  plus: <><path d="M12 5v14M5 12h14"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/></>,
  shield: <><path d="M12 3 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-3Z"/><path d="m9 12 2 2 4-4"/></>,
  sofa: <><path d="M5 12V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4"/><path d="M5 11a3 3 0 0 0-3 3v5h20v-5a3 3 0 0 0-3-3 3 3 0 0 0-3 3H8a3 3 0 0 0-3-3ZM5 19v2M19 19v2"/></>,
  sparkles: <><path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3ZM19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15ZM5 13l.7 2.3L8 16l-2.3.7L5 19l-.7-2.3L2 16l2.3-.7L5 13Z"/></>,
  sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
  thermostat: <><path d="M10 14.8V5a2 2 0 1 1 4 0v9.8a4 4 0 1 1-4 0Z"/><path d="M12 8v9"/></>,
  trend: <><path d="m3 17 6-6 4 4 8-9"/><path d="M15 6h6v6"/></>,
  user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
  wifi: <><path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="20" r="1"/></>,
  wind: <><path d="M3 8h11a2.5 2.5 0 1 0-2.5-2.5M3 12h16a2.5 2.5 0 1 1-2.5 2.5M3 16h7"/></>,
};

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{iconPaths[name]}</svg>;
}

const navItems: { page: Page; icon: IconName }[] = [
  { page: "Home", icon: "home" }, { page: "Automations", icon: "sparkles" },
  { page: "Energy", icon: "bolt" }, { page: "Security", icon: "shield" },
];
const rooms = ["Overview", "Living room", "Bedroom", "Kitchen", "Office"];
const initialDevices = [
  { id: 1, name: "Pendant lights", room: "Living room", detail: "Warm · 68%", icon: "lamp" as IconName, active: true },
  { id: 2, name: "Front door", room: "Entrance", detail: "Locked", icon: "lock" as IconName, active: true },
  { id: 3, name: "Air purifier", room: "Bedroom", detail: "Auto · Air is good", icon: "wind" as IconName, active: true },
  { id: 4, name: "Kitchen speaker", room: "Kitchen", detail: "Nothing playing", icon: "music" as IconName, active: false },
];

function Toggle({ on, label, onClick }: { on: boolean; label: string; onClick: () => void }) {
  return <button className={`toggle ${on ? "on" : ""}`} onClick={onClick} aria-label={label} aria-pressed={on}><span /></button>;
}

function PageIntro({ eyebrow, title, copy, action, onAction }: { eyebrow: string; title: string; copy: string; action: string; onAction: () => void }) {
  return <section className="welcome page-intro"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{copy}</p></div><button className="outline-button" onClick={onAction}><Icon name="plus" size={18}/>{action}</button></section>;
}

function HomePage({ devices, temperature, scene, activeRoom, setActiveRoom, setTemperature, toggleDevice, activateScene, goTo }: any) {
  const visibleDevices = activeRoom === "Overview" ? devices : devices.filter((device: any) => device.room === activeRoom);
  return <>
    <PageIntro eyebrow="MONDAY, MAY 26" title="Good morning, Alex." copy="Everything at home is calm and running smoothly." action="Add device" onAction={() => goTo("Settings", "Ready to connect a new device")}/>
    <nav className="room-tabs" aria-label="Rooms">{rooms.map((room) => <button key={room} className={activeRoom === room ? "active" : ""} onClick={() => setActiveRoom(room)}>{room}</button>)}</nav>
    <section className="hero-grid">
      <article className="climate-card"><div className="card-heading"><div><span className="label"><Icon name="thermostat" size={17}/> INDOOR CLIMATE</span><h2>Perfectly comfortable</h2></div><button className="more-button" aria-label="Climate options"><Icon name="more"/></button></div><div className="climate-content"><div className="temperature"><span>{temperature}°</span><small>Heating to {temperature}°</small></div><div className="temp-controls"><button onClick={() => setTemperature(Math.max(16, temperature - 1))} aria-label="Lower temperature">−</button><div><span>SET TO</span><strong>{temperature}°C</strong></div><button onClick={() => setTemperature(Math.min(28, temperature + 1))} aria-label="Raise temperature">+</button></div></div><div className="climate-stats"><div><Icon name="air" size={18}/><span><small>Humidity</small><strong>46%</strong></span></div><div><Icon name="leaf" size={18}/><span><small>Air quality</small><strong>Excellent</strong></span></div><div><Icon name="wind" size={18}/><span><small>Mode</small><strong>Auto</strong></span></div></div></article>
      <article className="security-card"><div className="security-icon"><Icon name="shield" size={26}/></div><div><span className="label">HOME STATUS</span><h2>Safe & secure</h2><p>All doors are locked and cameras are active.</p></div><div className="security-list"><div><span><Icon name="lock" size={17}/> Doors</span><strong>3 locked</strong></div><div><span><Icon name="camera" size={17}/> Cameras</span><strong>2 active</strong></div></div><button className="text-button" onClick={() => goTo("Security")}>View security <Icon name="arrow" size={16}/></button></article>
    </section>
    <section className="section-block"><div className="section-title"><div><h2>Quick scenes</h2><p>Set the mood with one tap</p></div><button className="text-button" onClick={() => goTo("Automations")}>Manage scenes <Icon name="arrow" size={16}/></button></div><div className="scenes">{[
      { name: "Morning", note: "Lights · Climate · Blinds", icon: "sun" as IconName }, { name: "Relax", note: "Warm lights · Music", icon: "sofa" as IconName }, { name: "Away", note: "Security · Energy saver", icon: "lock" as IconName }, { name: "Good night", note: "Lights off · Doors locked", icon: "moon" as IconName },
    ].map((item) => <button key={item.name} className={`scene-card ${scene === item.name ? "selected" : ""}`} onClick={() => activateScene(item.name)}><span className="scene-icon"><Icon name={item.icon} size={21}/></span><span><strong>{item.name}</strong><small>{item.note}</small></span><Icon name="chevron" size={17}/></button>)}</div></section>
    <section className="lower-grid"><div className="devices-section"><div className="section-title"><div><h2>{activeRoom === "Overview" ? "Favorite devices" : activeRoom}</h2><p>{visibleDevices.length} devices shown</p></div><button className="text-button">View all <Icon name="arrow" size={16}/></button></div><div className="device-grid">{visibleDevices.length ? visibleDevices.map((device: any) => <article className={`device-card ${device.active ? "active" : ""}`} key={device.id}><div className="device-top"><span className="device-icon"><Icon name={device.icon} size={21}/></span><Toggle on={device.active} label={`Toggle ${device.name}`} onClick={() => toggleDevice(device.id)}/></div><div><strong>{device.name}</strong><small>{device.room}</small></div><p>{device.active ? device.detail : "Off"}</p></article>) : <div className="empty-state">No favorite devices in this room yet.</div>}</div></div><aside className="energy-card"><div className="card-heading"><div><span className="label"><Icon name="bolt" size={16}/> ENERGY TODAY</span><h2>8.4 kWh</h2></div><span className="energy-change">−12%</span></div><p>You’re using less than your daily average.</p><div className="chart" aria-label="Energy use bar chart">{[48,65,42,78,55,70,38,52,68,43,62,84].map((height, index) => <i key={index} style={{ height: `${height}%` }}/>)}</div><div className="chart-labels"><span>6 AM</span><span>Now</span></div><button className="energy-link" onClick={() => goTo("Energy")}>See energy details <Icon name="arrow" size={16}/></button></aside></section>
  </>;
}

function AutomationsPage({ enabled, toggle, notify }: any) {
  const automations = [
    { name: "Gentle wake up", detail: "Weekdays at 7:00 AM", icon: "sun" as IconName, steps: "4 actions" },
    { name: "Leave home", detail: "When everyone leaves", icon: "key" as IconName, steps: "6 actions" },
    { name: "Welcome home", detail: "When the first person arrives", icon: "home" as IconName, steps: "3 actions" },
    { name: "Night security", detail: "Every day at 11:00 PM", icon: "shield" as IconName, steps: "5 actions" },
  ];
  return <><PageIntro eyebrow="ROUTINES & SCENES" title="Automations" copy="Let Haven handle the little things, right on schedule." action="New automation" onAction={() => notify("Automation builder is ready")}/>
    <section className="summary-grid"><article className="summary-card"><span className="summary-icon"><Icon name="sparkles"/></span><div><small>ACTIVE ROUTINES</small><strong>8</strong><p>2 ran today</p></div></article><article className="summary-card"><span className="summary-icon"><Icon name="clock"/></span><div><small>NEXT EVENT</small><strong>6:30 PM</strong><p>Evening lights</p></div></article><article className="summary-card"><span className="summary-icon"><Icon name="bolt"/></span><div><small>TIME SAVED</small><strong>3.2 hrs</strong><p>This month</p></div></article></section>
    <section className="page-grid"><div><div className="section-title"><div><h2>Your automations</h2><p>Routines that run around your life</p></div><button className="text-button">View activity <Icon name="arrow" size={16}/></button></div><div className="list-card">{automations.map((item, index) => <div className="automation-row" key={item.name}><span className="row-icon"><Icon name={item.icon}/></span><div className="row-copy"><strong>{item.name}</strong><small>{item.detail}</small></div><span className="row-meta">{item.steps}</span><Toggle on={enabled[index]} label={`Toggle ${item.name}`} onClick={() => toggle(index)}/><button className="more-button" aria-label={`${item.name} options`}><Icon name="more"/></button></div>)}</div></div>
    <aside><div className="section-title"><div><h2>Today</h2><p>Upcoming at home</p></div></div><div className="timeline-card">{[["3:45 PM","Air refresh","wind"],["6:30 PM","Evening lights","lamp"],["11:00 PM","Night security","shield"]].map(([time,name,icon], index) => <div className="timeline-item" key={name}><span className={index === 0 ? "live" : ""}/><small>{time}</small><div><strong>{name}</strong><p><Icon name={icon as IconName} size={14}/>{index === 0 ? "Running soon" : "Scheduled"}</p></div></div>)}</div></aside></section>
  </>;
}

function EnergyPage({ notify }: { notify: (message: string) => void }) {
  const bars = [35,46,40,62,58,77,53,68,82,64,73,91,70,59,75,68,88,78,66,84,63,74,69,56];
  return <><PageIntro eyebrow="ENERGY OVERVIEW" title="Energy" copy="Understand your home’s usage and find simple ways to save." action="Set energy goal" onAction={() => notify("Energy goal settings opened")}/>
    <section className="metric-grid"><article className="metric-card"><span><Icon name="bolt"/></span><small>USED TODAY</small><strong>8.4 <em>kWh</em></strong><p className="positive"><Icon name="trend" size={14}/> 12% below average</p></article><article className="metric-card"><span><Icon name="leaf"/></span><small>ESTIMATED COST</small><strong>$2.18</strong><p>$68.40 projected this month</p></article><article className="metric-card"><span><Icon name="sun"/></span><small>SOLAR GENERATED</small><strong>5.7 <em>kWh</em></strong><p>68% of today’s usage</p></article><article className="metric-card"><span><Icon name="calendar"/></span><small>MONTHLY GOAL</small><strong>74%</strong><p>22 days remaining</p></article></section>
    <section className="energy-layout"><article className="panel usage-panel"><div className="panel-head"><div><span className="label">USAGE OVER TIME</span><h2>Today’s consumption</h2></div><div className="segmented"><button className="active">Day</button><button>Week</button><button>Month</button></div></div><div className="usage-total"><strong>8.4 kWh</strong><span>Daily average 9.6 kWh</span></div><div className="large-chart">{bars.map((height, index) => <i key={index} className={index > 19 ? "current" : ""} style={{ height: `${height}%` }}/>)}</div><div className="axis"><span>12 AM</span><span>6 AM</span><span>12 PM</span><span>6 PM</span><span>Now</span></div></article>
    <article className="panel breakdown"><div className="panel-head"><div><span className="label">BY DEVICE</span><h2>Top consumers</h2></div></div>{[["Heating & cooling","thermostat","3.2 kWh","38%"],["Kitchen","lamp","1.8 kWh","21%"],["Entertainment","music","1.1 kWh","13%"],["Other devices","bolt","2.3 kWh","28%"]].map(([name,icon,value,width]) => <div className="usage-row" key={name}><span className="row-icon"><Icon name={icon as IconName} size={18}/></span><div><span><strong>{name}</strong><small>{value}</small></span><i><b style={{ width }}/></i></div></div>)}</article></section>
    <section className="insight-banner"><span><Icon name="leaf" size={24}/></span><div><strong>A small change could save $9 this month</strong><p>Lowering the thermostat by 1° overnight would reduce heating use by around 8%.</p></div><button className="outline-button" onClick={() => notify("Energy-saving schedule applied")}>Apply suggestion</button></section>
  </>;
}

function SecurityPage({ mode, setMode, notify }: any) {
  return <><PageIntro eyebrow="HOME PROTECTION" title="Security" copy="Your home is protected. All sensors are responding normally." action="Add sensor" onAction={() => notify("Sensor setup is ready")}/>
    <section className="security-hero panel"><div className="security-orb"><Icon name="shield" size={36}/><span><Icon name="check" size={14}/></span></div><div className="security-copy"><span className="label">CURRENT STATUS</span><h2>{mode === "Disarmed" ? "Security is disarmed" : `Home is armed · ${mode}`}</h2><p>{mode === "Disarmed" ? "Cameras remain active and will still send alerts." : "Every entry point is secured and being monitored."}</p></div><div className="mode-switch"><button className={mode === "Home" ? "active" : ""} onClick={() => setMode("Home")}><Icon name="home"/>Home</button><button className={mode === "Away" ? "active" : ""} onClick={() => setMode("Away")}><Icon name="lock"/>Away</button><button className={mode === "Disarmed" ? "active disarm" : ""} onClick={() => setMode("Disarmed")}><Icon name="key"/>Disarm</button></div></section>
    <section className="summary-grid security-stats"><article className="summary-card"><span className="summary-icon"><Icon name="lock"/></span><div><small>ENTRY POINTS</small><strong>3 secured</strong><p>All doors locked</p></div></article><article className="summary-card"><span className="summary-icon"><Icon name="camera"/></span><div><small>CAMERAS</small><strong>2 online</strong><p>Recording normally</p></div></article><article className="summary-card"><span className="summary-icon"><Icon name="wifi"/></span><div><small>SENSORS</small><strong>6 connected</strong><p>No issues found</p></div></article></section>
    <section className="camera-section"><div className="section-title"><div><h2>Live cameras</h2><p>Last checked just now</p></div><button className="text-button">Manage cameras <Icon name="arrow" size={16}/></button></div><div className="camera-grid">{[["Front porch","Front entry · Live"],["Back garden","Garden · Live"]].map(([name, detail], index) => <article className={`camera-card camera-${index + 1}`} key={name}><div className="camera-feed"><span className="live-badge"><i/>LIVE</span><Icon name="camera" size={36}/><small>Encrypted live preview</small></div><div><span><strong>{name}</strong><small>{detail}</small></span><button className="more-button"><Icon name="more"/></button></div></article>)}</div></section>
    <section className="activity-panel panel"><div className="panel-head"><div><span className="label">RECENT ACTIVITY</span><h2>Security timeline</h2></div><button className="text-button">View all</button></div>{[["Front door locked","Alex · 10:42 AM","lock"],["Motion detected at front porch","Person recognized · 9:18 AM","camera"],["Away mode disarmed","Alex arrived home · 8:56 AM","key"]].map(([name,detail,icon]) => <div className="activity-row" key={name}><span className="row-icon"><Icon name={icon as IconName}/></span><div><strong>{name}</strong><small>{detail}</small></div><Icon name="chevron" size={16}/></div>)}</section>
  </>;
}

function SettingsPage({ preferences, togglePreference, notify }: any) {
  return <><PageIntro eyebrow="HAVEN PREFERENCES" title="Settings" copy="Manage your home, household, devices, and notifications." action="Add home member" onAction={() => notify("Invite link copied")}/>
    <section className="settings-layout"><aside className="settings-menu panel">{[["Your profile","user"],["Home details","home"],["Notifications","bell"],["Devices & hubs","wifi"],["Privacy & security","shield"]].map(([name, icon], index) => <button className={index === 0 ? "active" : ""} key={name}><Icon name={icon as IconName}/><span>{name}</span><Icon name="chevron" size={16}/></button>)}</aside>
    <div className="settings-content"><article className="panel profile-panel"><div className="settings-heading"><div><span className="label">YOUR PROFILE</span><h2>Personal information</h2><p>Used for household activity and personalized routines.</p></div><button className="text-button" onClick={() => notify("Profile editing enabled")}>Edit profile</button></div><div className="profile-summary"><span className="large-avatar">AJ</span><div><strong>Alex Johnson</strong><small>alex@havenhome.com</small><p>Home owner</p></div></div><div className="detail-grid"><div><small>DISPLAY NAME</small><strong>Alex Johnson</strong></div><div><small>PHONE</small><strong>+1 (415) 555-0138</strong></div><div><small>TIME ZONE</small><strong>Pacific Time</strong></div><div><small>LANGUAGE</small><strong>English (US)</strong></div></div></article>
    <article className="panel preference-panel"><div className="settings-heading"><div><span className="label">PREFERENCES</span><h2>Notifications</h2><p>Choose what Haven should tell you about.</p></div></div>{[["Security alerts","Immediate alerts for doors, cameras, and alarms"],["Automation updates","Know when routines run or need attention"],["Energy insights","Weekly reports and saving suggestions"]].map(([name, detail], index) => <div className="preference-row" key={name}><div><strong>{name}</strong><small>{detail}</small></div><Toggle on={preferences[index]} label={`Toggle ${name}`} onClick={() => togglePreference(index)}/></div>)}</article></div></section>
  </>;
}

export default function App() {
  const [page, setPage] = useState<Page>("Home");
  const [activeRoom, setActiveRoom] = useState("Overview");
  const [devices, setDevices] = useState(initialDevices);
  const [temperature, setTemperature] = useState(22);
  const [scene, setScene] = useState("Morning");
  const [notice, setNotice] = useState("");
  const [automations, setAutomations] = useState([true, true, true, true]);
  const [preferences, setPreferences] = useState([true, true, false]);
  const [securityMode, setSecurityMode] = useState("Home");

  const activeDevices = useMemo(() => devices.filter((device) => device.active).length, [devices]);
  function notify(message: string) { setNotice(message); window.setTimeout(() => setNotice(""), 2400); }
  function navigate(next: Page, message?: string) { setPage(next); window.scrollTo({ top: 0, behavior: "smooth" }); if (message) notify(message); }
  function toggleDevice(id: number) { setDevices((current) => current.map((device) => device.id === id ? { ...device, active: !device.active } : device)); }
  function activateScene(next: string) { setScene(next); notify(`${next} scene is now active`); }

  return <div className="app-shell">
    <aside className="sidebar"><div className="brand"><span className="brand-mark"><Icon name="home" size={19}/></span><span>Haven</span></div><nav className="primary-nav" aria-label="Primary navigation">{navItems.map((item) => <button key={item.page} className={`nav-item ${page === item.page ? "active" : ""}`} onClick={() => navigate(item.page)}><Icon name={item.icon}/><span>{item.page}</span></button>)}</nav><div className="sidebar-spacer"/><div className="home-status"><span className="status-dot"/><div><strong>Home is online</strong><small>{activeDevices + 8} devices connected</small></div></div><button className={`nav-item ${page === "Settings" ? "active" : ""}`} onClick={() => navigate("Settings")}><Icon name="settings"/><span>Settings</span></button><div className="profile"><span className="avatar">AJ</span><div><strong>Alex Johnson</strong><small>Home owner</small></div><Icon name="more"/></div></aside>
    <main><header className="topbar"><div className="mobile-brand"><span className="brand-mark"><Icon name="home" size={18}/></span><span>Haven</span></div><label className="search"><Icon name="search" size={18}/><input aria-label="Search devices" placeholder="Search devices, rooms..."/></label><div className="header-actions"><span className="weather"><Icon name="sun" size={18}/>18° <small>Clear</small></span><button className="icon-button" aria-label="Notifications" onClick={() => notify("You’re all caught up")}><Icon name="bell" size={19}/><span className="notification-dot"/></button><button className="mobile-avatar" onClick={() => navigate("Settings")}>AJ</button></div></header><div className="content">
      {page === "Home" && <HomePage devices={devices} temperature={temperature} scene={scene} activeRoom={activeRoom} setActiveRoom={setActiveRoom} setTemperature={setTemperature} toggleDevice={toggleDevice} activateScene={activateScene} goTo={navigate}/>} 
      {page === "Automations" && <AutomationsPage enabled={automations} toggle={(index: number) => setAutomations((items) => items.map((item, i) => i === index ? !item : item))} notify={notify}/>} 
      {page === "Energy" && <EnergyPage notify={notify}/>} 
      {page === "Security" && <SecurityPage mode={securityMode} setMode={(mode: string) => { setSecurityMode(mode); notify(`Security set to ${mode}`); }} notify={notify}/>} 
      {page === "Settings" && <SettingsPage preferences={preferences} togglePreference={(index: number) => setPreferences((items) => items.map((item, i) => i === index ? !item : item))} notify={notify}/>} 
    </div></main>
    <nav className="mobile-nav" aria-label="Mobile navigation">{navItems.map((item) => <button key={item.page} className={page === item.page ? "active" : ""} onClick={() => navigate(item.page)}><Icon name={item.icon}/><span>{item.page === "Automations" ? "Scenes" : item.page}</span></button>)}</nav>
    {notice && <div className="toast"><Icon name="sparkles" size={18}/>{notice}</div>}
  </div>;
}
