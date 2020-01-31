import * as messageHub from './messageHub';
import microFrontendsConfig from './microfrontends.config';
import WindowHandler from './windowHandler';
import { initMicroFrontend } from './initApplication';

const popupLayoutStore = [
  {
    name: 'StockTrader',
    x: 200,
    y: 200,
    width: 200,
    height: 200
  },
  {
    name: 'StockTrader',
    x: 400,
    y: 200,
    width: 200,
    height: 200
  },
];

const windowHandler = new WindowHandler();

microFrontendsConfig.forEach((config) => initMicroFrontend(config));
popupLayoutStore.forEach((layout) => {
  const microConfig = microFrontendsConfig.find(({ name }) => name === layout.name);
  windowHandler.createNewWindowWithLayout(microConfig, layout);
})

messageHub.listen();

// Close windows on container tab being closed
window.onbeforeunload = () => windowHandler.closeAllWindows();
