"use client";
import { FilterListItem } from "@/components/filter-list/filter-list-item";
import { FilterListItemDetails } from "@/components/filter-list/types";

export type FilterListProps = {
  items: FilterListItemDetails[];
  onSelectedItemChange: (updatedItem: FilterListItemDetails) => void;
};

export const FilterList = ({
  items,
  onSelectedItemChange,
}: FilterListProps) => {
  const handleChangeItem = (item: {
    id: string;
    name: string;
    enabled: boolean;
  }) => {
    onSelectedItemChange({ ...item, enabled: !item.enabled });
  };

  return (
    <div className="flex justify-center flex-wrap gap-4">
      {items.map((item) => (
        <FilterListItem
          key={item.id}
          item={item}
          onClick={() => handleChangeItem(item)}
        />
      ))}
    </div>
  );
};
