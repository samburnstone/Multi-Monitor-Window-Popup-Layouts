export const createNewWindowWithLayout = (microfrontend, layout) => {
  // Use screenX and screenY to position the popup
  const popupWindow = window.open(
    '',
    "",
    `height=${layout.height},width=${layout.width},resizable,scrollable,screenX=${layout.x},screenY=${layout.y}`
  );

  // initMicroFrontend(microfrontend, popupWindow.document);
}

export const initMicroFrontend = ({ containerElementId, bundleUrl, name }, document = window.document) => {
  const divEl = document.createElement('div');
  divEl.id = containerElementId;
  document.body.appendChild(divEl);

  const scriptEl = document.createElement('script');
  scriptEl.src = bundleUrl;
  scriptEl.onload = () => loadMicroFrontend(name, containerElementId);
  document.body.appendChild(scriptEl);
}

const loadMicroFrontend = (name, containerElementId) => {
  // For now, the microfrontend will pop functions on the window that
  // we can use to mount the application
  const mountFn = window[`mount${name}`];
  mountFn(containerElementId);
};
