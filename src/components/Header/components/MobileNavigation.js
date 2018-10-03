import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Transition } from 'react-transition-group'

import spacing from 'utils/spacing'
import fonts from 'utils/fonts'
import { ease } from 'utils/constants'
import { withViewportProps } from 'components/ViewportObserver'
import Icon from 'components/Icon'
import Link from 'components/Link'

const propTypes = {
  pages: PropTypes.array,
}

const defaultProps = {}

const Nav = styled.nav`
  display: flex;
  flex-flow: column nowrap;
  position: fixed;
  justify-content: center;
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
  display: block;
  text-decoration: none;
  padding: ${spacing(0)};
  font-family: ${fonts.sansSerif};
  font-size: ${spacing(2)};
  text-align: center;

  ${({icon}) => icon && `
    font-size: ${spacing(1)};
  `}
`

function Navigation ({pages, isNavOpen}) {

  const renderNavItems = (item) => {
    switch (item['__typename']) {
      case 'ContentfulSocialMediaLink':
        return (
          <NavItem
            key={item.service}
            href={item.url}
            external
          >
            <Icon
              type={item.service}
              inline
            />
          </NavItem>
        )
      case 'ContentfulPage':
        return (
          <NavItem
            key={item.slug}
            to={`/${item.slug ? item.slug : ''}`}
          >
            {item.title}
          </NavItem>
        )
      default:
        return null
    }
  }

  return (
    <Transition
      in={isNavOpen}
      timeout={300}
      mountOnEnter
      unmountOnExit
    >
      {transitionState => (
        <Nav
          transitionState={transitionState}
          role="navigation"
        >
          {pages.map(renderNavItems)}
        </Nav>
      )}
    </Transition>
  )
}

Navigation.propTypes = propTypes

Navigation.defaultProps = defaultProps

export default withViewportProps(Navigation)
