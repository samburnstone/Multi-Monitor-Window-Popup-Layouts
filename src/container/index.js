import uuid from "uuid/v4";
import { createDismissAllPopupsMessage } from "message-bus/message-factory";
import MessageBusWorker from "message-bus/message-bus.worker";
import createPopupWithInitialProps from "./popup-creators/initial-props";
import createSelfSizingPopup from "./popup-creators/self-sizing";
import {
  getPopupsFromStorage,
  startListeningForLayoutChanges,
  removeAllPopupsFromStorage
} from "./popupStore";

const popupWithInitLayoutProps = document.getElementById(
  "open-init-layout-left"
);
popupWithInitLayoutProps.addEventListener("click", () =>
  getPopupsFromStorage().forEach(createPopupWithInitialProps)
);

const selfResizingPopup = document.getElementById("open-self-resizing");
selfResizingPopup.addEventListener("click", async () => {
  for (const { id, layout } of getPopupsFromStorage()) {
    await createSelfSizingPopup(id, layout);
  }
});

const createPopup = async () => {
  // Position the popup near the top of the current window with a generic height and width
  const initialLayout = {
    x: window.screenLeft,
    y: window.screenTop,
    width: 200,
    height: 400
  };
  // Newly created popup requested by user, so needs to be assigned an id
  const id = uuid();
  createSelfSizingPopup(id, initialLayout);
};

const dismissPopups = () => {
  const sharedWorker = MessageBusWorker();
  const message = createDismissAllPopupsMessage();
  sharedWorker.port.postMessage(message);
};

document.getElementById("dismiss-popups").addEventListener("click", () => {
  dismissPopups();
  // Pressing the button should remove the popups from the store
  removeAllPopupsFromStorage();
});
// Closing the container page should dismiss the popups, but retain them in local storage
window.addEventListener("beforeunload", dismissPopups);

document
  .getElementById("create-new-popup")
  .addEventListener("click", createPopup);

startListeningForLayoutChanges();
