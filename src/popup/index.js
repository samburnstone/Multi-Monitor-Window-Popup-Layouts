import queryString from "query-string";
import {
  createMessageBroadcaster,
  createPopupDismissedMessage,
  createCrosshairPositionChangeMessage,
  MESSAGE_TYPES
} from "message-broadcaster";
import configureLayout from "./layout";
import createChart from "./chart";

const { id, layout, stockName } = queryString.parse(window.location.search);
const messageBroadcaster = createMessageBroadcaster();
let isBeingClosedByWindow = false;
let chart;

// Update window title
window.document.title = stockName;

// Load chart data
(async () => {
  chart = await createChart(stockName, crosshairXValue => {
    const message = createCrosshairPositionChangeMessage(crosshairXValue);
    messageBroadcaster.postMessage(message);
  });
})();

// Listen to messages coming down the BroadcastChannel
messageBroadcaster.onmessage = event => {
  if (event.type === MESSAGE_TYPES.POPUP_DISMISS_ALL) {
    isBeingClosedByWindow = true;
    window.close();
  }

  if (event.type === MESSAGE_TYPES.CROSSHAIR_POSITION_CHANGE) {
    if (!chart) {
      return;
    }
    chart.updateCrosshairPosition(event.payload.position);
  }
};

// Can't resize the document straight away - waiting until the "DOMContentLoaded" event seems to work
document.addEventListener("DOMContentLoaded", () => {
  const initialLayout = layout.split(",").map(Number);
  configureLayout(id, initialLayout, messageBroadcaster);
});

// Inform the main window that this pop-up is being closed
window.addEventListener("beforeunload", () => {
  if (isBeingClosedByWindow) {
    // If the close window instruction came from the container then don't send message,
    // as the container already knows the popup's closing.
    return;
  }
  const message = createPopupDismissedMessage(id);
  messageBroadcaster.postMessage(message);
});
