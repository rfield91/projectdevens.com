import React, { useEffect, useState, useRef } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const Calculator = (props) => {
    const [paxValues] = useState(props.paxValues);
    const [time, setTime] = useState("");
    const [selectedClass, setSelectedClass] = useLocalStorage(
        "selectedClass",
        paxValues["Street"][0].Pax
    );
    const timeInput = useRef(null);

    var options = [];

    var paxTime = (time * selectedClass).toFixed(3);

    for (const category in paxValues) {
        var paxClasses = paxValues[category];

        var optionItems = [];

        for (const i in paxClasses) {
            var paxClass = paxClasses[i];

            optionItems.push(
                <option key={paxClass.Name} value={paxClass.Pax}>
                    {paxClass.Name}
                </option>
            );
        }

        options.push(
            <optgroup label={category} key={category}>
                {optionItems}
            </optgroup>
        );
    }

    useEffect(() => {
        props.updateTime(time);
        props.updateClass(selectedClass);
    }, [time, selectedClass]);

    const handleEnterPress = (e) => {
        if (e.keyCode === 13) {
            timeInput.current.blur();
        }
    };

    useEffect(() => {
        timeInput.current.focus();
        timeInput.current.addEventListener("keyup", handleEnterPress);
    }, []);

    return (
        <div>
            <div className="grid grid-cols-2 pb-4">
                <input
                    className="col-span-1 py-2.5 px-2 mx-4 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                    ref={timeInput}
                    type="number"
                    step=".001"
                    placeholder="Your time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
                <select
                    className="col-span-1 py-2.5 px-2 mx-4 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                >
                    {options}
                </select>
            </div>
            <div className="text-center">
                <h3>PAX Time</h3>
                <div>{paxTime}</div>
            </div>
        </div>
    );
};

export default Calculator;
