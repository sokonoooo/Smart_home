import { cn } from "./cn";

type BarChartProps = {
  values: number[];
  label: string;
  /** Which bars to draw in the strong color, e.g. the most recent ones. */
  highlight?: (index: number) => boolean;
  size?: "sm" | "lg";
  className?: string;
};

/** Simple bar chart. `values` are percentages of the chart height (0–100). */
export function BarChart({ values, label, highlight = () => false, size = "lg", className }: BarChartProps) {
  return (
    <div role="img" aria-label={label} className={cn("flex items-end border-b border-border", size === "sm" ? "mt-5 h-17 gap-[5px]" : "mt-4.5 h-45 gap-[5px] max-sm:h-36 max-sm:gap-[3px]", className)}>
      {values.map((value, index) => (
        <i key={index} className={cn("min-w-[3px] flex-1 rounded-t-[3px] transition-[height] duration-300", highlight(index) ? "bg-chart-strong" : "bg-chart")} style={{ height: `${value}%` }} />
      ))}
    </div>
  );
}

export function ChartAxis({ labels, className }: { labels: string[]; className?: string }) {
  return (
    <div className={cn("mt-2 flex justify-between text-2xs text-subtle", className)}>
      {labels.map((label) => <span key={label}>{label}</span>)}
    </div>
  );
}

/** Thin horizontal progress bar (0–100). */
export function ProgressBar({ value, label }: { value: number; label: string }) {
  return (
    <div role="progressbar" aria-label={label} aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} className="h-1 overflow-hidden rounded-full bg-surface-sunken">
      <div className="h-full rounded-full bg-chart-strong" style={{ width: `${value}%` }} />
    </div>
  );
}
