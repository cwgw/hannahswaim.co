import fanwood from './fanwood_text-webfont.woff';
import fanwoodItalic from './fanwood_text_italic-webfont.woff';

export default [
  {
    fontFamily: 'Fanwood',
    fontDisplay: 'swap',
    fontStyle: 'normal',
    fontWeight: 'normal',
    src: `url(${fanwood}) format('woff')`,
  },
  {
    fontFamily: 'Fanwood',
    fontDisplay: 'swap',
    fontStyle: 'italic',
    fontWeight: 'normal',
    src: `url(${fanwoodItalic}) format('woff')`,
  },
];
