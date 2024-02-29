import { daysOfWeek } from "@/utils/daysOfWeek";
import getOrdinalNum from "@/utils/get-ordinal-number";
import { monthNames } from "@/utils/months";

type DateDisplayProps = {
  startDate: Date;
  endDate: Date;
};

export function DateDisplay({ startDate, endDate }: DateDisplayProps) {
  const isEndDateDifferent = startDate.getTime() != endDate.getTime();

  if (isEndDateDifferent) {
    return (
      <div className="h-full w-full bg-slate-600 py-4 text-center text-xs text-white">
        <div>
          {daysOfWeek[startDate.getDay()].substring(0, 3).toUpperCase()}{" "}
          {monthNames[startDate.getMonth()]?.substring(0, 3).toUpperCase()}{" "}
          {getOrdinalNum(startDate.getDate())}
        </div>
        <div>-</div>
        <div>
          {daysOfWeek[endDate.getDay()].substring(0, 3).toUpperCase()}{" "}
          {monthNames[endDate.getMonth()]?.substring(0, 3).toUpperCase()}{" "}
          {getOrdinalNum(endDate.getDate())}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-slate-600 py-4 text-center text-xs text-white">
      <div>{daysOfWeek[startDate.getDay()].substring(0, 3).toUpperCase()}</div>
      <div>
        {monthNames[startDate.getMonth()]?.substring(0, 3).toUpperCase()}{" "}
        {getOrdinalNum(startDate.getDate())}
      </div>
    </div>
  );
}
