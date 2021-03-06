export default async (id, stockName, layout, isNoopener) => {
  const windowFeatures = ["resizable"];

  if (isNoopener) {
    windowFeatures.push("noopener");
  }

  windowFeatures.push(
    `left=${layout.x}`,
    `top=${layout.y}`,
    `width=${layout.width}`,
    `height=${layout.height}`
  );

  window.open(
    `./popup-host.html?id=${id}&layout=${layout.x},${layout.y},${layout.width},${layout.height}&stockName=${stockName}`,
    id,
    windowFeatures.join(",")
  );
};
