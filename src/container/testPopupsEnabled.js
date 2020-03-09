export default () => {
  // Hacky test to determine whether users have pop-ups enabled for this site.
  const testPopup = window.open(
    "./popups-enabled.html",
    "test-popup",
    "top=200,left=0,height=100,width=100"
  );
  if (testPopup) {
    testPopup.close();
    return true;
  }
  return false;
};
