import type { ReactNode } from "react";
import { cn } from "./cn";

type ListRowProps = {
  leading?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  meta?: ReactNode;
  trailing?: ReactNode;
  className?: string;
  id?: string;
};

/** One row of a list. Wrap rows in a parent with `divide-y divide-divider`. */
export default function ListRow({ leading, title, subtitle, meta, trailing, className, id }: ListRowProps) {
  return (
    <div id={id} className={cn("flex items-center gap-3.5 py-4", className)}>
      {leading}
      <div className="grid min-w-0 flex-1 gap-1">
        <strong className="text-sm font-semibold">{title}</strong>
        {subtitle && <small className="text-2xs text-subtle">{subtitle}</small>}
      </div>
      {meta && <span className="text-2xs text-subtle max-sm:hidden">{meta}</span>}
      {trailing}
    </div>
  );
}
