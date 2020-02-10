import MessageBusWorker from "message-bus/messageBus.worker";
import {
  MESSAGE_TYPES,
  createLayoutInitMessage
} from "message-bus/messageFactory";

const sharedWorker = MessageBusWorker();

export default async (id, layout, isNoopener) => {
  const isPopupReadyPromise = new Promise(res => {
    sharedWorker.port.onmessage = e => {
      if (e.data.type === MESSAGE_TYPES.POPUP_READY) {
        res();
      }
    };
  });

  const windowFeatures = ["resizable"];

  if (isNoopener) {
    windowFeatures.push("noopener");
  } else {
    windowFeatures.push(
      `left=${layout.x}`,
      `top=${layout.top}`,
      `width=${layout.width}`,
      `height=${layout.height}`
    );
  }

  window.open(`../popup.html?id=${id}`, id, windowFeatures.join(","));

  await isPopupReadyPromise;
  sharedWorker.port.postMessage(createLayoutInitMessage(id, layout));
};
