import type { ReactNode } from "react";
import { cn } from "./cn";
import Icon, { type IconName } from "./Icon";

/** Small uppercase label that sits above a heading. */
export default function Eyebrow({ children, icon, className }: { children: ReactNode; icon?: IconName; className?: string }) {
  return (
    <span className={cn("flex items-center gap-1.5 text-2xs font-semibold tracking-[0.14em] text-muted uppercase", className)}>
      {icon && <Icon name={icon} size={16} />}
      {children}
    </span>
  );
}
