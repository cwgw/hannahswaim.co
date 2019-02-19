import { css } from 'styled-components'
import { em } from 'polished'
import _isNil from 'lodash/isNil'
import _merge from 'lodash/merge'
import _has from 'lodash/has'

import * as constants from 'style/constants'
import { rem, px } from 'style/fonts'


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

const mediaQueries = [
  null,
  ...constants.breakpointValues.map(minWidth)
]

const spreadValues = (values, getValue = returnValue) => {
  // arrays of values get mapped to corresponding breakpoints in order
  // e.g. [0,,1,,'30px']
  if (Array.isArray(values)) {
    return values.reduce((acc, value, index) => (
      _merge(acc, _isNil(value)
        ? {}
        : mediaQueries[index]
          ? {[mediaQueries[index]]: getValue(value)}
          : getValue(value)
      )
    ), {})
  }
  // object keys get matched with breakpointKeys, or else
  // {sm: ..., lg: ..., xl: ...}
  return Object.entries(values).reduce((acc, [key, value]) => {
    const parsedValue = _isNil(value)
      ? {}
      : constants.breakpoints.has(key)
        ? {[minWidth(constants.breakpoints.get(key))]: getValue(value)}
        : getValue(value)

    return _merge(acc, parsedValue)
  }, {})
}

/**
 * Spacing
 */
const step = (n) => (Math.trunc((n - 1) / 3) + 1) * 4
const size = (n) => n <= 0 ? 4 : size(n - 1) + step(n - 1)

const spacingConstants = {
  default: 3,
  xxs: 0,
  xs: 1,
  sm: 2,
  md: 3,
  lg: 5,
  xl: 7,
  xxl: 10,
}

const spacing = (i = 3, units = 'px') => {
  if (typeof i === 'string') {
    return spacingConstants[i]
      ? spacing(spacingConstants[i], units)
      : 0;
  }
  if ('px' === units) {
    return px(size(i))
  }
  if ('em' === units || 'rem' === units) {
    return rem(size(i))
  }
  return size(i)
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

/**
 * Check property name against our property and direction maps
 *
 * Adapted from styled-system which uses prop naming like
 * `m` for `margin` and `mb` for `marginBottom`.
 *
 * @param  {String} key The property name
 * @return {Array}      An array of css property names
 */
const getSpaceProperties = (propName) => {
  // split the propName on capital letters, e.g. ['padding', 'Top']
  const [pre, ...post] = propName.split(/(?=[A-Z])/g)

  // bail early if the given key isn't one of our space properties
  if (!_has(spaceProperties.prefixes, pre)) return null

  const prefix = spaceProperties.prefixes[pre]
  const suffix = spaceProperties.suffixes[post[0]] || ''

  return Array.isArray(suffix)
    ? suffix.map(s => prefix + s)
    : [prefix + suffix]
}

/**
 * Process margin and padding prop values
 *
 * @param  {Mixed} value The value to process.
 * @return {String}      The processed, css-ready value
 */
const getSpaceValue = (value) => (
  (typeof value === 'number' || _has(spacingConstants, value))
    ? spacing(value)
    : (Array.isArray(value))
      ? value.map(v => getSpaceValue(v))
      : value
)

/**
 * Turn react props into css property declarations.
 *
 * Should be used in tagged template literals such as those
 * expected by styled-complonents.
 *
 * Given react props like `margin` and `paddingTop`, this
 * function parses the props and their values and returns
 *
 *
 * @param  {[type]} props) [description]
 * @return {[type]}        [description]
 */
const space = (props) => () => {
  const keys = Object.keys(props)

  return keys
    .map(key => {
      const val = props[key]
      const properties = getSpaceProperties(key)

      if (_isNil(val) || _isNil(properties)) return null

      if (Array.isArray(val) || typeof val === 'object') {
        return properties.reduce((acc, prop) => (
          _merge(acc, spreadValues(val, (n) => ({[prop]: getSpaceValue(n)})))
        ), {})
      } else {
        return properties.reduce((acc, prop) => ({
          ...acc,
          [prop]: getSpaceValue(val),
        }), {})
      }
    })
    .reduce(_merge, {})
}

/**************************************/

/**
 * merge two objects recursively
 *
 * See {@link https://github.com/jxnblk/styled-system/blob/master/src/index.js#L34}
 */
const merge = (a, b) => (
  Object.assign(
    {},
    a,
    b,
    Object.keys(b || {}).reduce(
      (obj, key) =>
        Object.assign(obj, {
          [key]:
            a[key] !== null && typeof a[key] === 'object'
              ? merge(a[key], b[key])
              : b[key],
        }),
      {}
    )
  )
)

const parseValue = (value) => {
  if (Array.isArray(value)) {
    return value.map(v => parseValue(v))
  }
  if (typeof value === 'number') {
    return spacing(value)
  }
  return value
}

const mapProps = (propertyMap, staticStyles = {}) => (props) => {

  return Object.keys(propertyMap).reduce((acc, key) => {

    const value = props[key]
    const property = propertyMap[key]

    if (_isNil(value)) {
      return acc
    }

    if (Array.isArray(property)) {
      return merge(acc, property
        .map(p => typeof value === 'object'
          ? spreadValues(value, (n) => ({[p]: parseValue(n)}))
          : {[p]: parseValue(value)}
        )
        .reduce(merge))
    }

    return typeof value === 'object'
      ? merge(acc, spreadValues(value, (n) => ({[property]: parseValue(n)})))
      : merge(acc, {[property]: parseValue(value)})

  }, staticStyles)
}

// Grid
//
const gridProperties = {
  gridTemplateColumns: 'grid-template-columns',
  gridTemplateRows: 'grid-template-rows',
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

// Flex and Grid descendant properties
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
  gridRow: 'grid-row',
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
  maxWidth,
  media,
  minWidth,
  space,
  spacing,
  spreadValues,
}
