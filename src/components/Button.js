import React from 'react';
import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

import { media } from 'style/layout';
import { spacing } from 'style/sizing';
import { colors } from 'style/constants';
import { style as fontStyle } from 'style/fonts';

import Link from 'components/Link';
import Box from 'components/Box';
import { toColorString } from 'polished';

const UnstyledButton = ({ to, className, ...props }) =>
  to ? (
    <Link className={className} to={to} {...props} />
  ) : (
    <Box className={className} as="button" {...props} />
  );

const Button = styled(UnstyledButton)`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  padding: ${spacing('sm')} ${spacing('md')};
  border: 1px solid currentColor;
  border-radius: ${spacing(-3)};
  font-size: inherit;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  white-space: nowrap;
  user-select: none;

  &:active {
    transform: translate(0, ${spacing(-1)});
  }

  &:focus {
    z-index: 1;
  }

  ${({ textStyle }) => fontStyle[textStyle] || {}}

  ${({ variant }) => {
    switch (variant) {
      case 'outline':
        return css({
          background: 'transparent',
          borderColor: transparentize(0.5, colors.brand[4]),
          color: colors.link,
          ['&:hover, &:focus']: {
            borderColor: colors.link,
            color: colors.link,
          },
        });
      case 'dark':
        return css({
          background: colors.gray[0],
          borderColor: colors.gray[1],
          color: colors.gray[5],
          ['&:hover, &:focus']: {
            background: colors.gray[3],
            borderColor: colors.gray[3],
            color: colors.brand[5],
          },
        });
      default:
        return css({
          background: colors.brand[5],
          borderColor: colors.brand[5],
          color: colors.brand[2],
          ['&:hover, &:focus']: {
            background: colors.gray[3],
            borderColor: colors.gray[3],
            color: colors.brand[5],
          },
        });
    }
  }}
`;

export default Button;
