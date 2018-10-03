import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import spacing from 'utils/spacing'
import { colors, ease } from 'utils/constants'
import { withViewportProps } from 'components/ViewportObserver'

const propTypes = {
  isNavOpen: PropTypes.bool.isRequired,
  toggleNav: PropTypes.func.isRequired,
}

const defaultProps = {}

const Button = styled.button`
  position: relative;
  display: block;
  padding: 0.75rem;
  padding: ${spacing(-1)};
  color: inherit;
  background-color: transparent;
  border: none;
  border-radius: 0;
  line-height: 0;
  cursor: pointer;

  &:focus {
    background-color: ${colors.link};
    outline: none;
    color: white;
  }
`

const Svg = styled.svg`
  display: inline-block;
  width: 1em;
  height: 1em;
`

const Line = styled.line`
  fill: transparent;
  stroke: currentColor;
  stroke-width: 1px;
  transition: transform 600ms ${ease};
  transform-origin: 50% 50%;
  transform-box: fill-box;

  ${({isOpen}) => isOpen && `
    &:nth-child(odd) {
      transform: rotate(45deg) scale(1.45);
    }

    &:nth-child(even) {
      transform: rotate(-45deg) scale(1.45);
    }

    &:last-child {
      transform: scale(0, 1);
    }
  `}
`

function Hamburger (props) {

  const {
    isNavOpen,
    toggleNav,
    ...atts
  } = props

  return (
    <Button
      onClick={toggleNav}
      isOpen={isNavOpen}
      {...atts}
    >
      <Svg>
        <Line isOpen={isNavOpen} vectorEffect="non-scaling-stroke" x1="0%" y1="25%" x2="50%" y2="25%" />
        <Line isOpen={isNavOpen} vectorEffect="non-scaling-stroke" x1="50%" y1="25%" x2="100%" y2="25%" />
        <Line isOpen={isNavOpen} vectorEffect="non-scaling-stroke" x1="50%" y1="75%" x2="100%" y2="75%" />
        <Line isOpen={isNavOpen} vectorEffect="non-scaling-stroke" x1="0%" y1="75%" x2="50%" y2="75%" />
        <Line isOpen={isNavOpen} vectorEffect="non-scaling-stroke" x1="0%" y1="50%" x2="100%" y2="50%" />
      </Svg>
    </Button>
  )
}

Hamburger.propTypes = propTypes

Hamburger.defaultProps = defaultProps

export default withViewportProps(Hamburger)
