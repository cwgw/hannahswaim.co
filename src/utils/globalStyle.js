import { injectGlobal } from 'styled-components'
import { normalize } from 'polished'

import * as fonts from 'utils/fonts'

injectGlobal`
  ${normalize()}

  @font-face {
    font-family: 'Inter UI';
    font-style:  normal;
    font-weight: 400;
    src: url(${fonts.interUi.regular}) format('woff2');
  }

  @font-face {
    font-family: 'Inter UI';
    font-style:  italic;
    font-weight: 400;
    src: url(${fonts.interUi.italic}) format('woff2');
  }

  @font-face {
    font-family: 'Inter UI';
    font-style:  normal;
    font-weight: 900;
    src: url(${fonts.interUi.black}) format('woff2');
  }

  @font-face {
    font-family: 'Tinos';
    font-style: normal;
    font-weight: 700;
    src: local('Tinos-Bold'), url(${fonts.tinos.bold}) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  html {
    height: auto;
    min-height: auto;
    box-sizing: border-box;
    font-size: 16px;
    -ms-overflow-style: scrollbar;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-overflow-scrolling: touch;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  ::selection {
    background: blue;
    color: white;
  }

  *:focus {
    outline: blue auto 5px;
  }

  body {
    font-size: 1rem;
    font-family: 'Inter UI';
    font-weight: 400;
    line-height: 1.5;
    color: #444;
    -webkit-overflow-scrolling: touch;
  }

  address,
  article,
  blockquote,
  dd,
  fieldset,
  figure,
  form,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr,
  ol,
  p,
  pre,
  table,
  ul {
    margin: 0 0 1.5rem;
  }

  h1 {
    font-family: 'Tinos';
    font-weight: 700;
    font-size: 56px;
  }

  h2 {
    font-weight: 400;
    font-size: 36px;
  }

  h3 {
    font-weight: 900;
    font-size: 24px;
  }
`