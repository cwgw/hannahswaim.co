import { injectGlobal } from 'styled-components'
import { normalize } from 'polished'

import { fontSizeRoot } from 'utils/constants'
import fonts, { fontfaceDeclarations } from 'utils/fonts'
import colors from 'utils/colors'
import media from 'utils/media'
import spacing from 'utils/spacing'

import background from 'images/background.svg'

injectGlobal`
  ${normalize()}
  ${fontfaceDeclarations()}

  html {
    height: auto;
    min-height: auto;
    box-sizing: border-box;
    font-size: ${fontSizeRoot};
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
    outline: ${colors.link} auto 5px;
  }

  body {
    font-size: 1rem;
    font-family: ${fonts.serif};
    font-weight: 400;
    line-height: 1.5;
    background-image: url(${background});
    // background-size: calc(360px + 75vw) calc(360px + 75vw);
    background-size: calc(180px + 85vw) calc(180px + 85vw);
    // background-size: 100vw 100vw;
    background-repeat: no-repeat;
    background-position: -33vw -60vw;
    color: ${colors.body};
    -webkit-overflow-scrolling: touch;
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
    margin: 0 0 ${spacing(2)};
  }

  h1 {
    font-family: ${fonts.sansSerif};
    font-weight: 700;
    font-size: ${spacing(5)};
  }

  h2 {
    font-weight: 400;
    font-size: ${spacing(3)};
  }

  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
    font-size: ${spacing(2)};
  }

  ${media.max.md`
    h1 {
      font-size: ${spacing(4)};
    }
  `}

  ${media.max.sm`
    h1 {
      font-size: ${spacing(3)};
    }
  `}
`