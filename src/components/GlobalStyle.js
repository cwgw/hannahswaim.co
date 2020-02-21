import { createGlobalStyle } from 'styled-components';

import global from 'style/global';
import css from '@styled-system/css';

const GlobalStyle = createGlobalStyle`
  ${css(global)}
`;

export default GlobalStyle;
