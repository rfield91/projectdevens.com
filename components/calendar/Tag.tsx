import { TagProps } from "../../common/types";

const Tag = ({ tag, filterState, handleOnClick }: TagProps) => {
    const handleToggle = () => {
        filterState.isEnabled = !filterState.isEnabled;
        handleOnClick(filterState);
    };

    const classes = filterState.isEnabled
        ? `rounded-full cursor-pointer text-xs p-2 text-center text-white m-1 border-solid border-2 border-${tag.color}-500 bg-${tag.color}-500`
        : `rounded-full cursor-pointer text-xs p-2 text-center text-black m-1 border-solid border-2 border-${tag.color}-300 bg-slate-100`;

    return (
        <span className={classes} onClick={handleToggle}>
            {tag.filterText}
        </span>
    );
};

export default Tag;
