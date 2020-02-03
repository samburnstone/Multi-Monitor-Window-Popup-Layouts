import uuid from 'uuid/v4';

let id;

const sharedWorker = require('sharedworker-loader!./message-bus')();
sharedWorker.port.onmessage = ({ data }) => {
  if (data.type === 'F3DC/layout' && data.payload.id === id) {
    const { x, y, width, height } = data.payload.layout;
    resizeTo(width, height);
    moveTo(x, y); // Need to move after resizing, otherwise y will always be 0 for some reason!
  }
};

// Can't resize the document straight away - waiting until this event fires seems to work
document.addEventListener('DOMContentLoaded', () => {
  id = uuid();
  sharedWorker.port.postMessage({
    type: 'F3DC/POPUP_HELLO',
    payload: id
  });
});