import PropTypes from 'prop-types'

import { fontSizeRoot, defaultScale } from 'utils/constants'
import { round, isSet, has, merge } from 'utils/helpers'

export const scale = (i, {f, r, n} = defaultScale) => f * Math.pow(r, i / n)

const spacing = (i, units = 'rem') => {

  if ('none' === units || false === units) {
    return round(scale(i), 3)
  }

  if ('px' === units) {
    return round(scale(i) * fontSizeRoot, 1) + units
  }

  if ('em' === units || 'rem' === units) {
    return round(scale(i), 3) + units
  }

  return i
}

export default spacing

/**
 * Padding and margin prop handling
 *
 * Adapted from Brent Jackson's styled-system.
 * See {@link https://github.com/jxnblk/styled-system/blob/master/src/space.js}
 */

const properties = {
  margin: 'margin',
  padding: 'padding',
}

const directions = {
  Top: 'Top',
  Right: 'Right',
  Bottom: 'Bottom',
  Left: 'Left',
  X: ['Left', 'Right'],
  Y: ['Top', 'Bottom'],
  Horizontal: ['Left', 'Right'],
  Vertical: ['Top', 'Bottom'],
}

/**
 * Check property name against our property and direction maps
 *
 * Adapted from styled system which uses prop naming like
 * `m` for `margin` and `mb` for `marginBottom`.
 *
 * I've opted for longer prop names, but the maps above are still
 * useful in cases like `paddingX` which will return an array of
 * two items.
 *
 * Also, checking against our properties object means the `space`
 * function below will fail gracefully when supplied props other
 * than 'margin' and 'padding.'
 *
 * @param  {String} key The property name
 * @return {Array}      An array of css property names
 */
const getProperties = (key) => {

  // split the key on capital letters, e.g. ['padding', 'Top']
  const [ keyProp, ...keyDir ] = key.split(/(?=[A-Z])/)

  // bail early if the
  if (!has(properties, keyProp)) {
    return null
  }

  const property = properties[keyProp] || ''
  const direction = directions[keyDir] || ''
  return Array.isArray(direction)
    ? direction.map(dir => property + dir)
    : [ property + direction ]
}

/**
 * Process margin and padding prop values
 *
 * @param  {Mixed} value The value to process.
 * @return {String}      The processed, css-ready value
 */
const getValue = (value) => {
  if (Array.isArray(value)) {
    return value
      .map(val => isNaN(val) ? val : spacing(val))
      .join(' ')
  }

  return isNaN(value) ? value : spacing(value)
}

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
export const space = (props) => () => {
  const keys = Object.keys(props)

  return keys
    .map(key => {
      const val = props[key]
      const properties = getProperties(key)

      const styles = isSet(val) && isSet(properties)
        ? properties.reduce((acc, prop) => ({
          ...acc,
          [prop]: getValue(val)
        }), {})
        : null

      return styles
    })
    .reduce(merge, {})
}

const getProps = () => {

  let props = []
  let types = {}

  for (let prop in properties) {
    props.push(prop)
    types[prop] = PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.string,
      PropTypes.number,
    ])

    for (let dir in directions) {
      props.push(prop + dir)
      types[prop + dir] = PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ])
    }
  }

  return {
    types: types,
    list: props,
  }
}

export const spaceProps = getProps()
