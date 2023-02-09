import { TagProps } from "../../common/types";

const Tag = ({ tag, filterState, handleOnClick }: TagProps) => {
    const handleToggle = () => {
        filterState.isEnabled = !filterState.isEnabled;
        handleOnClick(filterState);
    };

    const color = filterState.isEnabled ? tag.enabledColor : tag.disabledColor;

    return (
        <span
            className={`rounded-full text-xs p-2 text-center text-white m-1 ${color}`}
            onClick={handleToggle}
        >
            {tag.filterText}
        </span>
    );
};

export default Tag;
