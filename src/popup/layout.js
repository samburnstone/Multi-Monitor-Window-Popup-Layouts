import { createPopupLayoutChangeMessage } from "message-broadcaster";

export default (id, layout, messageBroadcaster) => {
  // Report the current layout every 0.5 seconds
  const startReportingLayout = () => {
    setInterval(() => {
      const currentLayout = {
        x: window.screenLeft,
        y: window.screenY,
        width: window.innerWidth,
        height: window.innerHeight
      };

      const message = createPopupLayoutChangeMessage(id, currentLayout);
      messageBroadcaster.postMessage(message);
    }, 500);
  };

  if (navigator.userAgent.search("Chrome") > 0) {
    // Chrome does not respect dimensions supplied via window features, so we do a
    // hacky user agent check to determine whether we need to do some resizing & repositioning

    // resizeTo expects width and height in terms of "outerWidth" and "outerHeight".
    // layout is stored in terms of pop-up's "innerWidth" and "innerHeight", so need to do
    // some adjustments to ensure content area is of correct size

    // Hack: Chrome sometimes reports outerHeight as being less than innerHeight.
    // Only saw this when running as Desktop PWA, in which case we know the height of the top bar
    const pwaTopBarHeight = 38;
    const heightDiff = Math.max(
      window.outerHeight - window.innerHeight,
      pwaTopBarHeight
    );

    // Layout params are sent in format "<x>,<y>,<width>,<height>" via the query string
    window.resizeTo(layout[2], layout[3] + heightDiff);
    // Need to move after resizing, otherwise y will always be 0 for some reason!
    window.moveTo(layout[0], layout[1]);
  }

  startReportingLayout();
};
