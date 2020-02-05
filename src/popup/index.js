import uuid from "uuid/v4";
import MessageBusWorker from "message-bus/message-bus.worker";
import {
  createHelloMessage,
  createPopupLayoutChangeMessage,
  MESSAGE_TYPES
} from "message-bus/message-factory";

let id;

const sharedWorker = MessageBusWorker();

sharedWorker.port.onmessage = ({ data }) => {
  if (data.type === MESSAGE_TYPES.POPUP_INIT_LAYOUT && data.payload.id === id) {
    const { x, y, width, height } = data.payload.layout;
    resizeTo(width, height);
    moveTo(x, y); // Need to move after resizing, otherwise y will always be 0 for some reason!
  }
  if (data.type === MESSAGE_TYPES.POPUP_DISMISS) {
    window.close();
  }
};

// Can't resize the document straight away - waiting until this event fires seems to work
document.addEventListener("DOMContentLoaded", () => {
  id = uuid();
  sharedWorker.port.postMessage(createHelloMessage(id));
});

// Send the current layout every 5 seconds
setInterval(() => {
  const currentLayout = {
    x: window.screenLeft,
    y: window.screenY,
    width: window.width,
    height: window.height
  };

  const message = createPopupLayoutChangeMessage(id, currentLayout);

  sharedWorker.port.postMessage(message);
}, 5000);
