import getOrdinalNum from "~/utils/getOridnalNum";
import { monthNames } from "~/utils/months";

export interface DateDisplayProps {
    startDate: Date;
    endDate: Date;
}

const DateDisplay = ({ startDate, endDate }: DateDisplayProps) => {
    return (
        <div className="h-full w-full bg-slate-600 py-4 text-center text-xl text-white">
            <div>
                {monthNames[startDate.getMonth()]
                    ?.substring(0, 3)
                    .toUpperCase()}
            </div>
            <div>{getOrdinalNum(startDate.getDate())}</div>
        </div>
    );
};

export default DateDisplay;
