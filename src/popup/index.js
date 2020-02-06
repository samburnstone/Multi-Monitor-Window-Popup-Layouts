import MessageBusWorker from "message-bus/message-bus.worker";
import {
  createHelloMessage,
  createPopupLayoutChangeMessage,
  MESSAGE_TYPES
} from "message-bus/message-factory";

let id;

const sharedWorker = MessageBusWorker();

sharedWorker.port.onmessage = ({ data }) => {
  if (data.type === MESSAGE_TYPES.POPUP_INIT_LAYOUT) {
    if (!!id) {
      // If the popup's already been given an id then this message can't be for us
      return;
    }
    id = data.payload.id;
    const { x, y, width, height } = data.payload.layout;
    resizeTo(width, height);
    moveTo(x, y); // Need to move after resizing, otherwise y will always be 0 for some reason!
    startReportingLayout();
  }
  if (data.type === MESSAGE_TYPES.POPUP_DISMISS) {
    window.close();
  }
};

// Can't resize the document straight away - waiting until this event fires seems to work
document.addEventListener("DOMContentLoaded", () => {
  sharedWorker.port.postMessage(createHelloMessage());
});

// Report the current layout every 0.5 seconds
const startReportingLayout = () => {
  setInterval(() => {
    const currentLayout = {
      x: window.screenLeft,
      y: window.screenY,
      width: window.outerWidth,
      height: window.outerHeight
    };

    const message = createPopupLayoutChangeMessage(id, currentLayout);

    sharedWorker.port.postMessage(message);
  }, 500);
};
