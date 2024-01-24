import React, { memo } from 'react';

import assets from '../../assets/assets';

import './monthSelector.css';

const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

function MonthSelectorComponent({ currentMonth, currentYear, changeCurrentMonth, setCurrentDate }) {
    return <div className='month-selector-container'>
        <img src={assets.leftArrow} alt='Left arrow' width='20' height='20' className='month-selector-left-arrow' onClick={() => {
            changeCurrentMonth(false);
            setCurrentDate(-1);
        }} />
        <div className='current-month-current-year'>{months[currentMonth]} {currentYear}</div>
        <img src={assets.rightArrow} alt='Right arrow' width='20' height='20' className='month-selector-right-arrow' onClick={() => {
            changeCurrentMonth(true);
            setCurrentDate(-1);
        }} />
    </div>
}

const MonthSelector = memo(MonthSelectorComponent);

export default MonthSelector;