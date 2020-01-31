import microFrontendsConfig from './microfrontends.config';

const initMicroFrontend = ({ containerElementId, bundleUrl, name }) => {
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

microFrontendsConfig.forEach(initMicroFrontend);
