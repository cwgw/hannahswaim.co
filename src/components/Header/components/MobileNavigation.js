import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Icon from 'components/Icon'
import Link from './NavItem'

import spacing from 'utils/spacing'
import fonts from 'utils/fonts'
import { ease } from 'utils/constants'

const propTypes = {
  pages: PropTypes.array,
  transitionState: PropTypes.string,
  UIStore: PropTypes.object,
}

const defaultProps = {}

const Nav = styled.nav`
  display: flex;
  flex-flow: column nowrap;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100%;

  padding-top: 6rem;
  z-index: -1;

  overflow: hidden;
  overflow-y: scroll;


  &,
  &:before {
    transition: transform 600ms ${ease},
                opacity 300ms ${ease};
  }

  &:before {
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    width: 200%;
    height: 100%;
    background-color: white;
    content: '';
    transform-origin: left top;
    transition-duration: 300ms;
  }


  ${({transitionState}) => {
    switch (transitionState) {
      case 'entered':
        return `
          transform: translate(0px,0px);
          opacity: 1;

          &:before {
            transform: rotate(0deg);
            opacity: 1;
          }
        `
      default:
        return `
          transform: translate(0, 1.5rem);
          opacity: 0;

          &:before {
            transform: rotate(90deg);
            opacity: 0;
          }
        `
    }
  }}
`

const NavItem = Link.extend`
  font-family: ${fonts.sansSerif};
  padding: ${spacing(-3)};

  ${({icon}) => icon && `
    font-size: ${spacing(1)};
  `}
`

function Navigation ({pages, transitionState}) {

  const renderNavItems = ({title, slug}) => (
    <NavItem
      key={slug}
      to={`/${slug ? slug : ''}`}
    >
      {title}
    </NavItem>
  )

  return (
    <Nav
      transitionState={transitionState}
      role="navigation"
    >
      {pages.map(renderNavItems)}
      <NavItem
        href="https://www.instagram.com/hannahswaimco/"
        external
      >
        <Icon
          type="instagram"
          inline
        />
      </NavItem>
    </Nav>
  )
}

Navigation.propTypes = propTypes

Navigation.defaultProps = defaultProps

export default Navigation
