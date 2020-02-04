// This form of positioning works well on Firefox
// Safari works if just using a single monitor
export default ({ x, y, width, height }) =>
  window.open(
    "",
    null,
    `noopener,resizable,scrollable,width=${width},height=${height},top=${y},left=${x}`
  );
