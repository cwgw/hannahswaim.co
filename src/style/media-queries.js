import { css } from 'styled-components';

import { breakpoints } from 'style/tokens';
import { px, pxValue } from 'style/helpers';

/**
 * Format a min/max-width string for media queries
 *
 * @param {string}  direction   The query direction. Either 'min' or 'max'.
 *
 * @param {number|string}  n    The value of the width query. Either a
 *                              key of `breakpoints` (i.e. 'sm', 'md'), a
 *                              length string (e.g. '480px', '40em') or a
 *                              number which will be treated as a pixel value.
 */
const mediaQuery = (direction, n) => {
  const d = { min: 0, max: 1 }[direction];
  if (!Number.isInteger(d)) {
    throw new Error(
      `Cannot create meaningful media query with '"${direction}"-width'.`
    );
  }
  let bp = n;
  if (typeof bp === 'string') {
    bp = breakpoints.has(bp) ? breakpoints.get(bp) : pxValue(bp);
  }
  if (!Number.isFinite(bp)) {
    throw new Error(`Cannot create meaningful media query given '${n}'.`);
  }
  // em-based media queries are broken in UIContext. Use px instead.
  // it seems root font size isn't set by styled-components until
  // after the UIContext window.matchmedia listener is initialized
  // return `(${direction}-width: ${em(bp - d, rootFontSize)})`;
  return `(${direction}-width: ${px(bp - d)})`;
};

const mediaQueryString = (dir, n) => {
  return `@media ${mediaQuery(dir, n)}`;
};

/**
 * Returns args inside a 'min-width' media query block
 * @param {string|number} bp    The value of the query string. See `mediaQueryString()`.
 * @param {string|object} args  The media query block content.
 */
const mediaMin = bp => (...args) =>
  css`
    ${mediaQueryString('min', bp)} {
      ${css(...args)}
    }
  `;

/**
 * Returns args inside a 'max-width' media query block
 * @param {string|number} bp    The value of the query string. See `mediaQueryString()`.
 * @param {string|object} args  The media query block content.
 */
const mediaMax = bp => (...args) =>
  css`
    ${mediaQueryString('max', bp)} {
      ${css(...args)}
    }
  `;

/**
 * Set of per-breakpoint media query functions suitable for use in styled components
 *
 * Use like `media.min.lg(...)` or with template literals `media.max.sm`...``
 */
const media = Array.from(breakpoints.entries()).reduce(
  (o, [key, value]) => ({
    min: {
      ...(o.min || {}),
      [key]: mediaMin(value),
    },
    max: {
      ...(o.max || {}),
      [key]: mediaMax(value),
    },
  }),
  {}
);

export {
  media as default,
  media,
  mediaMax,
  mediaMin,
  mediaQuery,
  mediaQueryString,
};
