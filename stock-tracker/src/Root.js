import React from 'react';

const requestPopupOpen = () => window.postMessage({
  type: '3FDC_OPEN_POPUP',
  payload: { name: 'StockTracker' }
})

export default () => (
  <div>
    <p>Hello</p>
    <button onClick={requestPopupOpen}>
      Open pop up
    </button>
  </div>
);
