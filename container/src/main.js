const popupLayoutStore = [
  {
    x: 1920,
    y: 200,
    width: 200,
    height: 200
  },
  {
    x: 2120,
    y: 200,
    width: 200,
    height: 200
  },
  {
    x: 2600, // should result in popup opening on second monitor (each one is 1920 in width)
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

const openSelfResizingPopups = async (layout) => {
  const sharedWorker = require('sharedworker-loader!./message-bus')();

  let promise = new Promise(res => {
    sharedWorker.port.onmessage = (e) => {
      if (e.data.type === 'F3DC/POPUP_HELLO') {
        res(e.data.payload);
      }
    }
  });

  window.open('../resized.html', null, 'noopener,resizable');
  const id = await promise;
  console.log('New popup id', id);
  sharedWorker.port.postMessage({
    type: 'F3DC/layout',
    payload: {
      id,
      layout
    }
  });
};

const selfResizingPopup = document.createElement('button');
selfResizingPopup.innerText = 'Open popups that self-resize';
selfResizingPopup.onclick = async () => {
  for (const popupLayout of popupLayoutStore) {
    await openSelfResizingPopups(popupLayout);
  }
};

document.body.appendChild(selfResizingPopup);

