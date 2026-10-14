import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "./cn";
import Eyebrow from "./Eyebrow";
import type { IconName } from "./Icon";

export type CardTone = "default" | "inverse" | "accent";
export type CardPadding = "none" | "sm" | "md" | "lg";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "article" | "section" | "div" | "aside";
  tone?: CardTone;
  padding?: CardPadding;
};

const tones: Record<CardTone, string> = {
  default: "border border-border bg-surface shadow-card",
  inverse: "bg-surface-inverse text-on-inverse",
  accent: "border border-accent-border bg-accent-surface",
};

const paddings: Record<CardPadding, string> = {
  none: "",
  sm: "p-4",
  md: "p-5 max-sm:p-4",
  lg: "p-6 max-sm:p-5",
};

export default function Card({ as: Tag = "article", tone = "default", padding = "md", className, ...props }: CardProps) {
  return <Tag className={cn("rounded-xl", tones[tone], paddings[padding], className)} {...props} />;
}

type CardHeaderProps = {
  eyebrow?: string;
  icon?: IconName;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  inverse?: boolean;
  className?: string;
};

export function CardHeader({ eyebrow, icon, title, description, action, inverse, className }: CardHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <div className="min-w-0">
        {eyebrow && <Eyebrow icon={icon} className={inverse ? "text-on-inverse-muted" : undefined}>{eyebrow}</Eyebrow>}
        <h2 className={cn("font-display text-lg font-semibold tracking-tight", eyebrow && "mt-2")}>{title}</h2>
        {description && <p className={cn("mt-1.5 text-2xs", inverse ? "text-on-inverse-muted" : "text-subtle")}>{description}</p>}
      </div>
      {action}
    </div>
  );
}
