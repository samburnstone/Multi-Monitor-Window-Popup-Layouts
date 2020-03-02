export default () => {
  const { origin, pathname } = window.location;
  return `${origin}${pathname}`;
};
