import _zipObject from 'lodash/zipObject'

export const zIndex = {
  postNavigation: 900,
  banner: 1000,
  modal: 1100,
}

export const fontSizeRoot = 16

export const borderRadius = '4px'

export const containerWidth = '832px'

export const defaultScale = {
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

export const grays = [
  '#191720',
  '#343040',
  '#504a5b',
  '#7b7483',
  '#a9a4ae',
  '#cac7cc',
  '#ededee',
]

export const greens = [
  '#02201c',
  '#053630',
  '#185c4c',
  '#5cb899',
  '#89d6b4',
  '#bbedd2',
  '#e4fbea',
]

export const brandColors = [
  '#19000e',
  '#530d1b',
  '#862828',
  '#b86e5c',
  '#ead4c0',
  '#f5ede3',
  '#fffbf5',
]

export const colors = {
  // body: brandColors[1],
  green: greens,
  gray: grays,
  brand: brandColors,
  body: grays[1],
  link: brandColors[3],
  navbar: brandColors[2],
  // link: greens[2],
  white: brandColors[6],
  black: brandColors[0],
  coolBlack: grays[0],
  background: '#fff',
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
