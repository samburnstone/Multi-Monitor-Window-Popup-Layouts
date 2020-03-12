import { createPopupLayoutChangeMessage } from "message-broadcaster";

export default (id, layout, messageBroadcaster) => {
  const isChromium = navigator.userAgent.search("Chrome") > 0;

  // Report the current layout every 0.5 seconds
  const startReportingLayout = () => {
    setInterval(() => {
      const currentLayout = {
        x: window.screenLeft,
        y: window.screenY,
        // Chrome does not respect dimensions supplied via window features, so we do a
        // hacky user agent check to determine whether we need to do some resizing & repositioning

        // resizeTo (used in Chromium browsers) expects width and height in terms of "outerWidth" and "outerHeight", whereas
        // windowFeatures (used in Firefox) expects in terms of "innerWidth" and "innerHeight"
        width: isChromium ? window.outerWidth : window.innerWidth,
        height: isChromium ? window.outerHeight : window.innerHeight
      };

      const message = createPopupLayoutChangeMessage(id, currentLayout);
      messageBroadcaster.postMessage(message);
    }, 500);
  };

  if (isChromium) {
    // Layout params are sent in format "<x>,<y>,<width>,<height>" via the query string
    const [x, y, width, height] = layout;

    window.resizeTo(width, height);
    window.moveTo(x, y);
  }

  startReportingLayout();
};
