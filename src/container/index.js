import layoutConfig from "./layout.config";
import createPopupWithInitialProps from "./popup-creators/initial-props";
import createSelfSizingPopup from "./popup-creators/self-sizing";

const popupWithInitLayoutProps = document.getElementById(
  "open-init-layout-left"
);
popupWithInitLayoutProps.onclick = () =>
  layoutConfig.forEach(createPopupWithInitialProps);

const selfResizingPopup = document.getElementById("open-self-resizing");
selfResizingPopup.onclick = async () => {
  for (const layout of layoutConfig) {
    await createSelfSizingPopup(layout);
  }
};

document.body.appendChild(selfResizingPopup);
