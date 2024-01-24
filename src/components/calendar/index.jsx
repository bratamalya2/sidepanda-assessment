import React from 'react';

import MonthSelector from './monthSelector';
import DateSelector from './dateSelector';

import './index.css';

function Calendar({ currentDate, currentMonth, currentYear, changeCurrentMonth, setCurrentDate }) {
    return <div className='calendar-container'>
        <div className='calendar-text-1'>Test Service</div>
        <div className='calendar-text-2'>
            <span className='calendar-text-2-a'>Timezone:&nbsp;</span>
            <span className='calendar-text-2-b'>Timezone: Asia/Calcutta</span>
        </div>
        <div className='calendar-item'>
            <MonthSelector
                currentMonth={currentMonth}
                currentYear={currentYear}
                changeCurrentMonth={changeCurrentMonth}
                setCurrentDate={setCurrentDate}
            />
            <DateSelector
                currentDate={currentDate}
                currentMonth={currentMonth}
                currentYear={currentYear}
                setCurrentDate={setCurrentDate}
            />
        </div>
    </div>
}

export default Calendar;