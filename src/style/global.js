import fonts from 'assets/fonts';
import { type } from './shared';
import { gridColumnTemplate } from './utils';

export default {
  ':root': {
    '--standard-grid-columns': gridColumnTemplate(),
    '@font-face': fonts,
  },
  html: {
    height: 'auto',
    minHeight: 'auto',
    boxSizing: 'border-box',
    MsOverflowStyle: 'scrollbar',
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    WebkitOverflowScrolling: 'touch',
    ...type.html,
  },
  '*, *::before, *::after': {
    boxSizing: 'inherit',
  },
  '::selection': {
    background: 'green.3',
    color: 'white',
  },
  '*:focus': {
    outline: 'gray.2 auto 5px',
  },
  body: {
    color: 'body',
    WebkitOverflowScrolling: 'touch',
    margin: 0,
    ...type.body,
  },
  a: {
    color: 'link',
  },
  h1: type.h1,
  h2: type.h2,
  h3: type.h3,
  h4: type.h4,
  h5: type.h5,
  h6: type.h6,
  p: {
    marginY: 'md',
  },
  small: type.small,
};

// sr-only {
//   position: absolute;
//   width: 1px;
//   height: 1px;
//   padding: 0;
//   overflow: hidden;
//   clip: rect(0, 0, 0, 0);
//   white-space: nowrap;
//   border: 0;
// }
// ul.unstyled,
// ul.display-contents {
//   margin: 0;
//   padding: 0;
//   list-style: none;
// }
// .display-contents {
//   display: contents;
// }
