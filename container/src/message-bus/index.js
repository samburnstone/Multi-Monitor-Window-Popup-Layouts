onconnect = function(e) {
  var port = e.ports[0];

  port.addEventListener('message', function(e) {
    const workerResult = 'Result: ' + (e.data[0] * e.data[1]);
    port.postMessage(workerResult);
  });

  port.start(); // Required when using addEventListener. Otherwise called implicitly by onmessage setter.
}