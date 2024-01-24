import React, { useEffect, useState } from 'react';

import assets from '../../assets/assets';

import './availableSlots.css';

const weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

function AvailableSlots({ currentDate, currentMonth, currentYear, availableSlotIntervals, currentInterval }) {
    const [currentDateStr, setCurrentDateStr] = useState('');
    const [currentMonthStr, setCurrentMonthStr] = useState('');
    const [currentDayStr, setCurrentDayStr] = useState('');
    const [formattedSlots, setFormattedSlots] = useState([]);
    const [currentSelectedIndex, setCurrentSelectedIndex] = useState(-1);

    const formatTimeSlot = (d1, d2) => {
        let h1 = d1.getHours();
        let h2 = d2.getHours();
        const m1 = d1.getMinutes();
        const m2 = d2.getMinutes();
        const isAM1 = h1 >= 12 ? true : false;
        const isAM2 = h2 >= 12 ? true : false;
        if (isAM1)
            h1 = h1 - 12;
        if (isAM2)
            h2 = h2 - 12;
        if (h1 < 10)
            h1 = `0${h1}`;
        if (h2 < 10)
            h2 = `0${h2}`;
        return `${h1}:${m1} ${isAM1 ? 'AM' : 'PM'} - ${h2}:${m2} ${isAM2 ? 'AM' : 'PM'}`;
    };

    useEffect(() => {
        setCurrentSelectedIndex(-1);
        const x = new Date(currentYear, currentMonth, currentDate);
        const y = x.getDate().toString();
        setCurrentDateStr(y);
        setCurrentMonthStr(months[x.getMonth()]);
        setCurrentDayStr(weekDays[x.getDay()]);
    }, [currentDate, currentMonth, currentYear]);

    useEffect(() => {
        setCurrentSelectedIndex(-1);
        setFormattedSlots(availableSlotIntervals
            .filter(slotObj => slotObj.interval === currentInterval)
            .map(slotObj => formatTimeSlot(slotObj.start_time, slotObj.end_time))
        );
    }, [availableSlotIntervals, currentInterval]);

    return (
        <div>
            <div className='available-slots-headline'>{currentDayStr}, {currentMonthStr} {currentDateStr} - available slots</div>
            {formattedSlots.length > 0 ? (
                <div>{formattedSlots.map((slotStr, i) => {
                    if (i === currentSelectedIndex)
                        return <div key={i} className='available-slot available-slot-selected'>
                            {slotStr}
                            <img src={assets.circleCheck} alt='circle-check' />
                        </div>;
                    else
                        return <div key={i} className='available-slot' onClick={() => setCurrentSelectedIndex(i)}>{slotStr}</div>;
                })}</div>
            ) : (
                <div className='no-slots-availalbe-text'>
                    No slots available
                </div>
            )}
        </div>
    );
}

export default AvailableSlots;