import { css } from 'styled-components';
import { em } from 'polished';
import has from 'lodash/has';
import isNil from 'lodash/isNil';
import merge from 'lodash/merge';
import zipObject from 'lodash/zipObject';

import * as constants from 'style/constants';
import { spacing } from 'style/sizing';

import { pxValue } from 'style/helpers';

/**
 * Format a min/max-width string for media queries
 * @param {string}  direction   The query direction. Either 'min' or 'max'.
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
    bp = constants.breakpoints.has(bp)
      ? constants.breakpoints.get(bp)
      : pxValue(bp);
  }
  if (!Number.isFinite(bp)) {
    throw new Error(`Cannot create meaningful media query given '${n}'.`);
  }
  return `(${direction}-width: ${em(bp - d, constants.rootFontSize)})`;
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
const media = Array.from(constants.breakpoints.entries())
  // .sort((a, b) => a[1] - b[1])
  .reduce(
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

const breakpointKeys = ['base', ...Array.from(constants.breakpoints.keys())];

const mapPropValuesToBreakpoints = (values, getValue = o => o) => {
  // arrays of values get mapped to corresponding breakpoints in order
  // e.g. [0,,1,,'30px'] becomes {base: 0, sm: 1, lg: '30px}
  if (Array.isArray(values)) {
    values = zipObject(breakpointKeys, values);
  }
  // object keys get matched with breakpoint keys, or else
  // {sm: ..., lg: ..., xl: ...}
  return Object.entries(values).reduce((acc, [key, value]) => {
    const parsedValue = isNil(value)
      ? {}
      : constants.breakpoints.has(key)
      ? { [mediaQueryString('min', key)]: getValue(value) }
      : getValue(value);

    return merge({}, acc, parsedValue);
  }, {});
};

/**
 * Returns a function that transforms properties and their values suitable for use
 * in styled components or other css-in-js packages.
 *
 * For example:
 *
 * ```
 * const makeBox = transformProps(paddingAndMarginPropNames);
 *
 * const Box = styled.div`
 *   ${makeBox}
 * `
 *
 * <Box marginVertical="lg" />
 * ```
 *
 * @param {object|function} propertyMap An object in which keys are names of props to be
 *                                      transformed and values are property names to
 *                                      be returned. Also accepts a function that will
 *                                      receive each original prop name and should
 *                                      return the transformed property name.
 * @param {object} staticStyles Additional key-value pairs that will be spread into the
 *                              returned object.
 */
const transformProps = (propertyMap, staticStyles = {}) => props => {
  const getValues = value => {
    // execute recursively on arrays
    if (Array.isArray(value)) {
      return value.map(v => getValues(v));
    }
    const parsedValue = spacing(value);
    return parsedValue || value;
  };

  const assignValue = (property, value) =>
    typeof value === 'object'
      ? mapPropValuesToBreakpoints(value, n => ({ [property]: getValues(n) }))
      : { [property]: getValues(value) };

  let styles = Object.assign({}, staticStyles);

  for (let key in props) {
    const value = props[key];
    const property =
      typeof propertyMap === 'function' ? propertyMap(key) : propertyMap[key];

    if (isNil(value) || isNil(property)) continue;

    if (Array.isArray(property)) {
      styles = merge(
        styles,
        property.reduce(
          (properties, prop) => merge(properties, assignValue(prop, value)),
          {}
        )
      );
    } else {
      styles = merge(styles, assignValue(property, value));
    }
  }

  return styles;
};

/**
 * Padding and margin prop handling
 *
 * Adapted from Brent Jackson's styled-system.
 * @see {@link https://github.com/jxnblk/styled-system/blob/master/src/space.js}
 */
const spaceProps = {
  prefixes: {
    margin: 'margin',
    padding: 'padding',
  },
  suffixes: {
    X: ['Left', 'Right'],
    Y: ['Top', 'Bottom'],
    Horizontal: ['Left', 'Right'],
    Vertical: ['Top', 'Bottom'],
    Top: 'Top',
    Right: 'Right',
    Bottom: 'Bottom',
    Left: 'Left',
  },
};

// /**
//  * Get the padding/margin property key given a prop like `paddingHorizontal`
//  * @param {string} propName Property to parse (e.g. paddingTop or marginX)
//  */
// const getSpacePropKeys = propName => {
//   // split the propName on capital letters, e.g. ['padding', 'Top']
//   const [pre, ...post] = propName.split(/(?=[A-Z])/g);

//   // bail early if the given key isn't one of our space properties
//   if (!has(spaceProps.prefixes, pre)) return null;

//   const prefix = spaceProps.prefixes[pre];
//   const suffix = spaceProps.suffixes[post[0]] || '';

//   // always returns an array
//   return Array.isArray(suffix)
//     ? suffix.map(suf => prefix + suf)
//     : [prefix + suffix];
// };

const space = transformProps(propName => {
  // split the propName on capital letters, e.g. ['padding', 'Top']
  const [pre, ...post] = propName.split(/(?=[A-Z])/g);

  // bail early if the given key isn't one of our space properties
  if (!has(spaceProps.prefixes, pre)) return null;

  const prefix = spaceProps.prefixes[pre];
  const suffix = spaceProps.suffixes[post[0]] || '';

  // always returns an array
  return Array.isArray(suffix)
    ? suffix.map(suf => prefix + suf)
    : [prefix + suffix];
});

// Grid
//
const gridProps = {
  gridTemplateColumns: 'grid-template-columns',
  columns: 'grid-template-columns',
  gridTemplateRows: 'grid-template-rows',
  rows: 'grid-template-rows',
  gridTemplateAreas: 'grid-template-areas',
  gridTemplate: 'grid-template',
  gridAutoColumns: 'grid-auto-columns',
  gridAutoRows: 'grid-auto-rows',
  gridAutoFlow: 'grid-auto-flow',
  columnGap: 'column-gap',
  rowGap: 'row-gap',
  gap: ['gap', 'grid-gap'],
  grid: 'grid',
  justifyItems: 'justify-items',
  alignItems: 'align-items',
  placeItems: 'place-items',
  justifyContent: 'justify-content',
  alignContent: 'align-content',
  placeContent: 'place-content',
};

const makeGrid = transformProps(gridProps, { display: 'grid' });

// Flex
//
const flexProps = {
  flexDirection: 'flex-direction',
  flexWrap: 'flex-wrap',
  flexFlow: 'flex-flow',
  justifyContent: 'justify-content',
  alignItems: 'align-items',
  alignContent: 'align-content',
};

const makeFlex = transformProps(flexProps, { display: 'flex' });

// Child
//
const flexChildProps = {
  order: 'order',
  flex: 'flex',
  flexGrow: 'flex-grow',
  flexShrink: 'flex-shrink',
  flexBasis: 'flex-basis',
  alignSelf: 'align-self',
};

const gridChildProps = {
  gridColumnStart: 'grid-column-start',
  gridColumnEnd: 'grid-column-end',
  gridRowStart: 'grid-row-start',
  gridRowEnd: 'grid-row-end',
  gridColumn: 'grid-column',
  column: 'grid-column',
  col: 'grid-column',
  gridRow: 'grid-row',
  row: 'grid-row',
  gridArea: 'grid-area',
  justifySelf: 'justify-self',
  alignSelf: 'align-self',
  placeSelf: 'place-self',
};

const makeBox = transformProps({ ...flexChildProps, ...gridChildProps });

export {
  makeBox,
  makeFlex,
  makeGrid,
  mapPropValuesToBreakpoints,
  media,
  mediaMax,
  mediaMin,
  mediaQuery,
  mediaQueryString,
  space,
};
