import queryString from "query-string";
import createMessageBus from "message-bus";
import {
  createPopupLayoutChangeMessage,
  createPopupDismissedMessage,
  MESSAGE_TYPES
} from "message-bus/messageFactory";
import "./chart"; // Import the chart file so it gets bundled by webpack

const params = queryString.parse(window.location.search);
const { id } = params;

let isBeingClosedByWindow = false;

window.document.title = `Stock ${id}`;

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
  if (data.type === MESSAGE_TYPES.POPUP_DISMISS_ALL) {
    isBeingClosedByWindow = true;
    window.close();
  }
};

// Can't resize the document straight away - waiting until this event fires seems to work
document.addEventListener("DOMContentLoaded", () => {
  // Layout is sent in format "<x>,<y>,<width>,<height>"
  const initialLayout = params.layout.split(",");
  window.resizeTo(initialLayout[2], initialLayout[3]);
  // Need to move after resizing, otherwise y will always be 0 for some reason!
  window.moveTo(initialLayout[0], initialLayout[1]);
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
