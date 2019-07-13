import fanwood from 'fonts/fanwood_text-webfont.woff';
import fanwoodItalic from 'fonts/fanwood_text_italic-webfont.woff';

const sans = {
  family:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  lineHeight: 7 / 5,
};

const serif = {
  family: '"Fanwood", "Merriweather", "Georgia", serif',
  lineHeight: 4 / 3,
};

const fonts = [
  {
    'font-family': 'Fanwood',
    'font-style': 'normal',
    'font-weight': 'normal',
    src: `url(${fanwood}) format('woff')`,
  },
  {
    'font-family': 'Fanwood',
    'font-style': 'italic',
    'font-weight': 'normal',
    src: `url(${fanwoodItalic}) format('woff')`,
  },
];

export { fonts, sans, serif };
