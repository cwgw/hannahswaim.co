const rootFontSize = 16;

const fontSizeScale = [
  0.75, //  0 == 12 px
  0.875, //  1 == 14 px
  1, //  2 == 16 px
  1.125, //  3 == 18 px
  1.25, //  4 == 20 px
  1.5, //  5 == 24 px
  1.75, //  6 == 28 px
  2, //  7 == 32 px
  2.25, //  8 == 36 px
  2.625, //  9 == 42 px
  3, // 10 == 48 px
  3.375, // 11 == 54 px
  3.75, // 12 == 60 px
  4.25, // 13 == 68 px
  4.75, // 14 == 76 px
  5.25, // 15 == 84 px
  5.75, // 16 == 92 px
];

const fontSizes = {
  base: fontSizeScale[2],
  body: {
    sm: fontSizeScale[2],
    lg: fontSizeScale[3],
  },
  display: fontSizeScale[8],
  lead: fontSizeScale[5],
  small: fontSizeScale[1],
  h6: fontSizeScale[3],
  h5: fontSizeScale[4],
  h4: fontSizeScale[5],
  h3: fontSizeScale[6],
  h2: fontSizeScale[8],
  h1: fontSizeScale[9],
  icon: fontSizeScale[5],
};

export { fontSizes, fontSizeScale, rootFontSize };
