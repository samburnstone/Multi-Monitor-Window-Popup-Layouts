export default () => new SharedWorker("./messageBus", { type: "module" });
