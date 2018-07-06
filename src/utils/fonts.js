import tinosRegular from 'fonts/Tinos-Regular.woff2'
import tinosRegularItalic from 'fonts/Tinos-Italic.woff2'
import tinosBold from 'fonts/Tinos-Bold.woff2'
import interUIRegular from 'fonts/Inter-UI-Regular.woff2'
import interUIRegularItalic from 'fonts/Inter-UI-Italic.woff2'
import interUIBlack from 'fonts/Inter-UI-Black.woff2'

const fonts = [
  {
    family: 'Tinos',
    style: 'normal',
    weight: '400',
    src: `local('Tinos-Regular'), url(${tinosRegular}) format('woff2')`,
  },
  {
    family: 'Tinos',
    style: 'italic',
    weight: '400',
    src: `local('Tinos-Italic'), url(${tinosRegularItalic}) format('woff2')`,
  },
  {
    family: 'Tinos',
    style: 'normal',
    weight: '700',
    src: `local('Tinos-Bold'), url(${tinosBold}) format('woff2')`,
  },
  {
    family: 'Inter UI',
    style:  'normal',
    weight: '400',
    src: `url(${interUIRegular}) format('woff2')`,
  },
  {
    family: 'Inter UI',
    style:  'italic',
    weight: '400',
    src: `url(${interUIRegularItalic}) format('woff2')`,
  },
  {
    family: 'Inter UI',
    style:  'normal',
    weight: '900',
    src: `url(${interUIBlack}) format('woff2')`,
  },
]

export const fontfaceDeclarations = () => fonts.map((font) => (`
  @font-face {
    font-family: ${font.family};
    font-style: ${font.style};
    font-weight: ${font.weight};
    src: ${font.src};
  }
`))

export default {
  sansSerif: '"Inter UI", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
  serif: '"Tinos"',
}