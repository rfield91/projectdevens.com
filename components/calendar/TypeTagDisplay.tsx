import { TypeTagDisplayProps } from "../../common/types";

const TypeTagDisplay = ({ eventType }: TypeTagDisplayProps) => {
    if (eventType === undefined) return <span></span>;

    const color = `${eventType.enabledColor}`;

    return (
        <span
            className={
                color + " rounded-full text-xs p-2 text-center text-white"
            }
        >
            {eventType.labelText}
        </span>
    );
};

export default TypeTagDisplay;
