import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const toggleableButtonVariants = cva(
  "text-nowrap border-2 cursor-pointer select-none rounded-full shadow-lg font-semibold p-1.5 text-center text-xs transition-all ease-in-out duration-500",
  {
    variants: {
      state: {
        enabled: [
          "text-white bg-red-700 border-red-700 hover:bg-red-600 hover:border-red-700",
        ],
        disabled: [
          "bg-white dark:bg-neutral-800 dark:border-neutral-700 border-neutral-300 hover:brightness-90",
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
  state,
  ...props
}: ToggleableButtonProps) {
  return (
    <button
      className={cn(toggleableButtonVariants({ state }))}
      role="checkbox"
      aria-checked={enabled}
      {...props}
    >
      {text}
    </button>
  );
}
