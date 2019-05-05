import { stripUnit } from 'polished';

import * as constants from 'style/constants';

// units
//
const unitType = n => {
  const [value, unit] = stripUnit(n, true); // eslint-disable-line no-unused-vars
  return unit;
};

const isPx = n => unitType(n) === 'px';
const isEm = n => unitType(n) === 'em';
const isRem = n => unitType(n) === 'rem';

const pxValue = (n, throwError = true) => {
  if (typeof n === 'number') return n;
  if (typeof n !== 'string') {
    throw new Error(`px() expects a number or string. Received '${typeof n}'.`);
  }
  const [value, unit] = stripUnit(n, true);
  switch (unit) {
    case 'px':
      return value;
    case 'em':
    case 'rem':
      return value * constants.rootFontSize;
    default:
      if (throwError) {
        throw new Error(`Cannot calculate px value from '${unit}'.`);
      }
      return null;
  }
};

const px = (n, throwError = true) => `${pxValue(n, throwError)}px`;

const remValue = n => n / constants.rootFontSize;

const rem = n => `${remValue(n)}rem`;

const em = n => `${remValue(n)}em`;

export { em, isEm, isPx, isRem, px, pxValue, rem, remValue };
