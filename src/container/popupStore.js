import createMessageBroadcaster from "message-broadcaster";
import { MESSAGE_TYPES } from "message-broadcaster/messageFactory";

const LAYOUT_STORAGE_KEY = "F3DC/popups";

export const getPopupsFromStorage = () =>
  JSON.parse(localStorage.getItem(LAYOUT_STORAGE_KEY)) || [];

// eslint-disable-next-line max-len
export const removeAllPopupsFromStorage = () =>
  localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify([]));

const messageBroadcaster = createMessageBroadcaster();

export const addPopup = (id, stockName) => {
  const popups = getPopupsFromStorage();
  popups.push({ id, stockName });
  localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(popups));
};

export const startListeningForLayoutChanges = () => {
  messageBroadcaster.port.onmessage = event => {
    if (event.data.type === MESSAGE_TYPES.POPUP_LAYOUT_CHANGE) {
      const popup = event.data.payload;
      const popups = getPopupsFromStorage();
      const currentIndex = popups.findIndex(
        ({ id }) => id === Number(popup.id)
      );

      // Need to replace existing item in storage
      popups[currentIndex] = {
        ...popups[currentIndex],
        layout: popup.layout
      };

      localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(popups));
    }

    if (event.data.type === MESSAGE_TYPES.POPUP_DISMISSED) {
      const { id: popupId } = event.data.payload;
      const popups = getPopupsFromStorage();
      const currentIndex = popups.findIndex(({ id }) => id === Number(popupId));

      if (currentIndex === -1) {
        return;
      }

      popups.splice(currentIndex, 1);

      localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(popups));
    }
  };
};
