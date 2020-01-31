import microFrontendsConfig from './microfrontends.config';
import { createNewWindowWithLayout } from './createApplication';

const handleOpenPopup = payload => {
  const config = microFrontendsConfig.find(({ name }) => name === payload.name);

  if (!config) {
    throw new Error(`Invalid microfrontend name ${payload.name}`)
  }
};

export const listen = () => window.addEventListener(
  'message',
  ({ data }) => {
    if (data.type === '3FDC_OPEN_POPUP') {
      handleOpenPopup(data.payload);
    }
  }
);