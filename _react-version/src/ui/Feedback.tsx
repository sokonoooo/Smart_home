import type { ReactNode } from "react";
import Card from "./Card";
import { cn } from "./cn";
import Icon, { type IconName } from "./Icon";

type BannerProps = { icon: IconName; title: string; description: string; action?: ReactNode; className?: string };

/** Highlighted message with an optional call to action. */
export function Banner({ icon, title, description, action, className }: BannerProps) {
  return (
    <Card tone="accent" padding="none" className={cn("grid grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-4 max-sm:grid-cols-[auto_1fr]", className)}>
      <span className="text-brand-text"><Icon name={icon} size={24} /></span>
      <div className="grid gap-1">
        <strong className="text-sm">{title}</strong>
        <p className="text-2xs text-muted">{description}</p>
      </div>
      {action && <div className="max-sm:col-span-full max-sm:*:w-full">{action}</div>}
    </Card>
  );
}

/** Placeholder shown when a list has nothing in it. */
export function EmptyState({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("col-span-full grid min-h-40 place-items-center rounded-lg border border-dashed border-border-strong p-4 text-center text-sm text-subtle", className)}>{children}</div>;
}

/** Temporary notification in the corner of the screen. */
export function Toast({ message }: { message: string }) {
  return (
    <div role="status" className="fixed right-6 bottom-6 z-30 flex animate-toast-in items-center gap-2.5 rounded-md bg-surface-inverse px-4 py-3 text-sm text-on-inverse shadow-pop max-md:right-4 max-md:bottom-20 max-md:left-4 max-md:justify-center">
      <Icon name="sparkles" size={18} />
      {message}
    </div>
  );
}
