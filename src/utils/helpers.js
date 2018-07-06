/**
 * Cached Object.prototype.hasOwnProperty method.
 * See {@link https://github.com/airbnb/javascript#objects--prototype-builtins AirBnB}
 *
 * @param  {object} obj The Object to test
 * @param  {string} key The String name or symbol of the property to test
 * @return {boolean}    The result of Object.hasOwnProperty
 */
export const has = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key)

/**
 * Quick test against undefined and null
 * @param  {mixed} variable The binding to test
 * @return {boolean}         True if `variable` is not `null` or `undefined`, otherwise false
 */
export const isSet = (variable) => 'undefined' !== typeof variable && null !== variable

/**
 * Round a float to n decimal places
 * @param  {Number} number    The value to round
 * @param  {Number} precision Maximum number of decimal places for return value
 * @return {Number}           Rounded number
 */
export const round = (number, precision = 1) => {
  if (isNaN(parseFloat(number))) {
    return number
  }
  const factor = Math.pow(10, precision)
  return (Math.round(number * factor) / factor)
}
