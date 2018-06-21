import React from 'react'
import PropTypes from 'prop-types'

import FlexContainer from 'components/FlexContainer'

import NavItem from './components/PostNavItem'

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  next: PropTypes.object,
  previous: PropTypes.object,
  variant: PropTypes.oneOf([
    'light',
    'dark',
  ]),
  fixed: PropTypes.bool,
  fullHeight: PropTypes.bool,
}

const defaultProps = {
  children: null,
  next: null,
  previous: null,
  variant: 'light',
  fixed: false,
  fullHeight: false,
}

const NavContainer = FlexContainer.extend`

  ${({fixed}) => fixed && `
    position: fixed;
    top: 50%;
    left: 0;
    width: 100%;
    transform: translate(0,-50%);
  `}
`

function PostNavigation (props) {

  const {
    next,
    previous,
    variant,
    children,
    fixed,
    fullHeight,
  } = props

  return (
    <NavContainer
      noWrap
      breakpoint="none"
      stretch={fullHeight}
      fixed={fixed}
      alignItems="center"
    >
      <NavItem
        direction="previous"
        location={previous}
        variant={variant}
      />
      {children}
      <NavItem
        direction="next"
        location={next}
        variant={variant}
      />
    </NavContainer>
  )
}

PostNavigation.propTypes = propTypes

PostNavigation.defaultProps = defaultProps

export default PostNavigation
