import { PaxClass, PaxData } from "@/library/types/pax/types";
import ensure from "@/utils/ensure";
import { KeyboardEvent, forwardRef, useRef } from "react";

type CalculatorProps = {
  paxData: PaxData;
  selectedClass: PaxClass;
  handleInputChange: (newTime: number, newClass: PaxClass) => void;
};

const Calculator = ({
  paxData,
  selectedClass,
  handleInputChange,
}: CalculatorProps) => {
  const handleEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  const timeInput = useRef<HTMLInputElement>(null);
  const classSelect = useRef<HTMLSelectElement>(null);

  const onFilterChange = () => {
    const timeValue = timeInput.current?.value;
    const selectedClass = classSelect.current?.value;

    if (timeValue !== undefined && selectedClass !== undefined) {
      const matchedClass = ensure(
        paxData.Classes.find((c) => c.Name === selectedClass)
      );

      handleInputChange(parseFloat(timeValue), matchedClass);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 pb-4 pt-4">
        <TimeInput
          onKeyUp={handleEnterPress}
          onChange={onFilterChange}
          ref={timeInput}
        />
        <ClassSelect
          paxData={paxData}
          onChange={onFilterChange}
          value={selectedClass.Name}
          ref={classSelect}
        />
      </div>
    </div>
  );
};

type TimeInputProps = React.InputHTMLAttributes<HTMLInputElement> & {};

const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  function TimeInput({ ...props }: TimeInputProps, ref) {
    return (
      <input
        className="col-span-1 py-2.5 px-2 mx-4 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        type="number"
        step=".001"
        placeholder="Your time"
        autoFocus
        ref={ref}
        {...props}
      />
    );
  }
);

type ClassSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  paxData: PaxData;
};

const ClassSelect = forwardRef<HTMLSelectElement, ClassSelectProps>(
  function ClassSelect({ paxData, ...props }: ClassSelectProps, ref) {
    var classGroups = paxData.Classes.reduce((group, paxClass) => {
      const { Category } = paxClass;
      group[Category] = group[Category] ?? [];
      group[Category].push(paxClass);
      return group;
    }, {} as Record<string, PaxClass[]>);

    const options = Object.keys(classGroups).map((category) => {
      const optionItems = classGroups[category].map((c) => (
        <option key={c.Name} value={c.Name}>
          {c.Name}
        </option>
      ));

      return (
        <optgroup label={category} key={category}>
          {optionItems}
        </optgroup>
      );
    });

    return (
      <select
        className="col-span-1 py-2.5 px-2 mx-4 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        ref={ref}
        {...props}
      >
        {options}
      </select>
    );
  }
);

export default Calculator;
function DetailedHTMLProps<T, U>(
  arg0: (props: any, ref: any) => import("react").JSX.Element
) {
  throw new Error("Function not implemented.");
}
