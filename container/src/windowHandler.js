export default class WindowHandler {
  constructor() {
    this.windows = [];
  }

  createNewWindowWithLayout(microfrontend, layout) {
    const popupWindow = window.open(
      '',
      "",
      `height=${layout.height},width=${layout.width},resizable,scrollable,screenX=${layout.x},screenY=${layout.y}`
    );

    this.windows.push(popupWindow);
  }

  closeAllWindows() {
    this.windows.forEach(window => window.close());
  }
}
