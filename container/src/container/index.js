import layoutConfig from './layout.config';
import MessageBusWorker from 'sharedworker-loader!../message-bus';

const sharedWorker = MessageBusWorker();

const openInitLayoutPopups = layout => {
  window.open('', null, `noopener,resizable,scrollable,width=${layout.width},height=${layout.height},top=${layout.y},left=${layout.x}`);
};

const popupWithInitLayoutProps = document.getElementById('open-init-layout-left');
popupWithInitLayoutProps.onclick = () => layoutConfig.forEach(openInitLayoutPopups);

const openSelfResizingPopups = async (layout) => {
  let promise = new Promise(res => {
    sharedWorker.port.onmessage = (e) => {
      if (e.data.type === 'F3DC/POPUP_HELLO') {
        res(e.data.payload);
      }
    }
  });

  window.open('../popup.html', null, 'noopener,resizable');
  const id = await promise;
  sharedWorker.port.postMessage({
    type: 'F3DC/layout',
    payload: {
      id,
      layout
    }
  });
};

const selfResizingPopup = document.getElementById('open-self-resizing');
selfResizingPopup.onclick = async () => {
  for (const layout of layoutConfig) {
    await openSelfResizingPopups(layout);
  }
};

document.body.appendChild(selfResizingPopup);

