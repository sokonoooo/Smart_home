import { cn } from "./cn";

const sizes = { sm: "size-[34px] text-2xs", lg: "size-14 font-display text-md" };
const tones = { neutral: "bg-avatar text-muted", brand: "bg-brand text-on-brand" };

/** Circle with a person's initials. */
export default function Avatar({ initials, size = "sm", tone = "neutral", className }: { initials: string; size?: keyof typeof sizes; tone?: keyof typeof tones; className?: string }) {
  return <span className={cn("grid shrink-0 place-items-center rounded-full font-semibold", sizes[size], tones[tone], className)}>{initials}</span>;
}
