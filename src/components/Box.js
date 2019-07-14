import styled from 'styled-components';

import { space, makeBox, makeFlexbox, makeGrid } from 'style/style-props';

const Box = styled.div`
  ${space}
  ${makeBox}
  ${({ display, ...props }) => {
    switch (display) {
      case 'flex':
      case 'flexbox':
        return makeFlexbox(props);
      case 'grid':
        return makeGrid(props);
      default:
        return null;
    }
  }}
`;

export default Box;
