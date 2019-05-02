import React from 'react'
import styled from 'styled-components'

import { media } from 'style/layout'
import { spacing } from 'style/sizing'
import { sansSerif } from 'style/fonts'

import Link from 'components/Link'
import Box from 'components/Box'

const UnstyledButton = ({to, className, ...props}) => to ? (
  <Link
    className={className}
    to={to}
    {...props}
  />
) : (
  <Box
    className={className}
    as="button"
    {...props}
  />
);

const Button = styled(UnstyledButton)`
  font-family: inerit;
  display: inline-block;
  vertical-align: middle;
  padding: ${spacing('sm')} ${spacing('md')};
  border: 1px solid currentColor;
  border-radius: ${spacing('xxs')};
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  white-space: nowrap;
  user-select: none;

  ${({color}) => color
    ? `color: ${color};`
    : `color: inherit;`
  }

  ${media.min.md`
    &:hover,
    &:focus {
      background-color: currentColor;
    }
  `}

  &:active {
    transform: translate(0, ${spacing('xxs')});
  }
`

export default Button
