import * as React from "react";
import { cn } from "@/lib/utils";

export interface MagicInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string;
}

const MagicInput = React.forwardRef<HTMLInputElement, MagicInputProps>(
  ({ className, wrapperClassName, type, ...props }, ref) => {
    return (
      <div className={cn("group relative", wrapperClassName)}>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input/50 bg-background px-3 py-2 text-sm",
            "placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
            "transition-all duration-200 ease-in-out",
            "focus:outline-none focus:border-transparent",
            "relative z-10",
            className
          )}
          ref={ref}
          {...props}
        />
        <div className="absolute inset-0 rounded-md bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-40 group-focus-within:opacity-100 -z-10"></div>
        <div className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 -z-10"></div>
      </div>
    );
  }
);

MagicInput.displayName = "MagicInput";

export { MagicInput };
