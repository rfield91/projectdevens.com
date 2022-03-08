import React, { useEffect, useState, Fragment } from 'react';
import Calculator from './Calculator';
import Output from './Output';
import './PaxCalculator.less';
const paxValuesJson = require('../../data/paxvalues.json');

const PaxCalculator = () => {
    const [paxValues] = useState(paxValuesJson);
    const [time, setTime] = useState(0);
    const [selectedClass, setSelectedClass] = useState('');

    const updateTime = (updatedTime) => {
        setTime(updatedTime);
    };

    const updateClass = (updatedClass) => {
        setSelectedClass(updatedClass);
    };

    return (
        <Fragment>
            <Calculator
                paxValues={paxValues}
                updateTime={updateTime}
                updateClass={updateClass}
            />
            <Output
                paxValues={paxValues}
                time={time}
                selectedClass={selectedClass}
            />
        </Fragment>
    );
};

export default PaxCalculator;
