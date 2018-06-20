import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import mousetrap from "mousetrap"
import { navigateTo } from 'gatsby-link'

import media from 'utils/media'

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
}

const defaultProps = {
  variant: 'light',
  next: null,
  previous: null,
  fixed: false,
}

const Container = FlexContainer.extend`

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
    location,
    variant,
    children,
    fixed,
  } = props

  return (
    <Container
      noWrap
      breakpoint="none"
      stretch={fixed}
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
    </Container>
  )
}

PostNavigation.propTypes = propTypes

PostNavigation.defaultProps = defaultProps

export default PostNavigation
