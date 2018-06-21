import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'
import { inject, observer } from 'mobx-react'

import Icon from 'components/Icon'

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
  z-index: 999;

  overflow: hidden;
  overflow-y: scroll;


  &,
  &:before {
    transition: transform 600ms cubic-bezier(0.4, 0.0, 0.2, 1),
                opacity 300ms cubic-bezier(0.4, 0.0, 0.2, 1);
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
      case 'exited':
      case 'exiting':
      case 'entering':
        return `
          transform: translate(0, 1.5rem);
          opacity: 0;

          &:before {
            transform: rotate(90deg);
            opacity: 0;
          }
        `
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
        return ''
    }
  }}

  & > a {
    text-decoration: none;
    display: block;
    padding: 0.75rem;

    svg {
      display: inline-blcok;
      vertical-align: -.125em;
    }
  }
`

const NavItem = styled(GatsbyLink)`
  text-decoration: none;
  display: block;
  padding: 0.75rem;
`

function Navigation ({pages, transitionState, UIStore}) {

  const renderNavItems = ({title, slug}) => (
    <NavItem
      key={slug}
      to={`/${slug ? slug : ''}`}
      onClick={UIStore.closeNav}
    >
      {title}
    </NavItem>
  )

  return (
    <Nav transitionState={transitionState} >
      {pages.map(renderNavItems)}
      <a
        href="https://www.instagram.com/hannahswaimco/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon type="instagram" />
      </a>
    </Nav>
  )
}

Navigation.propTypes = propTypes

Navigation.defaultProps = defaultProps

export default inject('UIStore')(observer(Navigation))
