import microFrontendsConfig from './microfrontends.config';
import { initMicroFrontend } from './main';

const handleOpenPopup = payload => {
  const config = microFrontendsConfig.find(({ name }) => name === payload.name);

  if (!config) {
    throw new Error(`Invalid microfrontend name ${payload.name}`)
  }

  // Use screenX and screenY to position the popup
  const popupWindow = window.open(
    './index.html',
    "",
    "height=300,width=300,resizable,scrollable,bottom=0,screenX=3500"
  );

  initMicroFrontend(config, popupWindow.document);
};

export const listen = () => window.addEventListener(
  'message',
  ({ data }) => {
    if (data.type === '3FDC_OPEN_POPUP') {
      handleOpenPopup(data.payload);
    }
  }
);