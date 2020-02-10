const clients = [];

const broadcast = (message, originator) => {
  for (const client of clients) {
    if (client !== originator) {
      client.postMessage(message);
    }
  }
};

// eslint-disable-next-line no-restricted-globals
self.addEventListener("connect", connectEvent => {
  const port = connectEvent.ports[0];
  clients.push(port);

  port.onmessage = messageEvent => {
    // relay message to other clients for now
    broadcast(messageEvent.data, port);
  };
});
