import * as messageHub from './messageHub';
import microFrontendsConfig from './microfrontends.config';
import { createNewWindowWithLayout, initMicroFrontend } from './createApplication';

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

microFrontendsConfig.forEach((config) => initMicroFrontend(config));
popupLayoutStore.forEach((layout) => {
  const microConfig = microFrontendsConfig.find(({ name }) => name === layout.name);
  createNewWindowWithLayout(microConfig, layout);
})

messageHub.listen();
