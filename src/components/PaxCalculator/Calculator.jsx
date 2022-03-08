import React, { useEffect, useState, useRef } from 'react';
import './Calculator.less';

const Calculator = (props) => {
    const [paxValues] = useState(props.paxValues);
    const [time, setTime] = useState('');
    const [selectedClass, setSelectedClass] = useState(
        paxValues['Street'][0].Pax
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
        timeInput.current.addEventListener('keyup', handleEnterPress);

        return () =>
            timeInput.current.removeEventListener('keyup', handleEnterPress);
    }, []);

    return (
        <div className='calculator'>
            <div className='inputs'>
                <div>
                    <input
                        ref={timeInput}
                        type='number'
                        step='.001'
                        placeholder='Your time'
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>
                <div>
                    <select
                        className='ui selection dropdown'
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                    >
                        {options}
                    </select>
                </div>
            </div>
            <div className='pax-time'>
                <h3>PAX Time</h3>
                <div className='paxed-time'>{paxTime}</div>
            </div>
        </div>
    );
};

export default Calculator;
