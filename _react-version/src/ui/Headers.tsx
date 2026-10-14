import type { ReactNode } from "react";
import { cn } from "./cn";
import Eyebrow from "./Eyebrow";

type PageHeaderProps = { eyebrow: string; title: string; description: string; action?: ReactNode };

/** Top-of-page title block. */
export function PageHeader({ eyebrow, title, description, action }: PageHeaderProps) {
  return (
    <section className="mb-8 flex items-end justify-between gap-5 max-sm:mb-7 max-sm:flex-col max-sm:items-start">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-2 mb-1.5 font-display text-2xl font-semibold tracking-[-0.04em] md:text-3xl">{title}</h1>
        <p className="text-md text-muted">{description}</p>
      </div>
      {action}
    </section>
  );
}

type SectionHeaderProps = { title: ReactNode; subtitle?: ReactNode; action?: ReactNode; className?: string };

/** Heading above a group of cards. */
export function SectionHeader({ title, subtitle, action, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-4 flex items-end justify-between gap-4", className)}>
      <div>
        <h2 className="font-display text-lg font-semibold tracking-tight">{title}</h2>
        {subtitle && <p className="mt-0.5 text-xs text-subtle">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
