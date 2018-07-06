import _zipObject from 'lodash/zipObject'

export const zIndex = {
  postNavigation: 900,
  banner: 1000,
  modal: 1100,
}

export const fontSizeRoot = 16

export const scale = {
  f: 1,
  r: 2,
  n: 3,
}

export const ease = 'cubic-bezier(0.4, 0.0, 0.2, 1)'

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

export const brandColors = [
  '#19000e',
  '#530d1b',
  '#862828',
  '#ead4c0',
  '#f5ede3',
  '#fffbf5',
]

export const colors = {
  body: brandColors[1],
  link: brandColors[2],
  white: brandColors[5],
  black: brandColors[0],
  coolBlack: '#191720',
}

export const shadows = [
  'none',                                                                   // depth 0
  '0  2px 2px  0 rgba(0, 0, 0, 0.16), 0  0    2px 0 rgba(0, 0, 0, 0.12)',   // depth 1
  '0  2px 5px  0 rgba(0, 0, 0, 0.16), 0  2px 10px 0 rgba(0, 0, 0, 0.12)',   // depth 2
  '0  8px 17px 0 rgba(0, 0, 0, 0.20), 0  6px 20px 0 rgba(0, 0, 0, 0.19)',   // depth 3
  '0 12px 15px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19)',   // depth 4
  '0 16px 28px 0 rgba(0, 0, 0, 0.22), 0 25px 55px 0 rgba(0, 0, 0, 0.21)',   // depth 5
  '0 27px 24px 0 rgba(0, 0, 0, 0.20), 0 40px 77px 0 rgba(0, 0, 0, 0.22)'    // depth 6
]
