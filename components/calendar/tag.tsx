import { EventType } from "@/library/calendar/types";
import { cn } from "@/utils/cn";
import { VariantProps, cva } from "class-variance-authority";

type TagProps = {
  eventType: EventType;
  enabled: boolean;
  onClick: (key: string, isEnabled: boolean) => void;
};

const Tag = ({ eventType, enabled, onClick }: TagProps) => {
  const variant = `${eventType.color}${
    enabled ? "" : "Disabled"
  }` as ToggleableButtonVariantsOptions;

  return (
    <ToggleableButton
      text={eventType.filterText}
      enabled={enabled}
      variant={variant}
      onClick={() => onClick(eventType.typeName, !enabled)}
    />
  );
};

const toggleableButtonVariants = cva(
  "m-1 cursor-pointer select-none rounded-full border-2 border-solid p-2 text-center text-xs  hover:brightness-90",
  {
    variants: {
      variant: {
        orange: "border-orange-500 bg-orange-500 text-white",
        orangeDisabled: "text-black border-orange-500 bg-slate-100",
        blue: "border-blue-500 bg-blue-500",
        blueDisabled: "text-black border-blue-500 bg-slate-100",
        purple: "border-purple-500 bg-purple-500",
        purpleDisabled: "text-black border-purple-500 bg-slate-100",
      },
    },
  }
);

type ToggleableButtonVariantsOptions = VariantProps<
  typeof toggleableButtonVariants
>;

type ToggleableButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof toggleableButtonVariants> & {
    text: string;
    enabled: boolean;
  };

const ToggleableButton = ({
  text,
  enabled,
  variant,
  ...props
}: ToggleableButtonProps) => {
  return (
    <button
      className={cn(toggleableButtonVariants({ variant }))}
      role="checkbox"
      aria-checked={enabled}
      {...props}
    >
      {text}
    </button>
  );
};

export default Tag;
