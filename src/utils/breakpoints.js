import _zipObject from 'lodash/zipObject'

export const breakpointKeys = [
  'none',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'nav',
  'modal',
]

export const breakpointValues = [
  0,
  480,
  576,
  768,
  992,
  1200,
  576,
  768,
]

export const breakpoints = _zipObject(breakpointKeys,breakpointValues)

export default breakpoints