import React from 'react';
import styled from 'styled-components';
import { variant } from 'styled-system';
import css from '@styled-system/css';

import { space, transparentize } from 'style/utils';

import Link from 'components/Link';
import Box from 'components/Box';

const UnstyledButton = ({ to, className, ...props }) =>
  to ? (
    <Link className={className} to={to} {...props} />
  ) : (
    <Box className={className} as="button" {...props} />
  );

const variants = variant({
  variants: {
    outline: {
      background: 'transparent',
      borderColor: transparentize(0.5, 'brand.4'),
      color: 'link',
      '&:hover, &:focus': {
        borderColor: 'link',
        color: 'link',
      },
    },
    dark: {
      backgroundColor: 'gray.0',
      borderColor: 'gray.1',
      color: 'gray.5',
      '&:hover, &:focus': {
        backgroundColor: 'gray.3',
        borderColor: 'gray.3',
        color: 'brand.5',
      },
    },
    default: {
      backgroundColor: 'brand.5',
      borderColor: 'brand.5',
      color: 'brand.2',
      '&:hover, &:focus': {
        backgroundColor: 'gray.3',
        borderColor: 'gray.3',
        color: 'brand.5',
      },
    },
  },
});

const shared = css({
  position: 'relative',
  display: 'inline-block',
  verticalAlign: 'middle',
  paddingY: 'sm',
  paddingX: 'md',
  border: '1px solid currentColor',
  borderRadius: space.xxs,
  fontSize: 'inherit',
  cursor: 'pointer',
  textDecoration: 'none',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  userSelect: 'none',
  '&:active': {
    transform: 'translate(0, 2px)',
  },
  '&:focus': {
    zIndex: 1,
  },
});

const Button = styled(UnstyledButton)(shared, variants);

Button.defaultProps = {
  variant: 'default',
};

export default Button;
