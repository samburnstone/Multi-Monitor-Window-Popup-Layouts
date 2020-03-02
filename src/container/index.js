import testPopupsEnabled from "./testPopupsEnabled";
import createContainerUI from "./createContainerUI";
import getBaseUrl from "./utils/getBaseUrl";

if (testPopupsEnabled()) {
  createContainerUI();
} else {
  const popupAlertEl = document.getElementById("popups-disabled-alert");
  popupAlertEl.classList.remove("d-none");
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(`${getBaseUrl()}service-worker.js`);
  });
}
