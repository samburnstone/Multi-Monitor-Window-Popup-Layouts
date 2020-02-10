import uuid from "uuid/v4";
import { createDismissAllPopupsMessage } from "message-bus/messageFactory";
import MessageBusWorker from "message-bus/messageBus.worker";
import createPopup from "./createPopup";
import {
  getPopupsFromStorage,
  startListeningForLayoutChanges,
  removeAllPopupsFromStorage
} from "./popupStore";

window.addEventListener("load", async () => {
  for (const { id, layout } of getPopupsFromStorage()) {
    // eslint-disable-next-line no-await-in-loop
    await createPopup(id, layout);
  }
});

const handleCreatePopup = async () => {
  // Position the popup near the top of the current window with a generic height and width
  const initialLayout = {
    x: window.screenLeft,
    y: window.screenTop,
    width: 200,
    height: 400
  };
  // Newly created popup requested by user, so needs to be assigned an id
  const id = uuid();
  createPopup(id, initialLayout);
};

const handleDismissPopups = () => {
  const sharedWorker = MessageBusWorker();
  const message = createDismissAllPopupsMessage();
  sharedWorker.port.postMessage(message);
};

document.getElementById("dismiss-popups").addEventListener("click", () => {
  handleDismissPopups();
  // Pressing the button should remove the popups from the store
  removeAllPopupsFromStorage();
});
// Closing the container page should dismiss the popups, but retain them in local storage
window.addEventListener("beforeunload", handleDismissPopups);

document
  .getElementById("create-new-popup")
  .addEventListener("click", handleCreatePopup);

startListeningForLayoutChanges();
