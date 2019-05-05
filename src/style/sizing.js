import isNil from 'lodash/isNil';
import * as constants from 'style/constants';

import { em, px, rem } from 'style/helpers';

const scale = (i, { base, ratio, steps }) => base * Math.pow(ratio, i / steps);

const fontScale = i =>
  scale(i, { base: constants.rootFontSize, ratio: 2, steps: 3 });

const layoutScale = i =>
  scale(i, { base: constants.rootFontSize / 2, ratio: 2, steps: 3 });

/**
 * Font Sizing
 */

const snapToGrid = (n, base = constants.rootFontSize / 2) =>
  Math.ceil((n + 0.5 * base) / base) * base;

const lineHeight = n => snapToGrid(n) / n;

const fontSizes = {
  small: fontScale(-1),
  base: fontScale(0),
  large: fontScale(1),
  lead: fontScale(1),
  display: fontScale(3),
  h6: fontScale(0),
  h5: fontScale(0),
  h4: fontScale(1),
  h3: fontScale(2),
  h2: fontScale(3),
  h1: fontScale(4),
};

/**
 * Spacing
 */

const sizes = {
  default: 3,
  xxs: -1,
  xs: 1,
  sm: 2,
  md: 3,
  lg: 5,
  xl: 7,
  xxl: 12,
};

const spacing = (i = 0, units = 'px') => {
  if (typeof i === 'string') {
    return sizes[i] ? spacing(sizes[i], units) : i;
  }

  if (typeof i === 'number') {
    switch (units) {
      case 'px':
        return px(Math.round(layoutScale(i)));
      case 'em':
        return em(layoutScale(i));
      case 'rem':
        return rem(layoutScale(i));
      default:
        return layoutScale(i);
    }
  }

  return i;
};

export {
  fontScale,
  fontSizes,
  layoutScale,
  lineHeight,
  px,
  rem,
  snapToGrid,
  spacing,
};
