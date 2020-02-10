import MessageBusWorker from "message-bus/message-bus.worker";
import {
  createPopupReadyMessage,
  createPopupLayoutChangeMessage,
  createPopupDismissedMessage,
  MESSAGE_TYPES
} from "message-bus/message-factory";

const id = window.location.search.split("=")[1]; // Bit of a hack to get the id... shall do this nicer in a bit
let isBeingClosedByWindow = false;

const sharedWorker = MessageBusWorker();

sharedWorker.port.onmessage = ({ data }) => {
  if (data.type === MESSAGE_TYPES.POPUP_INIT_LAYOUT) {
    if (id !== data.payload.id) {
      // Layout info isn't for this popup
      return;
    }
    const { x, y, width, height } = data.payload.layout;
    resizeTo(width, height);
    moveTo(x, y); // Need to move after resizing, otherwise y will always be 0 for some reason!
    startReportingLayout();
  }
  if (data.type === MESSAGE_TYPES.POPUP_DISMISS_ALL) {
    isBeingClosedByWindow = true;
    window.close();
  }
};

// Can't resize the document straight away - waiting until this event fires seems to work
document.addEventListener("DOMContentLoaded", () => {
  sharedWorker.port.postMessage(createPopupReadyMessage());
  startReportingLayout();
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

window.addEventListener("beforeunload", () => {
  if (isBeingClosedByWindow) {
    // If the close window instruction came from the container then don't send message,
    // as the container already knows the popup's closing.
    return;
  }
  const message = createPopupDismissedMessage(id);
  sharedWorker.port.postMessage(message);
});
