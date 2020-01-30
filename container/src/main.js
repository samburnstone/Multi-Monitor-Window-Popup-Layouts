const microFrontends = [
  {
    bundleUrl: 'http://localhost:9000/dist/main.js',
    containerElementId: 'stock-tracker-root'
  }
]

const createScriptElement = ({ containerElementId, bundleUrl }) => {
  const divEl = document.createElement('div');
  divEl.id = containerElementId;
  document.body.appendChild(divEl);

  const scriptEl = document.createElement('script');
  scriptEl.src = bundleUrl;
  document.body.appendChild(scriptEl);
}

microFrontends.forEach(createScriptElement);
