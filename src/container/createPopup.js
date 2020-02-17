export default async (id, layout, isNoopener) => {
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

  window.open(
    `../popup.html?id=${id}&layout=${layout.x},${layout.y},${layout.width},${layout.height}`,
    id,
    windowFeatures.join(",")
  );
};
