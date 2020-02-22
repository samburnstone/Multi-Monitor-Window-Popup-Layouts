import { createDismissAllPopupsMessage } from "message-broadcaster/messageFactory";
import createMessageBroadcaster from "message-broadcaster";
import createPopup from "./createPopup";
import {
  addPopup,
  getPopupsFromStorage,
  startListeningForLayoutChanges,
  removeAllPopupsFromStorage
} from "./popupStore";
import { getIsNoopener, setIsNoopener } from "./noopenerStore";

export default () => {
  let currentId = 0;

  const messageBroadcaster = createMessageBroadcaster();

  window.addEventListener("load", async () => {
    for (const { id, layout, stockName } of getPopupsFromStorage()) {
      // eslint-disable-next-line no-await-in-loop
      await createPopup(id, stockName, layout, getIsNoopener());
      currentId = Number(id);
    }
  });

  const handleCreatePopup = stockName => {
    // Position the popup near the top of the current window with a generic height and width
    const initialLayout = {
      x: window.screenLeft,
      y: window.screenTop,
      width: 400,
      height: 400
    };
    // Newly created popup requested by user, so needs to be assigned an id
    currentId += 1;
    addPopup(currentId, stockName);
    createPopup(currentId, stockName, initialLayout, getIsNoopener());
  };

  const handleDismissPopups = () => {
    const message = createDismissAllPopupsMessage();
    messageBroadcaster.port.postMessage(message);
  };

  document
    .getElementById("dismiss-all-popups")
    .addEventListener("click", () => {
      handleDismissPopups();
      // Pressing the button should remove the popups from the store
      removeAllPopupsFromStorage();
    });

  document.writeln("<br /><br />");

  // Closing the container page should dismiss the popups, but retain them in local storage
  window.addEventListener("beforeunload", handleDismissPopups);

  document.querySelectorAll(".open-popup-btn").forEach(el => {
    const stockName = el.getAttribute("data-stock");
    el.addEventListener("click", () => handleCreatePopup(stockName));
  });

  const checkboxEl = document.getElementById("noopener-checkbox");
  checkboxEl.addEventListener("change", () => {
    setIsNoopener(checkboxEl.checked);
  });

  startListeningForLayoutChanges();
};
