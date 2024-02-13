"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { PaxClass, PaxData } from "@/library/types/pax/types";
import { useEffect, useState } from "react";
import Calculator from "./calculator";
import Output from "./output";

type PaxCalculatorProps = {
  paxData: PaxData;
};

export default function PaxCalculator({ paxData }: PaxCalculatorProps) {
  const [time, setTime] = useState<number>();
  const [selectedClass, setSelectedClass] = useLocalStorage<PaxClass>(
    "selectedClass",
    paxData.Classes[0]
  );

  const handleInputChange = (newTime: number, newClass: PaxClass) => {
    setTime(newTime);
    setSelectedClass(newClass);
  };

  useEffect(() => {}, [time, selectedClass]);

  return (
    <div className="mb-36">
      <Calculator
        paxData={paxData}
        selectedClass={selectedClass}
        handleInputChange={handleInputChange}
      />
      <div className="text-center">
        {Number.isNaN(time) || time === undefined ? (
          <p>Enter a run time and select a class</p>
        ) : (
          <>
            <h3>PAX Time</h3>
            <div>{(time * selectedClass.Pax).toFixed(3)}</div>
          </>
        )}
      </div>
      <Output paxData={paxData} time={time} selectedClass={selectedClass} />
    </div>
  );
}
