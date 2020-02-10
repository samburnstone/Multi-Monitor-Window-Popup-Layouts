import MessageBusWorker from "message-bus/messageBus.worker";
import {
  MESSAGE_TYPES,
  createLayoutInitMessage
} from "message-bus/messageFactory";

const sharedWorker = MessageBusWorker();

export default async (id, layout) => {
  const isPopupReadyPromise = new Promise(res => {
    sharedWorker.port.onmessage = e => {
      if (e.data.type === MESSAGE_TYPES.POPUP_READY) {
        res();
      }
    };
  });

  window.open(`../popup.html?id=${id}`, null, "noopener,resizable");

  await isPopupReadyPromise;
  sharedWorker.port.postMessage(createLayoutInitMessage(id, layout));
};
