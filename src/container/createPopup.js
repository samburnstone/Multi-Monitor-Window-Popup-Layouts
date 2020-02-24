export default async (id, stockName, layout, isNoopener) => {
  const windowFeatures = ["resizable"];

  if (isNoopener) {
    windowFeatures.push("noopener");
  }

  windowFeatures.push(
    `left=${layout.x}`,
    `top=${layout.top}`,
    `width=${layout.width}`,
    `height=${layout.height}`
  );

  const { origin, pathname } = window.location;

  window.open(
    `${origin}${pathname}popup.html?id=${id}&layout=${layout.x},${layout.y},${layout.width},${layout.height}&stockName=${stockName}`,
    id,
    windowFeatures.join(",")
  );
};
