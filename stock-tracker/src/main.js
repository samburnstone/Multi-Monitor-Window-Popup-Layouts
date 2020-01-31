import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';

window.mountStockTracker = containerElementId => ReactDOM.render(<Root />, document.getElementById(containerElementId));