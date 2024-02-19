import { EventType } from "@/library/calendar/types";
import { cn } from "@/utils/cn";
import { VariantProps, cva } from "class-variance-authority";

type TagProps = {
  eventType: EventType;
  enabled: boolean;
  onClick: (key: string, isEnabled: boolean) => void;
};

const Tag = ({ eventType, enabled, onClick }: TagProps) => {
  return (
    <ToggleableButton
      text={eventType.filterText}
      enabled={enabled}
      variant={eventType.color}
      state={enabled ? "enabled" : "disabled"}
      onClick={() => onClick(eventType.typeName, !enabled)}
    />
  );
};

const toggleableButtonVariants = cva(
  "m-1 cursor-pointer select-none rounded-full border-2 border-solid p-2 text-center text-xs  hover:brightness-90",
  {
    variants: {
      variant: {
        default: "",
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

const ToggleableButton = ({
  text,
  enabled,
  variant,
  state,
  ...props
}: ToggleableButtonProps) => {
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
};

export default Tag;
