import { createGlobalStyle } from 'styled-components';

import { colors, fonts } from 'style/tokens';
import spacing from 'style/spacing';
import type from 'style/type';

const GlobalStyle = createGlobalStyle`
  ${fonts.map(font => ({ '@font-face': font }))}

  html {
    height: auto;
    min-height: auto;
    box-sizing: border-box;
    ${type.html}
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
    outline: ${colors.gray[2]} auto 5px;
  }

  body {
    ${type.body}
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
    margin: 0 0 ${spacing('default')};
  }

  h1 { ${type.h1} }
  h2 { ${type.h2} }
  h3 { ${type.h3} }
  h4 { ${type.h4} }
  h5 { ${type.h5} }
  h6 { ${type.h6} }

  small {
    ${type.small}
  }

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

  ul.unstyled,
  ul.display-contents {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .display-contents {
    display: contents;
  }
`;

export default GlobalStyle;
