import { IEventType } from "../../common/types";

export interface TypeTagDisplayProps {
    eventType: IEventType;
}

const TypeTagDisplay = ({ eventType }: TypeTagDisplayProps) => {
    if (eventType === undefined) return <span></span>;

    const classes = `bg-${eventType.color}-500 rounded-full text-xs p-2 text-center text-white`;

    return <span className={classes}>{eventType.labelText}</span>;
};

export default TypeTagDisplay;
