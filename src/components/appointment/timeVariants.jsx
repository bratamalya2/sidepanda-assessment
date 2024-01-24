import React, { useState, useEffect } from 'react';

import './timeVariants.css';

function TimeVariants({ intervalTypes, setCurrentInterval }) {
    const [currentVariant, setCurrentVariant] = useState(-1);

    useEffect(() => {
        if (currentVariant !== -1)
            setCurrentInterval(currentVariant);
    }, [currentVariant, setCurrentInterval]);

    useEffect(() => {
        if (intervalTypes.length > 0) {
            setCurrentVariant(intervalTypes[0]);
        }
    }, [intervalTypes]);

    return <div>
        <div className='time-variants-text'>select from variants</div>
        <select className='time-variants-select' id='time-variant-select-tag' name='time-variant' value={currentVariant} onChange={e => setCurrentVariant(e.target.value)}>
            {intervalTypes.map((slot, i) => {
                return <option key={i} className='time-variants-option' value={slot}>{slot} min</option>;
            })}
        </select>
        <hr className='time-variant-line-break' />
    </div>
}

export default TimeVariants;