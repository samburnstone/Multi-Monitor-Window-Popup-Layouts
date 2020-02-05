import MessageBusWorker from "message-bus/message-bus.worker";
import { MESSAGE_TYPES } from "message-bus/message-factory";

export const startListeningForLayoutChanges = () => {
  const sharedWorker = MessageBusWorker();
  sharedWorker.port.onmessage = event => {
    if (event.data.type === MESSAGE_TYPES.POPUP_LAYOUT_CHANGE) {
      console.log(event.data.payload);
    }
  };
};
