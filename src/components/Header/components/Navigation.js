import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import Icon from 'components/Icon'
import Link from './NavItem'

import spacing from 'utils/spacing'
import { colors, ease } from 'utils/constants'

const propTypes = {
  pages: PropTypes.array,
}

const defaultProps = {}

const Nav = styled.nav`
  display: flex;
  flex-flow: column nowrap;
  flex-flow: row wrap;
  padding: 0 0.75rem;
  position: relative;
`

const NavItem = Link.extend`
  position: relative;
  padding: ${spacing(-1)} ${spacing(0)} ${spacing(-2)};
  color: inherit;
  transition: color 175ms ${ease};

  &:focus {
    outline: none;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background-color: ${colors.link};
    transform: translate(0,-20%);
    opacity: 0;
    transition: transform 350ms cubic-bezier(0.4, 0.0, 0.2, 1),
                opacity 350ms cubic-bezier(0.4, 0.0, 0.2, 1);
  }

  &:hover,
  &:active,
  &:focus {
    color: ${colors.white};

    &:before {
      transform: translate(0,0);
      transition-duration: 175ms;
      opacity: 1;
    }
  }
`

function Navigation ({pages}) {

  const renderNavItems = ({title, slug}) => (
    <NavItem
      key={slug}
      to={`/${slug ? slug : ''}`}
    >
      {title}
    </NavItem>
  )

  return (
    <Nav role="navigation" >
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

export const navigationFragment = graphql`
  fragment NavigationItems on ContentfulMenu {
    menuItems {
      title
      slug
    }
  }
`
