import { css } from 'styled-components';
import { stripUnit } from 'polished';

import { rootFontSize } from 'style/tokens';

// unit conversion
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
      return value * rootFontSize;
    default:
      if (throwError) {
        throw new Error(`Cannot calculate px value from '${unit}'.`);
      }
      return null;
  }
};

const remValue = n => n / rootFontSize;

const px = (n, throwError = true) => `${pxValue(n, throwError)}px`;
const em = n => `${remValue(n)}em`;
const rem = n => `${remValue(n)}rem`;

// loop
//
const loop = (n, cb) => {
  const styles = [];
  let from = 0;
  if (Array.isArray(n)) {
    [from, n] = n;
  }
  for (let i = from; i < n; i++) {
    styles.push(
      css`
        ${cb(i)}
      `
    );
  }
  return styles.join(`\n`);
};

export { em, isEm, isPx, isRem, loop, px, pxValue, rem, remValue };
