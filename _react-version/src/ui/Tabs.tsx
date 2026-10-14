import { cn } from "./cn";

type TabsProps<T extends string> = { items: readonly T[]; value: T; onChange: (value: T) => void; label: string; className?: string };

/** Underlined horizontal tabs. */
export default function Tabs<T extends string>({ items, value, onChange, label, className }: TabsProps<T>) {
  return (
    <nav aria-label={label} className={cn("flex gap-7 overflow-x-auto border-b border-border max-sm:gap-5", className)}>
      {items.map((item) => {
        const active = item === value;
        return (
          <button
            key={item}
            type="button"
            aria-current={active ? "true" : undefined}
            onClick={() => onChange(item)}
            className={cn(
              "relative shrink-0 px-0.5 pb-3 text-base transition-colors",
              active ? "font-semibold text-fg after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:rounded-full after:bg-brand" : "text-subtle hover:text-fg",
            )}
          >
            {item}
          </button>
        );
      })}
    </nav>
  );
}
