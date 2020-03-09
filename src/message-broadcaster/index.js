// Currently using SharedWorkers for cross-window communication.
// Present warning alert if using a browser that doesn't support this feature.
if (!window.SharedWorker) {
  const POP_UP_SEEN_KEY = "F3DC/hasSeenSharedWorkerWarning";

  const hasSeenAlert = localStorage.getItem(POP_UP_SEEN_KEY) === "true";

  if (!hasSeenAlert) {
    // eslint-disable-next-line no-alert
    alert(
      "Looks like you're using a browser that doesn't support SharedWorkers.\n\nThings will still work to some extent, but you may be better off using another browser."
    );

    localStorage.setItem(POP_UP_SEEN_KEY, "true");
  }

  window.SharedWorker = () => {
    return {
      port: {
        postMessage: () => {},
        onmessage: () => {}
      }
    };
  };
}

export default () =>
  new SharedWorker("./messageBroadcaster", { type: "module" });
