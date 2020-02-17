export default () =>
  new SharedWorker("./messageBus.worker", { type: "module" });
