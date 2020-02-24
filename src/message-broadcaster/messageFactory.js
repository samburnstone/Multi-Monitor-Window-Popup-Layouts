const prefix = "F3DC";

export const MESSAGE_TYPES = {
  POPUP_DISMISS_ALL: `${prefix}/POPUP_DISMISS_ALL`,
  POPUP_LAYOUT_CHANGE: `${prefix}/POPUP_LAYOUT_CHANGE`,
  POPUP_DISMISSED: `${prefix}/POPUP_DISMISSED`
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