import React from 'react';

import assets from '../../assets/assets';

import './index.css';

function BottomPanel() {
    return <div className='bottom-panel-container'>
        <div className='bottom-panel-text'>Powered By <a href='https://apps.shopify.com/appointo-appointments-and-bookings' target='_blank' style={{
            textDecoration: 'underline',
            color: 'inherit'
        }}><span className='appointo text'>Appointo</span></a></div>
        <div className='bottom-panel-button'>Next <img src={assets.rightArrow} alt='right-arrow' /></div>
    </div>
}

export default BottomPanel;