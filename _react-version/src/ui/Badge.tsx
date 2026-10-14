import type { ReactNode } from "react";
import { cn } from "./cn";
import Icon, { type IconName } from "./Icon";

export type BadgeTone = "success" | "neutral" | "danger" | "brand" | "live";

const tones: Record<BadgeTone, string> = {
  success: "bg-success-soft text-success",
  neutral: "bg-surface-sunken text-muted",
  danger: "bg-danger-soft text-danger",
  brand: "bg-brand-soft text-brand-text",
  live: "bg-overlay text-stone-0 backdrop-blur-sm",
};

/** Small status label. */
export default function Badge({ tone = "neutral", icon, children, className }: { tone?: BadgeTone; icon?: IconName; children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex w-max items-center gap-1 rounded-sm px-2 py-1 text-2xs leading-none font-semibold", tones[tone], className)}>
      {tone === "live" && <i className="size-1.5 rounded-full bg-live" />}
      {icon && <Icon name={icon} size={12} />}
      {children}
    </span>
  );
}
