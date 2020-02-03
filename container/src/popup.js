const sharedWorker = require('sharedworker-loader!./message-bus')();
  sharedWorker.port.postMessage([10,10]);
  sharedWorker.port.onmessage = (e) => {
    console.log(e.data);
  }

// Can't resize the document straight away - waiting until this event fires seems to work
document.addEventListener('DOMContentLoaded', () => {
  resizeTo(200,200);
  moveTo(2500,300); // Need to move after resizing, otherwise y will always be 0 for some reason!
});