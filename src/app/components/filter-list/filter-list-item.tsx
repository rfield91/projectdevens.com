import { FilterListItemDetails } from "@/app/components/filter-list/types";
import { ToggleableButton } from "@/app/components/toggleable-button";

type FilterItemProps = {
  item: FilterListItemDetails;
  onClick: () => void;
};

export const FilterListItem = ({ item, onClick }: FilterItemProps) => {
  return (
    <ToggleableButton
      text={item.name}
      enabled={item.enabled}
      state={item.enabled ? "enabled" : "disabled"}
      variant={"default"}
      onClick={() => onClick()}
    />
  );
};
