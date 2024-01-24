import React from 'react';

import Calendar from '../calendar';
import Appointment from '../appointment';
import BottomPanel from '../bottomPanel';

import './index.css';

function Container({ currentDate, currentMonth, currentYear, currentInterval, intervalTypes, availableSlotIntervals, setCurrentInterval, changeCurrentMonth, setCurrentDate }) {
    return (
        <div className='container'>
            <div className='top-container'>
                <Calendar
                    currentDate={currentDate}
                    currentMonth={currentMonth}
                    currentYear={currentYear}
                    changeCurrentMonth={changeCurrentMonth}
                    setCurrentDate={setCurrentDate}
                />
                <Appointment
                    currentDate={currentDate}
                    currentMonth={currentMonth}
                    currentYear={currentYear}
                    intervalTypes={intervalTypes}
                    availableSlotIntervals={availableSlotIntervals}
                    currentInterval={currentInterval}
                    setCurrentInterval={setCurrentInterval}
                />
            </div>
            <BottomPanel />
        </div>
    );
}

export default Container;