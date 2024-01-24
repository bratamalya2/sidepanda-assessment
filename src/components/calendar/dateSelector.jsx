import React, { useState, useEffect } from 'react';

import './dateSelector.css';

const maxMonths = [0, 2, 4, 6, 7, 9, 11]; //months with 31 days

function DateSelector({ currentDate, currentMonth, currentYear, setCurrentDate }) {
    const [dates, setDates] = useState([]);
    const [daysInCurrentMonth, setDaysInCurrentMonth] = useState(-1);
    const [prevMonth, setPrevMonth] = useState(-1);
    const [prevMonthYear, setPrevMonthYear] = useState(-1);
    const [startDate, setStartDate] = useState(-1);
    const [endDate, setEndDate] = useState(-1);
    const [prevMonthDays, setPrevMonthDays] = useState([]); //stores the dates which belong to prev month but shown in calendar
    const [nextMonthDays, setNextMonthDays] = useState([]); //stores the dates which belong to next month but shown in calendar

    const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 100 === 0 && year % 400 === 0);
    };

    const setPrevMonthDetails = () => {
        if (currentMonth === 0) {
            setPrevMonth(11);
            setPrevMonthYear(currentYear - 1);
        }
        else {
            setPrevMonth(currentMonth - 1);
            setPrevMonthYear(currentYear);
        }
    };

    const getNoOfDaysInPrevMonth = () => {
        if (isLeapYear(prevMonthYear) && prevMonth === 1)
            return 29;
        else if (!isLeapYear(prevMonthYear) && prevMonth === 1)
            return 28;
        else if (maxMonths.includes(prevMonth))
            return 31;
        else
            return 30;
    };

    useEffect(() => {
        setPrevMonthDetails();
    }, [currentMonth, currentYear]);

    useEffect(() => {
        const d1 = new Date(currentYear, currentMonth, 1);
        let day2;
        if (isLeapYear(currentYear) && currentMonth === 1)
            day2 = 29;
        else if (!isLeapYear(currentYear) && currentMonth === 1)
            day2 = 28;
        else if (maxMonths.includes(currentMonth))
            day2 = 31;
        else
            day2 = 30;
        setDaysInCurrentMonth(day2);
        const d2 = new Date(currentYear, currentMonth, day2);

        if (d1.getDay() > 0) {
            setStartDate(getNoOfDaysInPrevMonth() - d1.getDay() + 1);
        }
        else
            setStartDate(-1);
        if (d2.getDay() < 6) {
            setEndDate(6 - d2.getDay());
        }
        else
            setEndDate(-1);
    }, [prevMonth, prevMonthYear]);

    useEffect(() => {
        if (startDate > -1) {
            let arr = [];
            for (let i = startDate; i <= getNoOfDaysInPrevMonth(); i++)
                arr.push(i);
            setPrevMonthDays(arr);
        }
        else
            setPrevMonthDays([]);
    }, [startDate]);

    useEffect(() => {
        if (endDate > -1) {
            let arr = [];
            for (let i = 1; i <= endDate; i++)
                arr.push(i);
            setNextMonthDays(arr);
        }
        else
            setNextMonthDays([]);
    }, [endDate]);

    useEffect(() => {
        let i, j = 0, index = -1;
        const arr = [];
        for (i of prevMonthDays) {
            if (j % 7 === 0) {
                arr.push([]);
                index++;
            }
            arr[index].push({
                date: i,
                isDateFromCurrentMonth: false
            });
            j++;
        }
        for (i = 1; i <= daysInCurrentMonth; i++) {
            if (j % 7 === 0) {
                arr.push([]);
                index++;
            }
            arr[index].push({
                date: i,
                isDateFromCurrentMonth: true
            });
            j++;
        }
        for (i of nextMonthDays) {
            if (j % 7 === 0) {
                arr.push([]);
                index++;
            }
            arr[index].push({
                date: i,
                isDateFromCurrentMonth: false
            });
            j++;
        }
        setDates(arr);
    }, [prevMonthDays, nextMonthDays, daysInCurrentMonth]);

    return (
        <table className='date-table'>
            <thead>
                <tr className='date-table-heading-row'>
                    <th className='date-table-heading'>Sun</th>
                    <th className='date-table-heading'>Mon</th>
                    <th className='date-table-heading'>Tue</th>
                    <th className='date-table-heading'>Wed</th>
                    <th className='date-table-heading'>Thr</th>
                    <th className='date-table-heading'>Fri</th>
                    <th className='date-table-heading'>Sat</th>
                </tr>
            </thead>
            <tbody>
                {dates.map((arrOfDates, index) => (
                    <tr key={index} className='date-table-content-row'>
                        {arrOfDates.map((dateObj, i) => {
                            if (dateObj.isDateFromCurrentMonth && currentDate !== dateObj.date)
                                return <td key={i} className='date-table-date' onClick={() => {
                                    setCurrentDate(dateObj.date);
                                }}>{dateObj.date}</td>;
                            else if (dateObj.isDateFromCurrentMonth && currentDate === dateObj.date)
                                return <td key={i} className='date-table-date date-table-highlighted-date'>{dateObj.date}</td>;
                            else
                                return <td key={i} className='date-table-date date-table-noncurrent-date'>{dateObj.date}</td>;
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default DateSelector;