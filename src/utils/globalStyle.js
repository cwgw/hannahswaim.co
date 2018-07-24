import { injectGlobal } from 'styled-components'
import { normalize } from 'polished'

import { fontSizeRoot, colors } from 'utils/constants'
import fonts, { fontfaceDeclarations } from 'utils/fonts'
import media from 'utils/media'
import spacing from 'utils/spacing'

import bkCircle from 'images/background.svg'
import bkSquiggles from 'images/squiggle.svg'

injectGlobal`
  ${normalize()}
  ${fontfaceDeclarations()}

  html {
    height: auto;
    min-height: auto;
    box-sizing: border-box;
    font-size: ${fontSizeRoot}px;
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
    font-size: 1rem;
    font-family: ${fonts.serif};
    font-weight: 400;
    line-height: 1.5;
    background-color: ${colors.background};
    /*
    background-image: url(${bkCircle}), url(${bkSquiggles});
    background-size: calc(180px + 85vw) calc(180px + 85vw), calc(200px + 20vw) calc(200px + 20vw);
    background-repeat: no-repeat;
    background-position: -33vw -60vw, 70vw 90%;
    */
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