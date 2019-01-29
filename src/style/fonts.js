import _has from 'lodash/has'

import tinosRegular from 'fonts/Tinos-Regular.woff2'
import tinosRegularItalic from 'fonts/Tinos-Italic.woff2'
import tinosBold from 'fonts/Tinos-Bold.woff2'
import interUIRegular from 'fonts/Inter-UI-Regular.woff2'
import interUIRegularItalic from 'fonts/Inter-UI-Italic.woff2'
import interUIBlack from 'fonts/Inter-UI-Black.woff2'

const sansSerif = `"Inter UI", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif`

const serif = `"Tinos"`

const sizes = {
  base: 4,
  small: 3,
  large: 5,
  display: 11,
  lead: 7,
  h1: 13,
  h2: 10,
  h3: 7,
  h4: 6,
  h5: 5,
  h6: 4,
}

const step = (n) => (Math.trunc((n - 2) / 4) + 1) * 2
const size = (n) => {
  if (typeof n === 'string' && _has(sizes, n)) {
    return size(sizes[n])
  }
  return (Number.isInteger(n) && n > 0)
    ? size(n - 1) + step(n - 1)
    : 8
}
const snapToGrid = (n, base = 8) => Math.ceil((n + (0.5 * base)) / base) * base
const lineHeight = (n) =>  snapToGrid(n) / n

const toRem = (n) => n / size('base')
const rem = (n) => `${toRem(n)}rem`
const px = (n) => `${n}px`

const style = {
  html: {
    fontSize: px(size('base')),
  },
  body: {
    fontFamily: serif,
    fontSize: rem(size('base')),
    fontWeight: 400,
    lineHeight: lineHeight(size('base')),
  },
  h1: {
    fontFamily: sansSerif,
    fontWeight: 700,
    fontSize: rem(size('h1')),
    lineHeight: lineHeight(size('h1')),
    marginBottom: `${lineHeight(size('h1')) / 2}em`,
  },
  h2: {
    fontSize: rem(size('h2')),
    fontWeight: 400,
    lineHeight: lineHeight(size('h2')),
    marginBottom: `${lineHeight(size('h2')) / 2}em`,
  },
  h3: {
    fontSize: rem(size('h3')),
    fontWeight: 700,
    lineHeight: lineHeight(size('h3')),
    marginBottom: `${lineHeight(size('h3')) / 2}em`,
  },
  h4: {
    fontSize: rem(size('h4')),
    fontWeight: 700,
    lineHeight: lineHeight(size('h4')),
    marginBottom: `${lineHeight(size('h4')) / 2}em`,
  },
  h5: {
    fontSize: rem(size('h5')),
    fontWeight: 700,
    lineHeight: lineHeight(size('h5')),
    marginBottom: `${lineHeight(size('h5')) / 2}em`,
  },
  h6: {
    fontSize: rem(size('h6')),
    fontWeight: 700,
    lineHeight: lineHeight(size('h6')),
    marginBottom: `${lineHeight(size('h6')) / 2}em`,
  },
  hero: {
    fontWeight: 700,
    fontSize: rem(size('display')),
    lineHeight: lineHeight(size('display')),
  },
  lead: {
    fontSize: rem(size('lead')),
    lineHeight: lineHeight(size('lead')),
  }
}

const fontFaces = [
  {
    "font-family": 'Tinos',
    "font-style": 'normal',
    "font-weight": '400',
    src: `local('Tinos-Regular'), url(${tinosRegular}) format('woff2')`,
  },
  {
    "font-family": 'Tinos',
    "font-style": 'italic',
    "font-weight": '400',
    src: `local('Tinos-Italic'), url(${tinosRegularItalic}) format('woff2')`,
  },
  {
    "font-family": 'Tinos',
    "font-style": 'normal',
    "font-weight": '700',
    src: `local('Tinos-Bold'), url(${tinosBold}) format('woff2')`,
  },
  {
    "font-family": 'Inter UI',
    "font-style":  'normal',
    "font-weight": '400',
    src: `url(${interUIRegular}) format('woff2')`,
  },
  {
    "font-family": 'Inter UI',
    "font-style":  'italic',
    "font-weight": '400',
    src: `url(${interUIRegularItalic}) format('woff2')`,
  },
  {
    "font-family": 'Inter UI',
    "font-style":  'normal',
    "font-weight": '900',
    src: `url(${interUIBlack}) format('woff2')`,
  },
]

const fontFaceDeclarations = () => fontFaces.map((font) => (`
  @font-face {
    font-family: ${font.family};
    font-style: ${font.style};
    font-weight: ${font.weight};
    src: ${font.src};
    font-display: swap;
  }
`)).join('')

export {
  fontFaces,
  fontFaceDeclarations,
  lineHeight,
  px,
  rem,
  sansSerif,
  serif,
  size,
  style,
}
