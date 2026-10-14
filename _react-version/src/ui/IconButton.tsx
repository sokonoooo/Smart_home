import type { ButtonHTMLAttributes } from "react";
import { cn } from "./cn";
import Icon, { type IconName } from "./Icon";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: IconName;
  label: string;
  variant?: "outline" | "ghost" | "primary";
  iconSize?: number;
};

const variants = {
  outline: "border border-border bg-surface-muted text-fg hover:bg-surface-sunken",
  ghost: "text-subtle hover:bg-surface-sunken hover:text-fg",
  primary: "bg-brand text-on-brand hover:bg-brand-strong",
};

/** Square icon-only button. `label` is required for screen readers. */
export default function IconButton({ icon, label, variant = "outline", iconSize = 19, className, children, type = "button", ...props }: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn("relative grid size-9 shrink-0 place-items-center rounded-md transition-colors disabled:pointer-events-none disabled:opacity-50", variants[variant], className)}
      {...props}
    >
      <Icon name={icon} size={iconSize} />
      {children}
    </button>
  );
}
