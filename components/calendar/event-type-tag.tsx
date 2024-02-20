import { EventType } from "@/library/calendar/types";
import { ToggleableButton } from "../ui/toggleable-button";

type EventTypeTagProps = {
  eventType: EventType;
  enabled: boolean;
  onClick: (key: string, isEnabled: boolean) => void;
};

export function EventTypeTag({
  eventType,
  enabled,
  onClick,
}: EventTypeTagProps) {
  return (
    <ToggleableButton
      text={eventType.filterText}
      enabled={enabled}
      variant={eventType.color}
      state={enabled ? "enabled" : "disabled"}
      onClick={() => onClick(eventType.typeName, !enabled)}
    />
  );
}
