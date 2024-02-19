import { PaxClass, PaxData } from "@/library/pax/types";

type OutputProps = {
  paxData: PaxData;
  time: number | undefined;
  selectedClass: PaxClass;
};

export default function Output({ paxData, time, selectedClass }: OutputProps) {
  const isValidTime = time !== undefined && !Number.isNaN(time);

  if (!isValidTime) return <div></div>;

  var classGroups = paxData.Classes.reduce((group, paxClass) => {
    const { Category } = paxClass;
    group[Category] = group[Category] ?? [];
    group[Category].push(paxClass);
    return group;
  }, {} as Record<string, PaxClass[]>);

  const categories = Object.keys(classGroups).map((category) => {
    const classes = classGroups[category].map((c) => {
      var timeToBeat = ((time * selectedClass.Pax) / c.Pax).toFixed(3);

      return (
        <div
          className="flex border-b-2 border-b-slate-200 last:border-b-0 mx-4 justify-between py-1"
          key={c.Name}
        >
          <div className="font-medium">{c.Name}</div>
          <div className="text-right text-gray-700 font-mono">{timeToBeat}</div>
        </div>
      );
    });

    return (
      <div className="bg-white shadow mx-3 my-4 rounded-xl" key={category}>
        <div className="font-bold text-center text-xl py-2">{category}</div>
        <div className="p-2">{classes}</div>
      </div>
    );
  });

  return <div>{categories}</div>;
}
