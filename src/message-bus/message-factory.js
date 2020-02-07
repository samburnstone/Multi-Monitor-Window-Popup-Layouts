const prefix = "F3DC";

export const MESSAGE_TYPES = {
  POPUP_READY: `${prefix}/POPUP_READY`,
  POPUP_INIT_LAYOUT: `${prefix}/POPUP_INIT_LAYOUT`,
  POPUP_DISMISS_ALL: `${prefix}/POPUP_DISMISS_ALL`,
  POPUP_LAYOUT_CHANGE: `${prefix}/POPUP_LAYOUT_CHANGE`,
  POPUP_DISMISSED: `${prefix}/POPUP_DISMISSED`
};

export const createPopupReadyMessage = id => ({
  type: MESSAGE_TYPES.POPUP_READY,
  payload: id
});

export const createLayoutInitMessage = (id, layout) => ({
  type: MESSAGE_TYPES.POPUP_INIT_LAYOUT,
  payload: {
    id,
    layout
  }
});

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
