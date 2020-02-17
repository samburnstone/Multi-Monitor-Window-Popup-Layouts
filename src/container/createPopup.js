import createMessageBus from "message-bus";
import {
  MESSAGE_TYPES,
  createLayoutInitMessage
} from "message-bus/messageFactory";

const messageBus = createMessageBus();

export default async (id, layout, isNoopener) => {
  const isPopupReadyPromise = new Promise(res => {
    messageBus.port.onmessage = e => {
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
  messageBus.port.postMessage(createLayoutInitMessage(id, layout));
};
