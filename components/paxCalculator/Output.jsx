import React, { useEffect, useState } from "react";

const Output = ({ paxValues, time, selectedClass }) => {
    const [passedPaxValues] = useState(paxValues);
    const [passedTime, setPassedTime] = useState(time);
    const [passedClass, setPassedClass] = useState(selectedClass);

    useEffect(() => {
        setPassedTime(time);
    }, [time]);

    useEffect(() => {
        setPassedClass(selectedClass);
    }, [selectedClass]);

    var categories = [];

    for (var category in passedPaxValues) {
        var paxClasses = passedPaxValues[category];

        var classes = [];

        for (var i in paxClasses) {
            var paxClass = paxClasses[i];

            var timeToBeat = (
                (passedTime * passedClass) /
                paxClass.Pax
            ).toFixed(3);

            classes.push(
                <div className="grid grid-cols-2 pt-1" key={paxClass.Name}>
                    <div className="col-span-1">{paxClass.Name}</div>
                    <div className="col-span-1 text-right">{timeToBeat}</div>
                </div>
            );
        }

        categories.push(
            <div className="bg-white drop-shadow-md mx-3 my-4" key={category}>
                <div className="font-bold text-center text-xl py-2">
                    {category}
                </div>
                <div className="p-2">{classes}</div>
            </div>
        );
    }

    return <div>{categories}</div>;
};

export default Output;
