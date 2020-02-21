const scale = ['480px', '576px', '768px', '992px', '1200px'];

const aliases = {
  xs: scale[0],
  sm: scale[1],
  md: scale[2],
  lg: scale[3],
  xl: scale[4],
};

const breakpoints = Object.entries(aliases).reduce((o, [key, value]) => {
  o[key] = value;
  return o;
}, scale);

const mediaQueries = Object.keys(aliases).reduce((o, key) => {
  o[key] = `@media screen and (min-width: ${breakpoints[key]})`;
  return o;
}, {});

export { breakpoints, mediaQueries };
