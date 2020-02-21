export default () => {
  const testPopup = window.open("./popup.html", null);
  if (testPopup) {
    testPopup.close();
    return true;
  }
  return false;
};
