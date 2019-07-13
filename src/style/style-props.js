import has from 'lodash/has';
import isNil from 'lodash/isNil';
import merge from 'lodash/merge';
import zipObject from 'lodash/zipObject';

import { breakpoints } from 'style/tokens';
import spacing from 'style/spacing';
import { mediaQueryString } from 'style/media-queries';

const breakpointKeys = ['base', ...Array.from(breakpoints.keys())];

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
      : breakpoints.has(key)
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
 *
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

/**
 * Get the padding/margin property key given a prop like `paddingHorizontal`
 */
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

// grid
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

// flex
//
const flexboxProps = {
  flexDirection: 'flex-direction',
  flexWrap: 'flex-wrap',
  flexFlow: 'flex-flow',
  justifyContent: 'justify-content',
  alignItems: 'align-items',
  alignContent: 'align-content',
};

const makeFlexbox = transformProps(flexboxProps, { display: 'flex' });

// grid/flex children
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

export { makeBox, makeFlexbox, makeGrid, mapPropValuesToBreakpoints, space };
