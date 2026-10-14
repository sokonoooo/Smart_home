import { cn } from "./cn";

type ToggleProps = { on: boolean; label: string; onChange: () => void; disabled?: boolean };

/** On/off switch. */
export default function Toggle({ on, label, onChange, disabled }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      disabled={disabled}
      onClick={onChange}
      className={cn("w-[34px] shrink-0 rounded-full p-[3px] transition-colors disabled:opacity-50", on ? "bg-brand" : "bg-toggle-off")}
    >
      <span className={cn("block size-3.5 rounded-full bg-stone-0 shadow-sm transition-transform", on && "translate-x-3.5")} />
    </button>
  );
}
