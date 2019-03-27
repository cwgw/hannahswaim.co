import { createGlobalStyle } from 'styled-components'

import { spacing } from 'style/sizing'
import { colors } from 'style/constants'
import * as fonts from 'style/fonts'

const GlobalStyle = createGlobalStyle`
  html {
    height: auto;
    min-height: auto;
    box-sizing: border-box;
    ${fonts.style.html}
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
    background: ${colors.green[3]};
    color: white;
  }

  *:focus {
    outline: ${colors.link} auto 5px;
  }

  body {
    ${fonts.style.body}
    color: ${colors.body};
    -webkit-overflow-scrolling: touch;
    margin: 0;
  }

  a {
    color: ${colors.link};
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
    margin: 0 0 ${spacing('md')};
  }

  ${() => {
    const printHeadingStyles = (n) => n > 0
      ? {
        [`h${n}`]: {
          ...(fonts.style[`h${n}`] || {}),
        },
        ...printHeadingStyles(n - 1)
      }
      : {}
    return printHeadingStyles(6)
  }}

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`

export default GlobalStyle
