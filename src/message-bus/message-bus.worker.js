let clients = [];

const broadcast = (message, originator) => {
  for (const client of clients) {
    if (client === originator) {
      continue;
    }
    client.postMessage(message);
  }
}

onconnect = function(e) {
  const port = e.ports[0];
  clients.push(port);

  port.onmessage = (e) => {
    // relay message to other clients for now
    broadcast(e.data, port);
  }
}