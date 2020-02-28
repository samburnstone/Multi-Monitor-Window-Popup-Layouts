if (!window.SharedWorker) {
  alert(
    "Looks like you're using a browser that doesn't support SharedWorkers.\n\nPlease try this in another browser."
  );
}

export default () =>
  new SharedWorker("./messageBroadcaster", { type: "module" });
