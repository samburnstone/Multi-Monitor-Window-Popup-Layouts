import { createDismissPopUpMessage } from "message-bus/message-factory";
import MessageBusWorker from "message-bus/message-bus.worker";
import layoutConfig from "./layout.config";
import createPopupWithInitialProps from "./popup-creators/initial-props";
import createSelfSizingPopup from "./popup-creators/self-sizing";

const popupWithInitLayoutProps = document.getElementById(
  "open-init-layout-left"
);
popupWithInitLayoutProps.addEventListener("click", () =>
  layoutConfig.forEach(createPopupWithInitialProps)
);

const selfResizingPopup = document.getElementById("open-self-resizing");
selfResizingPopup.addEventListener("click", async () => {
  for (const layout of layoutConfig) {
    await createSelfSizingPopup(layout);
  }
});

const dismissPopups = () => {
  const sharedWorker = MessageBusWorker();
  const message = createDismissPopUpMessage();
  sharedWorker.port.postMessage(message);
};

document
  .getElementById("dismiss-popups")
  .addEventListener("click", dismissPopups);
window.addEventListener("onbeforeunload", dismissPopups);
