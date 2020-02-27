import queryString from "query-string";
import createMessageBroadcaster from "message-broadcaster";
import {
  createPopupLayoutChangeMessage,
  createPopupDismissedMessage,
  MESSAGE_TYPES
} from "message-broadcaster/messageFactory";
import createChart from "./chart"; // Import the chart file so it gets bundled by webpack

const params = queryString.parse(window.location.search);
const { id, stockName } = params;

let isBeingClosedByWindow = false;

window.document.title = stockName;

const messageBroadcaster = createMessageBroadcaster();

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

    messageBroadcaster.port.postMessage(message);
  }, 500);
};

messageBroadcaster.port.onmessage = ({ data }) => {
  if (data.type === MESSAGE_TYPES.POPUP_DISMISS_ALL) {
    isBeingClosedByWindow = true;
    window.close();
  }
};

// Can't resize the document straight away - waiting until this event fires seems to work
document.addEventListener("DOMContentLoaded", () => {
  const initialLayout = params.layout.split(",");

  if (navigator.userAgent.search("Chrome") > 0) {
    // Chrome does not respect dimensions supplied via window features, so we do a
    // hacky user agent check to determine whether we need to do some resizing & repositioning

    // Layout params are sent in format "<x>,<y>,<width>,<height>" via the query string
    window.resizeTo(initialLayout[2], initialLayout[3]);
    // Need to move after resizing, otherwise y will always be 0 for some reason!
    window.moveTo(initialLayout[0], initialLayout[1]);
  }

  startReportingLayout();
});

window.addEventListener("beforeunload", () => {
  if (isBeingClosedByWindow) {
    // If the close window instruction came from the container then don't send message,
    // as the container already knows the popup's closing.
    return;
  }
  const message = createPopupDismissedMessage(id);
  messageBroadcaster.port.postMessage(message);
});

createChart(stockName);
