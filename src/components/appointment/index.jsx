import React from 'react';

import TimeVariants from './timeVariants';
import AvailableSlots from './availableSlots';

import './index.css';

function Appointment({ currentDate, currentMonth, currentYear, intervalTypes, availableSlotIntervals, currentInterval, setCurrentInterval }) {
    return <div className='appointment-container'>
        <TimeVariants
            intervalTypes={intervalTypes}
            setCurrentInterval={setCurrentInterval}
        />
        <AvailableSlots
            currentDate={currentDate}
            currentMonth={currentMonth}
            currentYear={currentYear}
            availableSlotIntervals={availableSlotIntervals}
            currentInterval={currentInterval}
        />
    </div>;
}

export default Appointment;