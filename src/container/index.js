import testPopupsEnabled from "./testPopupsEnabled";
import createContainerUI from "./createContainerUI";

if (testPopupsEnabled()) {
  createContainerUI();
} else {
  const popupAlertEl = document.getElementById("popups-disabled-alert");
  popupAlertEl.classList.remove("d-none");
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}
