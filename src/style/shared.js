import { fonts, lineHeights } from './theme';

/**
 * aliases
 *
 * base: fontSizes[2],
 * body: {
 *   sm: fontSizes[2],
 *   lg: fontSizes[3],
 * },
 * display: fontSizes[8],
 * lead: fontSizes[5],
 * small: fontSizes[1],
 * h6: fontSizes[3],
 * h5: fontSizes[4],
 * h4: fontSizes[5],
 * h3: fontSizes[6],
 * h2: fontSizes[8],
 * h1: fontSizes[9],
 * icon: fontSizes[5],
 *
 */

const type = {
  body: {
    fontFamily: fonts.serif,
    fontSize: 3,
    lineHeight: lineHeights.default,
  },
  button: {
    fontFamily: fonts.sans,
  },
  h1: {
    fontSize: 9,
  },
  h2: {
    fontSize: 8,
  },
  h3: {
    fontSize: 6,
  },
  h4: {
    fontSize: 5,
  },
  h5: {
    fontSize: 4,
  },
  h6: {
    fontSize: 3,
  },
  hero: {
    fontSize: 8,
    lineHeight: lineHeights.tight,
  },
  html: {
    fontSize: 2,
  },
  icon: {
    fontSize: 5,
  },
  lead: {
    fontFamily: fonts.sans,
    fontSize: 5,
  },
  small: {
    fontFamily: fonts.sans,
    fontSize: 1,
  },
};

export { type };
