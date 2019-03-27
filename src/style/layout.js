import { css } from 'styled-components'
import { em } from 'polished'
import isNil from 'lodash/isNil'
import merge from 'lodash/merge'
import has from 'lodash/has'
import zipObject from 'lodash/zipObject'

import * as constants from 'style/constants'
import { spacing } from 'style/sizing'

/**
 * media queries and related utilities
 *
 */
const minWidth = (n) => `@media (min-width: ${em(n)})`

const maxWidth = (n) => `@media (max-width: ${em(n - 1)})`

const media = constants.breakpointKeys.reduce((acc, key) => {
  const breakpoint = constants.breakpoints.get(key)
  acc.min[key] = (...args) => css`${minWidth(breakpoint)} { ${css(...args)} }`
  acc.max[key] = (...args) => css`${maxWidth(breakpoint)} { ${css(...args)} }`
  return acc
}, {min: {}, max: {}})

const returnValue = o => o

const mediaQueryKeys = [
  'base',
  ...constants.breakpointKeys
]

const mapValuesToBreakpoints = (values, getValue = returnValue) => {
  // arrays of values get mapped to corresponding breakpoints in order
  // e.g. [0,,1,,'30px']
  if (Array.isArray(values)) {
    values = zipObject(mediaQueryKeys, values);
  }
  // object keys get matched with breakpointKeys, or else
  // {sm: ..., lg: ..., xl: ...}
  return Object.entries(values).reduce((acc, [key, value]) => {
    const parsedValue = isNil(value)
      ? {}
      : constants.breakpoints.has(key)
        ? { [minWidth(constants.breakpoints.get(key))]: getValue(value) }
        : getValue(value)

    return merge({}, acc, parsedValue)
  }, {})
}

/**
 * Padding and margin prop handling
 *
 * Adapted from Brent Jackson's styled-system.
 * See {@link https://github.com/jxnblk/styled-system/blob/master/src/space.js}
 */
 const spaceProperties = {
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
   }
 }

const getSpaceProperties = (propName) => {
  // split the propName on capital letters, e.g. ['padding', 'Top']
  const [pre, ...post] = propName.split(/(?=[A-Z])/g)

  // bail early if the given key isn't one of our space properties
  if (!has(spaceProperties.prefixes, pre)) return null

  const prefix = spaceProperties.prefixes[pre]
  const suffix = spaceProperties.suffixes[post[0]] || ''

  // always returns an array
  return Array.isArray(suffix)
    ? suffix.map(suf => prefix + suf)
    : [ prefix + suffix ]
}

const getSpaceValue = (value) => {
  if (Array.isArray(value)) return value.map(v => getSpaceValue(v));
  const parsedValue = spacing(value);
  return parsedValue || value;
}

/**
 * Props
 */

const assignPropertyValue = (property, value) => {
  return typeof value === 'object'
    ? mapValuesToBreakpoints(value, (n) => ({[property]: getSpaceValue(n)}))
    : {[property]: getSpaceValue(value)}
}

/**
 * Loop through props looking for those that match supplied 
*/
const mapProps = (propertyMap, staticStyles = {}) => (props) => {
  let styles = Object.assign({}, staticStyles);
  for (let key in props) {
    const value = props[key]
    const property = typeof propertyMap === 'function' ? propertyMap(key) : propertyMap[key]

    if (isNil(value) || isNil(property)) continue;

    if (Array.isArray(property)) {
      styles = merge(styles, property.reduce((properties, prop) => merge(properties, assignPropertyValue(prop, value)), {}));
    } else {
      styles = merge(styles, assignPropertyValue(property, value));
    }
  }
  return styles;
}

const space = mapProps(getSpaceProperties)

// Grid
//
const gridProperties = {
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
}

const makeGrid = mapProps(gridProperties, {display: 'grid'})

// Flex
//
const flexProperties = {
  flexDirection: 'flex-direction',
  flexWrap: 'flex-wrap',
  flexFlow: 'flex-flow',
  justifyContent: 'justify-content',
  alignItems: 'align-items',
  alignContent: 'align-content',
}

const makeFlex = mapProps(flexProperties, {display: 'flex'})

// Child
//
const flexChildProperties = {
  order: 'order',
  flex: 'flex',
  flexGrow: 'flex-grow',
  flexShrink: 'flex-shrink',
  flexBasis: 'flex-basis',
  alignSelf: 'align-self',
}

const gridChildProperties = {
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
}

const makeBox = mapProps({...flexChildProperties, ...gridChildProperties})

export {
  makeBox,
  makeFlex,
  makeGrid,
  mapValuesToBreakpoints,
  maxWidth,
  media,
  minWidth,
  space,
}
