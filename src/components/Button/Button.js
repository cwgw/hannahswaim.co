import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { colors, borderRadius, ease } from 'utils/constants'
import spacing, { space } from 'utils/spacing'
import media from 'utils/media'

import Link from 'components/Link'

const propTypes = {
  position: PropTypes.oneOf([
    'absolute',
    'fixed',
    'initial',
    'relative',
    'static',
  ]),
  variant: PropTypes.oneOf([
    'dark',
    'light',
  ]),
  disabled: PropTypes.bool,
  link: PropTypes.bool,
}

const defaultProps = {
  position: null,
  variant: null,
  disabled: false,
  link: false,
  padding: [-1, 0],
}

const Button = styled(
  ({link, position, variant, ...props}) => link ? (
    <Link {...props} />
  ) : (
    <button {...props} />
  )
)`
  ${space}
  position: relative;
  display: inline-block;
  vertical-align: middle;
  border: 1px solid currentColor;
  border-radius: ${borderRadius};
  background: transparent;
  cursor: pointer;
  color: inherit;
  text-decoration: none;
  text-align: center;
  white-space: nowrap;
  user-select: none;

  ${({variant}) => `
    color: ${variant === 'dark' ? colors.white : 'inherit'};
  `}

  ${({position}) => position && `
    position: ${position};
  `}

  &:focus {
    outline: none;
    background-color: ${colors.link};
    color: ${colors.white};
  }

  &:before  {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: currentColor;
    opacity: 0;
    transform: scale(1.5);
    transform-origin: center top;
    transition: transform 175ms ${ease},
                opacity 175ms ${ease};
  }

  &:hover,
  &:focus {

    &:before  {
      opacity: 0.125;
      transform: scale(1);
    }
  }

  ${({disabled}) => disabled && `
    opacity: 0;
  `}
`

Button.propTypes = propTypes

Button.defaultProps = defaultProps

export default Button

export const Control = Button.extend`
  display: block;
  box-sizing: content-box;
  flex: 0 0 auto;
  border-color: transparent;
  width: ${spacing(2)};
  height: ${spacing(2)};
  padding: ${spacing(-1)};

  ${media.min.md`
    padding: ${spacing(0)};
  `}

  ${media.min.lg`
    width: ${spacing(3)};
    height: ${spacing(3)};
    padding: ${spacing(2)};
  `}

  & > svg {
    width: 100%;
    height: 100%;
  }
`
