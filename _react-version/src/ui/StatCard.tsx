import type { ReactNode } from "react";
import Card from "./Card";
import { cn } from "./cn";
import type { IconName } from "./Icon";
import IconTile from "./IconTile";

type StatCardProps = {
  icon: IconName;
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  /** "row": icon beside the text. "stack": icon above, bigger value. */
  layout?: "row" | "stack";
};

export default function StatCard({ icon, label, value, hint, layout = "row" }: StatCardProps) {
  const stack = layout === "stack";
  return (
    <Card className={cn(stack ? "grid gap-2" : "flex min-h-26 items-center gap-4 max-sm:min-h-22")}>
      <IconTile icon={icon} size={stack ? "sm" : "lg"} />
      <div className={cn("grid", stack ? "gap-2" : "gap-1")}>
        <small className="text-2xs font-semibold tracking-[0.1em] text-subtle uppercase">{label}</small>
        <strong className={cn("font-display font-semibold", stack ? "text-2xl tracking-tight" : "text-lg")}>{value}</strong>
        {hint && <p className="text-2xs text-subtle">{hint}</p>}
      </div>
    </Card>
  );
}
