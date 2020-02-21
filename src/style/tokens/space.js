const scale = [0, 4, 8, 12, 16, 24, 32, 40, 54, 64, 72, 96, 144, 240, 432];

const aliases = {
  default: scale[4], //  16 px
  xxs: scale[1], //  4 px
  xs: scale[2], //  8 px
  sm: scale[3], //  12 px
  md: scale[4], //  16 px
  lg: scale[6], //  32 px
  xl: scale[10], //  72 px
  xxl: scale[12], //  144 px
};

const space = Object.entries(aliases).reduce((o, [key, value]) => {
  o[key] = value;
  return o;
}, scale);

export default space;
