import { cn } from "@/utils/cn";
import { VariantProps, cva } from "class-variance-authority";

const toggleableButtonVariants = cva(
  "m-1 cursor-pointer select-none rounded-full border-2 border-solid p-2 text-center text-xs  hover:brightness-90 text-nowrap",
  {
    variants: {
      variant: {
        default: "border-slate-500 bg-slate-500",
        orange: "border-orange-500 bg-orange-500",
        blue: "border-blue-500 bg-blue-500",
        purple: "border-purple-500 bg-purple-500",
      },
      state: {
        enabled: ["text-white"],
        disabled: ["text-black", "bg-opacity-30"],
      },
    },
  }
);

type ToggleableButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof toggleableButtonVariants> & {
    text: string;
    enabled: boolean;
  };

export function ToggleableButton({
  text,
  enabled,
  variant,
  state,
  ...props
}: ToggleableButtonProps) {
  return (
    <button
      className={cn(toggleableButtonVariants({ variant, state }))}
      role="checkbox"
      aria-checked={enabled}
      {...props}
    >
      {text}
    </button>
  );
}
