import MessageBusWorker from "message-bus/message-bus.worker";
import {
  MESSAGE_TYPES,
  createLayoutInitMessage
} from "message-bus/message-factory";

const sharedWorker = MessageBusWorker();

export default async (id, layout) => {
  const promise = new Promise(res => {
    sharedWorker.port.onmessage = e => {
      if (e.data.type === MESSAGE_TYPES.POPUP_HELLO) {
        res();
      }
    };
  });

  window.open("../popup.html", null, "noopener,resizable");
  // TODO: work out if we can move the promise here rather than creating it before
  await promise;
  sharedWorker.port.postMessage(createLayoutInitMessage(id, layout));
};
