import queryString from "query-string";
import createMessageBus from "message-bus";
import {
  createPopupReadyMessage,
  createPopupLayoutChangeMessage,
  createPopupDismissedMessage,
  MESSAGE_TYPES
} from "message-bus/messageFactory";

const { id } = queryString.parse(window.location.search);
let isBeingClosedByWindow = false;

const messageBus = createMessageBus();

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

    messageBus.port.postMessage(message);
  }, 500);
};

messageBus.port.onmessage = ({ data }) => {
  if (data.type === MESSAGE_TYPES.POPUP_INIT_LAYOUT) {
    if (id !== data.payload.id) {
      // Layout info isn't for this popup
      return;
    }
    const { x, y, width, height } = data.payload.layout;
    window.resizeTo(width, height);
    // Need to move after resizing, otherwise y will always be 0 for some reason!
    window.moveTo(x, y);
    startReportingLayout();
  }
  if (data.type === MESSAGE_TYPES.POPUP_DISMISS_ALL) {
    isBeingClosedByWindow = true;
    window.close();
  }
};

// Can't resize the document straight away - waiting until this event fires seems to work
document.addEventListener("DOMContentLoaded", () => {
  messageBus.port.postMessage(createPopupReadyMessage());
  startReportingLayout();
});

window.addEventListener("beforeunload", () => {
  if (isBeingClosedByWindow) {
    // If the close window instruction came from the container then don't send message,
    // as the container already knows the popup's closing.
    return;
  }
  const message = createPopupDismissedMessage(id);
  messageBus.port.postMessage(message);
});

setInterval(() => {
  const el = document.getElementById("random");
  el.innerText = Math.round(Math.random() * 100);
}, 100);
