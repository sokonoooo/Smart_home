import type { ButtonHTMLAttributes } from "react";
import { cn } from "./cn";
import Icon, { type IconName } from "./Icon";

export type ButtonVariant = "primary" | "outline" | "ghost" | "link";
export type ButtonSize = "sm" | "md";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  iconRight?: IconName;
};

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand text-on-brand hover:bg-brand-strong",
  outline: "border border-border-strong bg-surface-muted text-fg hover:bg-surface-sunken",
  ghost: "text-muted hover:bg-surface-sunken hover:text-fg",
  link: "text-brand-text hover:underline underline-offset-4",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-xs",
  md: "px-4 py-2.5 text-base",
};

export default function Button({ variant = "outline", size = "md", icon, iconRight, className, children, type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        variant === "link" ? "text-sm" : sizes[size],
        className,
      )}
      {...props}
    >
      {icon && <Icon name={icon} size={size === "sm" ? 16 : 18} />}
      {children}
      {iconRight && <Icon name={iconRight} size={16} />}
    </button>
  );
}
