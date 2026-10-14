import { cn, Icon } from "../ui";

export default function Brand({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-3 font-display text-xl font-bold tracking-tight", className)}>
      <span className="grid size-[34px] place-items-center rounded-[11px] bg-brand text-on-brand">
        <Icon name="home" size={19} />
      </span>
      Haven
    </span>
  );
}
