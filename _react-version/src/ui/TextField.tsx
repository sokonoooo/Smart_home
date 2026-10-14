import type { InputHTMLAttributes, Ref } from "react";
import { cn } from "./cn";
import Icon, { type IconName } from "./Icon";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & { icon?: IconName; ref?: Ref<HTMLInputElement>; wrapperClassName?: string };

/** Text input with an optional leading icon. */
export default function TextField({ icon, className, wrapperClassName, ref, ...props }: TextFieldProps) {
  return (
    <label className={cn("flex items-center gap-2.5 rounded-md border border-border-strong bg-surface-muted px-3.5 py-2.5 text-subtle transition-colors focus-within:border-brand", wrapperClassName)}>
      {icon && <Icon name={icon} size={18} />}
      <input ref={ref} className={cn("w-full min-w-0 bg-transparent text-base text-fg outline-none placeholder:text-subtle focus-visible:outline-none", className)} {...props} />
    </label>
  );
}
