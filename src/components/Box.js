import styled from 'styled-components';
import { system, variant, space, position, compose } from 'styled-system';

import { type } from 'style/shared';

const box = compose(
  system({
    display: true,
    flex: true,
    alignSelf: true,
    alignContent: true,
    justifySelf: true,
    col: {
      property: 'gridColumn',
      scale: 'customColumnNames',
      defaultScale: {
        text: 'start / span 6',
        page: 'page-start / page-end',
        content: 'start / end',
      },
    },
    row: {
      property: 'gridRow',
    },
    rowStart: {
      property: 'gridRowStart',
    },
    rowEnd: {
      property: 'gridRowEnd',
    },
  }),
  position,
  space,
  variant({
    prop: 'type',
    variants: type,
  })
);

const Box = styled('div')(box);

export default Box;
