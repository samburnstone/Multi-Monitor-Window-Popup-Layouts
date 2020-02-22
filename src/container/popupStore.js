import createMessageBroadcaster from "message-broadcaster";
import { MESSAGE_TYPES } from "message-broadcaster/messageFactory";

const LAYOUT_STORAGE_KEY = "F3DC/popups";

export const getPopupsFromStorage = () =>
  JSON.parse(localStorage.getItem(LAYOUT_STORAGE_KEY)) || [];

// eslint-disable-next-line max-len
export const removeAllPopupsFromStorage = () =>
  localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify([]));

const messageBroadcaster = createMessageBroadcaster();

export const startListeningForLayoutChanges = () => {
  messageBroadcaster.port.onmessage = event => {
    if (event.data.type === MESSAGE_TYPES.POPUP_LAYOUT_CHANGE) {
      const popup = event.data.payload;
      const popups = getPopupsFromStorage();
      const currentIndex = popups.findIndex(({ id }) => id === popup.id);

      if (currentIndex === -1) {
        // Don't currently have this item, so add it to end of array
        popups.push(popup);
      } else {
        // Need to replace existing item in storage
        popups[currentIndex] = popup;
      }

      localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(popups));
    }

    if (event.data.type === MESSAGE_TYPES.POPUP_DISMISSED) {
      const { id: popupId } = event.data.payload;
      const popups = getPopupsFromStorage();
      const currentIndex = popups.findIndex(({ id }) => id === popupId);

      if (currentIndex === -1) {
        return;
      }

      popups.splice(currentIndex, 1);

      localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(popups));
    }
  };
};
