import isNil from 'lodash/isNil';

/**
 * Font Sizing
 */
const fontSizeStep = n => (Math.trunc((n - 2) / 4) + 1) * 2;
const fontSize = n => {
  if (n <= 0) return 8;
  return fontSize(n - 1) + fontSizeStep(n - 1);
};

const snapToGrid = (n, base = 8) => Math.ceil((n + 0.5 * base) / base) * base;
const lineHeight = n => snapToGrid(n) / n;

const fontSizes = {
  base: fontSize(4),
  small: fontSize(3),
  large: fontSize(5),
  display: fontSize(11),
  lead: fontSize(7),
  h1: fontSize(11),
  h2: fontSize(10),
  h3: fontSize(7),
  h4: fontSize(6),
  h5: fontSize(5),
  h6: fontSize(4),
};

const toRem = n => n / fontSizes.base;
const rem = n => `${toRem(n)}rem`;
const px = n => `${n}px`;

/**
 * Spacing
 */
const layoutSizeStep = n => (Math.trunc((n - 1) / 3) + 1) * 4;
const layoutSize = (n, base = 4) => {
  let absN = Math.abs(n);
  let sign = n < 0 ? -1 : 1;
  if (n === 0) return base;
  return sign * (layoutSize(absN - 1) + layoutSizeStep(absN - 1));
};

const spacingConstants = {
  default: 3,
  xxs: 0,
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 5,
  xxl: 6,
};

const spacing = (i, units = 'px') => {
  if (typeof i === 'string') {
    return !isNil(spacingConstants[i])
      ? spacing(spacingConstants[i], units)
      : i;
  }
  if (typeof i === 'number') {
    return 'px' === units
      ? px(layoutSize(i))
      : 'rem' === units
      ? rem(layoutSize(i))
      : layoutSize(i);
  }
  return null;
};

export {
  fontSize,
  fontSizes,
  layoutSize,
  lineHeight,
  px,
  rem,
  snapToGrid,
  spacing,
  spacingConstants,
  toRem,
};
