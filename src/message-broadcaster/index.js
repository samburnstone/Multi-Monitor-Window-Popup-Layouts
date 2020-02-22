export default () =>
  new SharedWorker("./messageBroadcaster", { type: "module" });
