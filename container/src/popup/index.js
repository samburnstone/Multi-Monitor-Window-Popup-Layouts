import uuid from 'uuid/v4';
import MessageBusWorker from '../message-bus/message-bus.worker';
import { createHelloMessage, MESSAGE_TYPES } from '../message-bus/message-factory';

let id;

const sharedWorker = MessageBusWorker();

sharedWorker.port.onmessage = ({ data }) => {
  if (data.type === MESSAGE_TYPES.POPUP_INIT_LAYOUT && data.payload.id === id) {
    const { x, y, width, height } = data.payload.layout;
    resizeTo(width, height);
    moveTo(x, y); // Need to move after resizing, otherwise y will always be 0 for some reason!
  }
};

// Can't resize the document straight away - waiting until this event fires seems to work
document.addEventListener('DOMContentLoaded', () => {
  id = uuid();
  sharedWorker.port.postMessage(createHelloMessage(id));
});