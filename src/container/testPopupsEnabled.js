export default () => {
  const testPopup = window.open("./popups-enabled.html", null);
  if (testPopup) {
    testPopup.close();
    return true;
  }
  return false;
};
