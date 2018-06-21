import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'

import media from 'utils/media'

import Icon from 'components/Icon'

const propTypes = {
  pages: PropTypes.array,
}

const defaultProps = {}

const Nav = styled.nav`
  display: flex;
  flex-flow: column nowrap;

  ${media.min.nav`
    flex-flow: row wrap;
    padding: 0 0.75rem;
  `}

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
    <Nav>
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

export default Navigation

export const navigationFragment = graphql`
  fragment NavigationItems on ContentfulMenu {
    menuItems {
      title
      slug
    }
  }
`