import PropTypes from 'prop-types'
import styled from 'styled-components'

import { colors } from 'utils/constants'
import spacing from 'utils/spacing'
import media from 'utils/media'

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
}

const Button = styled.button`
  border: 1px solid transparent;
  background: none;
  border-radius: 0;
  display: inline-block;
  cursor: pointer;
  padding: ${spacing(-1)} ${spacing(0)};

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

  ${({disabled}) => disabled && `
    opacity: 0;
  `}
`

Button.propTypes = propTypes

export default Button

export const Control = Button.extend`
  display: block;
  box-sizing: content-box;
  flex: 0 0 auto;
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
