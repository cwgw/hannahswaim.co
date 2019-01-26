import { spreadValues } from './media'
import { fontSizeRoot, defaultScale } from './constants'
import { round, isSet, merge } from './helpers'

export const scale = (i, {f, r, n} = defaultScale) => f * Math.pow(r, i / n)

export const remToPx = (n, fontSize = fontSizeRoot) => parseFloat(n) * fontSize

export const spacing = (i = 0, units = 'rem') => {

  if ('none' === units || false === units) {
    return round(scale(i), 3)
  }

  if ('px' === units || !units) {
    return round(remToPx(scale(i)), 1) + (units || 0)
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

const spaceProperties = {
  margin: 'margin',
  padding: 'padding',
}

const spaceDirections = {
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
const getSpaceProperties = (key) => {

  // split the key on capital letters, e.g. ['padding', 'Top']
  const [ keyProp, ...keyDir ] = key.split(/(?=[A-Z])/)

  const property = spaceProperties[keyProp]

  // bail early if the given key isn't one of our space properties
  if (!property) {
    return null
  }

  const direction = spaceDirections[keyDir] || ''

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
const getSpaceValue = (value) => {
  if (Array.isArray(value)) {
    return value
      .map(val => typeof val === 'number' ? spacing(val) : val )
      .join(' ')
  }

  return typeof value === 'number' ? spacing(value) : value
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
      const properties = getSpaceProperties(key)

      if (!isSet(val) || !isSet(properties)) {
        return null
      }

      if (Array.isArray(val) || typeof val === 'object') {
        return properties.reduce((acc, prop) => (
          merge(acc, spreadValues(val, (n) => ({[prop]: getSpaceValue(n)})))
        ), {})
      } else {
        return properties.reduce((acc, prop) => ({
          ...acc,
          [prop]: getSpaceValue(val),
        }), {})
      }
    })
    .reduce(merge, {})
}
