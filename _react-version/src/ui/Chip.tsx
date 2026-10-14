import type { ButtonHTMLAttributes } from "react";
import { cn } from "./cn";

/** Pill-shaped button for quick suggestions. */
export default function Chip({ className, type = "button", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={cn(
        "rounded-full border border-border bg-surface px-3 py-1.5 text-xs whitespace-nowrap text-brand-text transition-colors hover:border-brand hover:bg-brand-softer disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
