import React, { useEffect, useState } from 'react';
import './Output.less';

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
                <div className='class-result' key={paxClass.Name}>
                    <div className='class-name'>{paxClass.Name}</div>
                    <div className='time'>{timeToBeat}</div>
                </div>
            );
        }

        categories.push(
            <div className='category' key={category}>
                <div className='category-name'>{category}</div>
                <div className='classes'>{classes}</div>
            </div>
        );
    }

    return (
        <div className='output'>
            <div className='categories'>{categories}</div>
        </div>
    );
};

export default Output;
