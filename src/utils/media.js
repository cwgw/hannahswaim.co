import { css } from 'styled-components'
import { em } from 'polished'
import _isNil from 'lodash/isNil'
import _merge from 'lodash/merge'

import * as constants from 'utils/constants'


export const minWidth = (n) => `@media (min-width: ${em(n)})`

export const maxWidth = (n) => `@media (max-width: ${em(n - 1)})`

export const media = Object.keys(constants.breakpoints).reduce((acc, key) => {
  const breakpoint = constants.breakpoints[key]
  acc.min[key] = (...args) => css`${minWidth(breakpoint)} { ${css(...args)} }`
  acc.max[key] = (...args) => css`${maxWidth(breakpoint)} { ${css(...args)} }`
  return acc
}, {min: {}, max: {}})

export default media

const returnArgs = o => o

const queries = [
  null,
  ...constants.breakpointValues.map(minWidth)
]

export const spreadValues = (values, parseValue = returnArgs) => {

  if (Array.isArray(values)) {
    // arrays of values (e.g. [0,,1,,'30px']) get mapped to corresponding breakpoints
    return values.reduce((acc, value, index) =>
      _merge(acc, _isNil(value)
        ? {}
        : queries[index]
          ? {[queries[index]]: parseValue(value)}
          : parseValue(value)
      ),
    {})
  }

  // {
  //   sm: ...,
  //   lg: ...,
  //   xl: ...
  // }

  return Object.entries(values).reduce((acc, [key, value]) =>
    _merge(acc, _isNil(value)
      ? {}
      : constants.breakpoints[key]
        ? {[minWidth(constants.breakpoints[key])]: parseValue(value)}
        : parseValue(value)
    ),
  {})
}
