import { createPopupLayoutChangeMessage } from "message-broadcaster";

export default (id, layout, messageBroadcaster) => {
  const isChrome = navigator.userAgent.search("Chrome") > 0;

  // Report the current layout every 0.5 seconds
  const startReportingLayout = () => {
    setInterval(() => {
      const currentLayout = {
        x: window.screenLeft,
        y: window.screenY,
        // Chrome does not respect dimensions supplied via window features when noopener is supplied, so we do some
        // manual resizing and repositioning.
        // To simplify things, use outer[Width|Height] when using Chrome as that's the value expected when using resizeTo
        width: isChrome ? window.innerWidth : window.outerWidth,
        height: isChrome ? window.innerHeight : window.outerHeight
      };

      const message = createPopupLayoutChangeMessage(id, currentLayout);
      messageBroadcaster.postMessage(message);
    }, 500);
  };

  if (navigator.userAgent.search("Chrome") > 0) {
    // Layout params are sent in format "<x>,<y>,<width>,<height>" via the query string
    const [x, y, width, height] = layout;
    window.resizeTo(width, height);
    // Need to move after resizing, otherwise y will always be 0 for some reason!
    window.moveTo(x, y);
  }

  startReportingLayout();
};
