import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const toggleableButtonVariants = cva(
  "text-nowrap border-2 cursor-pointer text-black select-none tracking-wider rounded-full shadow-lg font-bold p-1.5 text-center text-xs transition-all ease-in-out",
  {
    variants: {
      variant: {
        default: "border-white bg-white",
        orange: "border-orange-500 bg-orange-500",
        blue: "border-blue-500 bg-blue-500",
        purple: "border-purple-500 bg-purple-500",
      },
      state: {
        enabled: [
          "text-zinc-100 bg-red-700 border-red-700 hover:bg-red-600 hover:border-red-700",
        ],
        disabled: [
          "text-zinc-400 bg-zinc-700 border-zinc-700 hover:bg-zinc-600 hover:border-zinc-700",
        ],
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
