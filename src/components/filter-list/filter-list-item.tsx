import { FilterListItemDetails } from "@/components/filter-list/filter-list";
import { ToggleableButton } from "@/components/toggleable-button/toggleable-button";

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
      onClick={() => onClick()}
    />
  );
};
