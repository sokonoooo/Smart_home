import { cn } from "./cn";
import Icon, { type IconName } from "./Icon";

export type SegmentOption<T extends string> = { value: T; label: string; icon?: IconName; danger?: boolean };

type SegmentedControlProps<T extends string> = {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  /** "raised": white pill on grey (subtle). "solid": filled brand pill (strong). */
  appearance?: "raised" | "solid";
  className?: string;
};

/** A row of mutually exclusive buttons. */
export default function SegmentedControl<T extends string>({ options, value, onChange, label, appearance = "raised", className }: SegmentedControlProps<T>) {
  return (
    <div role="group" aria-label={label} className={cn("flex gap-1 rounded-lg bg-surface-sunken p-1", className)}>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded-md text-xs transition-colors",
              appearance === "solid" ? "px-3 py-2.5" : "px-2.5 py-1.5",
              !active && "text-muted hover:text-fg",
              active && appearance === "raised" && "bg-surface font-semibold text-fg shadow-sm",
              active && appearance === "solid" && (option.danger ? "bg-danger-strong text-stone-0" : "bg-brand text-on-brand"),
            )}
          >
            {option.icon && <Icon name={option.icon} size={appearance === "solid" ? 18 : 15} />}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
