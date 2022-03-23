import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/project_devens_logo.png';
import '../Home.less';
import './Calendar.less';
const eventDataJson = require('../../data/calendar.json');

const Calendar = () => {
    eventDataJson.forEach((ev) => {
        const date = new Date(ev.date);
        ev.parsedDate = date;
    });

    eventDataJson.sort((a, b) => {
        if (a.parsedDate < b.parsedDate) return -1;
        if (a.parsedDate > b.parsedDate) return 1;

        return 0;
    });

    const [events] = useState(eventDataJson);

    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const weekday = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    var calendar = [];

    var months = events.reduce((groups, ev) => {
        const month = monthNames[ev.parsedDate.getMonth()];
        const group = groups[month] || [];

        group.push(ev);
        groups[month] = group;

        return groups;
    }, {});

    for (const [month, evs] of Object.entries(months)) {
        const eventEntries = [];

        evs.forEach((ev, index) => {
            var el = (
                <div className='event' key={index}>
                    <div className='event-info'>
                        <div className='club'>{ev.club}</div>
                        <div className='name'>{ev.event}</div>
                    </div>
                    <div className='date'>
                        <div className='day-of-week'>
                            <div className='day'>{ev.parsedDate.getDate()}</div>
                            <div className='weekday'>
                                {weekday[ev.parsedDate.getDay()]}
                            </div>
                        </div>
                    </div>
                </div>
            );

            eventEntries.push(el);
        });

        const monthEvents = (
            <div className='month' key={month}>
                <h3>{month}</h3>
                <div className='events'>{eventEntries}</div>
            </div>
        );

        calendar.push(monthEvents);
    }

    return (
        <div>
            <div className='logo'>
                <Link to='/'>
                    <img src={logo} />
                </Link>
            </div>

            <nav>
                <ul>
                    <li>
                        <Link to='/paxcalculator'>PAX Calculator</Link>
                        <Link to='/calendar'>Calendar</Link>
                    </li>
                </ul>
            </nav>

            <div className='calendar'>{calendar}</div>
        </div>
    );
};

export default Calendar;
