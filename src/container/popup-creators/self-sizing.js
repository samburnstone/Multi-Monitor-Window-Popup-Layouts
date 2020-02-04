import MessageBusWorker from "message-bus/message-bus.worker";
import {
  MESSAGE_TYPES,
  createLayoutMessage
} from "../message-bus/message-factory";

const sharedWorker = MessageBusWorker();

export default async layout => {
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
