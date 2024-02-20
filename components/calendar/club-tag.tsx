import { Club } from "@/library/calendar/types";
import { ToggleableButton } from "../ui/toggleable-button";

type ClubTagProps = {
  club: Club;
  enabled: boolean;
  onClick: (key: string, isEnabled: boolean) => void;
};

export function ClubTag({ club, enabled, onClick }: ClubTagProps) {
  return (
    <ToggleableButton
      text={club.name}
      enabled={enabled}
      variant="default"
      state={enabled ? "enabled" : "disabled"}
      onClick={() => onClick(club.clubId, !enabled)}
    />
  );
}
