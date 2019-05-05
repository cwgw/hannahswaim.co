import { lineHeight, rem, fontSizes } from 'style/sizing';

import fanwood from 'fonts/fanwood_text-webfont.woff';
import fanwoodItalic from 'fonts/fanwood_text_italic-webfont.woff';

const sansSerif =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';
const serif = '"Fanwood", "Merriweather", "Georgia", serif';

const style = {
  html: {
    fontSize: `${fontSizes.base}px`,
  },
  body: {
    fontFamily: serif,
    fontSize: rem(fontSizes.base),
    fontWeight: 'normal',
  },
  h1: {
    fontSize: rem(fontSizes.h1),
    fontWeight: 'normal',
    lineHeight: lineHeight(fontSizes.h1),
  },
  h2: {
    fontSize: rem(fontSizes.h2),
    fontWeight: 'normal',
    lineHeight: lineHeight(fontSizes.h2),
  },
  h3: {
    fontSize: rem(fontSizes.h3),
    fontWeight: 'normal',
    lineHeight: lineHeight(fontSizes.h3),
  },
  h4: {
    fontSize: rem(fontSizes.h4),
    fontWeight: 'normal',
    lineHeight: lineHeight(fontSizes.h4),
  },
  h5: {
    fontSize: rem(fontSizes.h5),
    fontWeight: 'normal',
    lineHeight: lineHeight(fontSizes.h5),
  },
  h6: {
    fontSize: rem(fontSizes.h6),
    fontWeight: 'normal',
    lineHeight: lineHeight(fontSizes.h6),
  },
  hero: {
    fontFamily: serif,
    fontSize: rem(fontSizes.display),
    lineHeight: lineHeight(fontSizes.display),
  },
  lead: {
    fontFamily: sansSerif,
    fontSize: rem(fontSizes.lead),
    lineHeight: lineHeight(fontSizes.lead),
  },
  icon: {
    fontSize: rem(fontSizes.lead),
  },
};

const fontFaces = [
  {
    'font-family': 'Fanwood',
    'font-style': 'normal',
    src: `url(${fanwood}) format('woff')`,
  },
  {
    'font-family': 'Fanwood',
    'font-style': 'italic',
    src: `url(${fanwoodItalic}) format('woff')`,
  },
];

export { fontFaces, sansSerif, serif, style };
