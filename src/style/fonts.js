import {
  lineHeight,
  rem,
  fontSizes,
} from 'style/sizing'

import tinosRegular from 'fonts/Tinos-Regular.woff2'
import tinosRegularItalic from 'fonts/Tinos-Italic.woff2'
import tinosBold from 'fonts/Tinos-Bold.woff2'
import interUIRegular from 'fonts/Inter-UI-Regular.woff2'
import interUIRegularItalic from 'fonts/Inter-UI-Italic.woff2'
import interUIBlack from 'fonts/Inter-UI-Black.woff2'

const sansSerif = `"Inter UI", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif`

const serif = `Tinos, Merriweather, Georgia, serif`

const style = {
  html: {
    fontSize: `${fontSizes.base}px`,
  },
  body: {
    fontFamily: serif,
    fontSize: rem(fontSizes.base),
    fontWeight: 400,
    lineHeight: lineHeight(fontSizes.base),
  },
  h1: {
    fontWeight: 700,
    fontSize: rem(fontSizes.h1),
    lineHeight: lineHeight(fontSizes.h1),
    marginBottom: `${lineHeight(fontSizes.h1) / 2}em`,
  },
  h2: {
    fontSize: rem(fontSizes.h2),
    fontWeight: 700,
    lineHeight: lineHeight(fontSizes.h2),
    marginBottom: `${lineHeight(fontSizes.h2) / 2}em`,
  },
  h3: {
    fontSize: rem(fontSizes.h3),
    fontWeight: 700,
    lineHeight: lineHeight(fontSizes.h3),
    marginBottom: `${lineHeight(fontSizes.h3) / 2}em`,
  },
  h4: {
    fontSize: rem(fontSizes.h4),
    fontWeight: 700,
    lineHeight: lineHeight(fontSizes.h4),
    marginBottom: `${lineHeight(fontSizes.h4) / 2}em`,
  },
  h5: {
    fontSize: rem(fontSizes.h5),
    fontWeight: 700,
    lineHeight: lineHeight(fontSizes.h5),
    marginBottom: `${lineHeight(fontSizes.h5) / 2}em`,
  },
  h6: {
    fontSize: rem(fontSizes.h6),
    fontWeight: 700,
    lineHeight: lineHeight(fontSizes.h6),
    marginBottom: `${lineHeight(fontSizes.h6) / 2}em`,
  },
  hero: {
    fontWeight: 700,
    fontSize: rem(fontSizes.display),
    lineHeight: lineHeight(fontSizes.display),
  },
  lead: {
    fontSize: rem(fontSizes.lead),
    lineHeight: lineHeight(fontSizes.lead),
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
  sansSerif,
  serif,
  style,
}
