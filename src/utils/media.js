import { css } from 'styled-components'
import { em } from 'polished'

import { breakpoints, breakpointKeys } from 'utils/constants'

export const media = breakpointKeys.reduce((acc, label) => {
  acc.min[label] = (...args) => css`
    @media (min-width: ${em(breakpoints[label])}) {
      ${css(...args)}
    }
  `
  acc.max[label] = (...args) => css`
    @media (max-width: ${em(breakpoints[label]  - 1)}) {
      ${css(...args)}
    }
  `
  return acc
}, {min: {}, max: {}})

export default media
