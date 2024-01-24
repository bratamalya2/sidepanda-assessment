import React, { useState, useEffect } from 'react';

import Container from './components/container';

import assets from './assets/assets';

import './App.css';

function App() {
  const [slotDetails, setSlotDetails] = useState([]);
  const [currentDate, setCurrentDate] = useState((new Date()).getDate());
  const [currentMonth, setCurrentMonth] = useState((new Date()).getMonth());
  const [currentYear, setCurrentYear] = useState((new Date()).getFullYear());
  const [intervalTypes, setIntervalTypes] = useState([]);
  const [currentInterval, setCurrentInterval] = useState(-1);
  const [availableSlotIntervals, setAvailableSlotIntervals] = useState([]);

  const fetchSlotDetails = async () => {
    try {
      const x = await fetch('https://app.appointo.me/scripttag/mock_timeslots?start_date=2024-01-20&end_date=2024-01-30');
      let y = await x.json();
      y = y.map(obj => {
        return {
          date: new Date(obj.date),
          slots: obj.slots.map(slot => {
            return {
              start_time: new Date(slot.start_time),
              end_time: new Date(slot.end_time)
            };
          })
        };
      });
      setSlotDetails(y);
    }
    catch (err) {
      console.log(err);
    }
  };

  const setAvailableSlots = (currentDate) => {
    const d = currentDate.getDate();
    const m = currentDate.getMonth();
    const y = currentDate.getFullYear();
    if (slotDetails.length === 0)
      setAvailableSlotIntervals([]);
    else {
      const x = slotDetails.find(obj => {
        const d2 = obj.date.getDate();
        const m2 = obj.date.getMonth();
        const y2 = obj.date.getFullYear();
        return d === d2 && m === m2 && y === y2;
      });
      if (x === undefined) {
        setAvailableSlotIntervals([]);
        return;
      }
      x.slots = x.slots.map(slot => ({
        start_time: slot.start_time,
        end_time: slot.end_time,
        interval: (slot.end_time - slot.start_time) / (1000 * 60)
      }));
      setAvailableSlotIntervals(x.slots);
    }
  };

  const setAllIntervalVariants = (slotArr) => {
    const intervalVariants = [];
    slotArr.forEach((slot) => {
      const x = (slot.end_time - slot.start_time) / (1000 * 60);
      if (!intervalVariants.includes(x))
        intervalVariants.push(x);
    });
    setIntervalTypes(intervalVariants);
  };

  const changeCurrentMonth = (increase) => {
    if (increase) {
      if (currentMonth === 11)
        setCurrentYear(curr => {
          return (curr + 1);
        });
      setCurrentMonth(curr => {
        let x = curr + 1;
        if (x > 11) {
          x = x - 12;
        }
        return x;
      });
    }
    else {
      if (currentMonth === 0) {
        setCurrentYear(currentYear - 1);
      }
      setCurrentMonth(curr => {
        let x = curr - 1;
        if (x < 0) {
          x = x + 12;
        }
        return x;
      });
    }
  };

  useEffect(() => {
    fetchSlotDetails();
  }, []);

  useEffect(() => {
    console.log(slotDetails);
    setAvailableSlots(new Date(currentYear, currentMonth, currentDate));
  }, [slotDetails, currentDate, currentMonth, currentYear]);

  useEffect(() => {
    setAllIntervalVariants(availableSlotIntervals);
  }, [availableSlotIntervals]);

  useEffect(() => {
    console.log(availableSlotIntervals);
  }, [availableSlotIntervals]);

  return (
    <div className='App'>
      <Container
        currentDate={currentDate}
        currentMonth={currentMonth}
        currentYear={currentYear}
        intervalTypes={intervalTypes}
        availableSlotIntervals={availableSlotIntervals}
        currentInterval={currentInterval}
        setCurrentDate={setCurrentDate}
        setCurrentInterval={setCurrentInterval}
        changeCurrentMonth={changeCurrentMonth}
      />
      <img src={assets.leftBand1} alt='Left band 1' className='left-band-1' />
      <img src={assets.leftBand2} alt='Left band 2' className='left-band-2' />
      <img src={assets.rightBand1} alt='Left band 2' className='right-band-1' />
      <img src={assets.rightBand2} alt='Left band 2' className='right-band-2' />
      <img src={assets.rightBand3} alt='Left band 2' className='right-band-3' />
    </div>
  );
}

export default App;
