import { BroadcastChannel } from "broadcast-channel";

const BROADCAST_CHANNEL_NAME = "F3DC";

export const MESSAGE_TYPES = {
  POPUP_DISMISS_ALL: `${BROADCAST_CHANNEL_NAME}/POPUP_DISMISS_ALL`,
  POPUP_LAYOUT_CHANGE: `${BROADCAST_CHANNEL_NAME}/POPUP_LAYOUT_CHANGE`,
  POPUP_DISMISSED: `${BROADCAST_CHANNEL_NAME}/POPUP_DISMISSED`
};

export const createDismissAllPopupsMessage = () => ({
  type: MESSAGE_TYPES.POPUP_DISMISS_ALL
});

export const createPopupLayoutChangeMessage = (id, layout) => ({
  type: MESSAGE_TYPES.POPUP_LAYOUT_CHANGE,
  payload: {
    id,
    layout
  }
});

export const createPopupDismissedMessage = id => ({
  type: MESSAGE_TYPES.POPUP_DISMISSED,
  payload: {
    id
  }
});

export const createMessageBroadcaster = () =>
  new BroadcastChannel(BROADCAST_CHANNEL_NAME);
