const prefix = 'F3DC';

export const MESSAGE_TYPES = {
  POPUP_HELLO: `${prefix}/POPUP_HELLO`,
  POPUP_INIT_LAYOUT: `${prefix}/POPUP_INIT_LAYOUT`
};

export const createHelloMessage = (id) => ({
  type: MESSAGE_TYPES.POPUP_HELLO,
  payload: id
});

export const createLayoutMessage = (id, layout) => ({
  type: MESSAGE_TYPES.POPUP_INIT_LAYOUT,
  payload: {
    id,
    layout
  }
});
