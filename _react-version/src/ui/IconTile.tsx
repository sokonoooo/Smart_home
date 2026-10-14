import { cn } from "./cn";
import Icon, { type IconName } from "./Icon";

export type IconTileSize = "sm" | "md" | "lg";
export type IconTileTone = "brand" | "neutral" | "solid" | "inverse";

const sizes: Record<IconTileSize, { box: string; icon: number }> = {
  sm: { box: "size-8 rounded-md", icon: 16 },
  md: { box: "size-10 rounded-lg", icon: 20 },
  lg: { box: "size-11 rounded-lg", icon: 22 },
};

const tones: Record<IconTileTone, string> = {
  brand: "bg-brand-soft text-brand-text",
  neutral: "bg-surface-sunken text-subtle",
  solid: "bg-brand text-on-brand",
  inverse: "bg-on-inverse/10 text-on-inverse",
};

/** An icon inside a soft rounded square. */
export default function IconTile({ icon, size = "md", tone = "brand", className }: { icon: IconName; size?: IconTileSize; tone?: IconTileTone; className?: string }) {
  return (
    <span className={cn("grid shrink-0 place-items-center transition-colors", sizes[size].box, tones[tone], className)}>
      <Icon name={icon} size={sizes[size].icon} />
    </span>
  );
}
