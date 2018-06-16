import _zipObject from 'lodash/zipObject'

export const breakpointKeys = [
  'none',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'nav'
]

export const breakpointValues = [
  0,
  480,
  576,
  768,
  992,
  1120,
  576
]

export const breakpoints = _zipObject(breakpointKeys,breakpointValues)

export default breakpoints