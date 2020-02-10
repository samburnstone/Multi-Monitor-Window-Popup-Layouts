const NOOPENER_STORAGE_KEY = "F3DC/isNoopener";

export const getIsNoopener = () =>
  localStorage.getItem(NOOPENER_STORAGE_KEY) === "true";

export const setIsNoopener = value =>
  localStorage.setItem(NOOPENER_STORAGE_KEY, value);
