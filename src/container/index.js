import layoutConfig from "./layout.config";
import MessageBusWorker from "../message-bus/message-bus.worker";
import {
  MESSAGE_TYPES,
  createLayoutMessage
} from "../message-bus/message-factory";

const sharedWorker = MessageBusWorker();

const openInitLayoutPopups = ({ x, y, width, height }) =>
  window.open(
    "",
    null,
    `noopener,resizable,scrollable,width=${width},height=${height},top=${y},left=${x}`
  );

const popupWithInitLayoutProps = document.getElementById(
  "open-init-layout-left"
);
popupWithInitLayoutProps.onclick = () =>
  layoutConfig.forEach(openInitLayoutPopups);

const openSelfResizingPopups = async layout => {
  let promise = new Promise(res => {
    sharedWorker.port.onmessage = e => {
      if (e.data.type === MESSAGE_TYPES.POPUP_HELLO) {
        res(e.data.payload);
      }
    };
  });

  window.open("../popup.html", null, "noopener,resizable");
  const id = await promise;
  sharedWorker.port.postMessage(createLayoutMessage(id, layout));
};

const selfResizingPopup = document.getElementById("open-self-resizing");
selfResizingPopup.onclick = async () => {
  for (const layout of layoutConfig) {
    await openSelfResizingPopups(layout);
  }
};

document.body.appendChild(selfResizingPopup);
