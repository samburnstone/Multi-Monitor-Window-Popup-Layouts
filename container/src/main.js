const popupLayoutStore = [
  {
    x: 0,
    y: 200,
    width: 200,
    height: 200
  },
  {
    x: 200,
    y: 200,
    width: 200,
    height: 200
  },
  {
    x: 1920, // should result in popup opening on second monitor (each one is 1920 in width)
    y: 200,
    width: 200,
    height: 200
  },
];

const openInitLayoutPopups = layout => {
  window.open('', null, `noopener,resizable,scrollable,width=${layout.width},height=${layout.height},top=${layout.y},left=${layout.x}`);
};

const popupWithInitLayoutProps = document.createElement('button');
popupWithInitLayoutProps.innerText = 'Open popups with initialised layout props';
popupWithInitLayoutProps.onclick = () => popupLayoutStore.forEach(openInitLayoutPopups);

document.body.appendChild(popupWithInitLayoutProps);

const openSelfResizingPopups = layout => {
  window.open('../resized.html', null, `resizable`);
  const sharedWorker = require('sharedworker-loader!./message-bus')();
  sharedWorker.port.postMessage([10,10]);
  sharedWorker.port.onmessage = (e) => {
    console.log(e.data);
  }
};

const selfResizingPopup = document.createElement('button');
selfResizingPopup.innerText = 'Open popups that self-resize';
selfResizingPopup.onclick = () => popupLayoutStore.forEach(openSelfResizingPopups);

document.body.appendChild(selfResizingPopup);
