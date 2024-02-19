import getOrdinalNum from "@/utils/get-ordinal-number";
import { monthNames } from "@/utils/months";

type DateDisplayProps = {
  startDate: Date;
  endDate: Date;
};

export function DateDisplay({ startDate, endDate }: DateDisplayProps) {
  return (
    <div className="h-full w-full bg-slate-600 py-4 text-center text-xl text-white">
      <div>
        {monthNames[startDate.getMonth()]?.substring(0, 3).toUpperCase()}
      </div>
      <div>{getOrdinalNum(startDate.getDate())}</div>
    </div>
  );
}
