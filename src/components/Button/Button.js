import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { colors, borderRadius, ease } from 'utils/constants'
import spacing, { space } from 'utils/spacing'
import { buttonVariant } from 'utils/buttons'
import fonts from 'utils/fonts'
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
    'green',
    'gray',
    'brand',
  ]),
  outline: PropTypes.bool,
  disabled: PropTypes.bool,
  link: PropTypes.bool,
}

const defaultProps = {
  position: null,
  variant: 'light',
  outline: false,
  disabled: false,
  link: false,
  padding: [-1, 0],
}

const Button = styled(
  ({link, position, variant, outline, ...props}) => link ? (
    <Link {...props} />
  ) : (
    <button {...props} />
  )
)`
  ${space}
  ${buttonVariant}
  font-family: ${fonts.sansSerif};
  position: relative;
  display: inline-block;
  vertical-align: middle;
  border: 1px solid currentColor;
  border-radius: ${borderRadius};
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  white-space: nowrap;
  user-select: none;

  ${({position}) => position && `
    position: ${position};
  `}

  &:focus {
    outline: none;
    background-color: ${colors.link};
    color: ${colors.white};
  }

  ${media.min.md`
    &:before  {
      user-selct: none;
      pointer-events: none;
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
      transform-origin: center center;
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
  `}

  ${({disabled}) => disabled && `
    opacity: 0;
  `}
`

Button.propTypes = propTypes

Button.defaultProps = defaultProps

export default Button

export const Control = styled(Button)`
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
    height: auto;
    box-sizing: border-box;
  }
`
