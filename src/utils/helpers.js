/**
 * Cached Object.prototype.hasOwnProperty method.
 * See {@link https://github.com/airbnb/javascript#objects--prototype-builtins AirBnB}
 *
 * @param  {Object} obj The Object to test
 * @param  {String} key The String name or symbol of the property to test
 * @return {Boolean}    The result of Object.hasOwnProperty
 */
export const has = (obj, key) => {
  if ('object' !== typeof obj) {
    return false
  }
  return Object.prototype.hasOwnProperty.call(obj, key)
}

/**
 * Cached Object.prototype.hasOwnProperty method.
 * See {@link https://github.com/airbnb/javascript#objects--prototype-builtins AirBnB}
 *
 * @param  {Object} obj The Object to test
 * @param  {String} key The String name or symbol of the property to test
 * @return {Boolean}    The result of Object.hasOwnProperty
 */
export const hasDeep = (obj, key) => {
  const properties = key.split('.')
  let tmpObj = obj

  for (let i = 0; i < properties.length; i++) {
    let prop = properties[i]

    if (!tmpObj || !has(tmpObj, prop)) {
      return false
    } else {
      tmpObj = tmpObj[prop]
    }
  }

  return true
}

/**
 * Quick test against undefined and null
 *
 * @param  {Mixed} variable The binding to test
 * @return {Boolean}         True if `variable` is not `null` or `undefined`, otherwise false
 */
export const isSet = (variable) => typeof variable !== 'undefined' && variable !== null

/**
 * Round a float to n decimal places
 *
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

/**
 * See {@link https://github.com/jxnblk/styled-system/blob/master/src/util.js#L29}
 */
export const merge = (a, b) => Object.assign({}, a, b, Object
  .keys(b || {}).reduce((obj, key) =>
    Object.assign(obj, {
      [key]: a[key] !== null && typeof a[key] === 'object'
      ? merge(a[key], b[key])
      : b[key]
    }),
    {}))

/**
 * Capitalize the first letter of a string
 *
 * @param  {String} str The string to be manipulated
 * @return {String}     A copy of the string provided with the first letter capitalized
 */
export const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1)

/**
 * Capitalize the first letter of a string, and convert the rest to lower case
 *
 * @param  {String} str The string to be manipulated
 * @return {String}     A copy of the string provided with the first letter capitalized
 *                        and the rest lowercase
 */
export const capitalizeFirstLetterOnly = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
