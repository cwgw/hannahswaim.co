import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import Icon from 'components/Icon'
import Link from './NavItem'

import spacing from 'utils/spacing'
import { ease } from 'utils/constants'

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
  transition: color 175ms ${ease},
              background-color 175ms ${ease};

  &:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    bottom: -1px;
    border: 1px solid transparent;
    border-top-color: currentColor;
    border-radius: 4px;
    z-index: -1;
    transform: scale(0,1);
    transform-origin: center center;
    opacity: 0;
    transition: transform 350ms cubic-bezier(0.4, 0.0, 0.2, 1),
                opacity 350ms cubic-bezier(0.4, 0.0, 0.2, 1),
                border 350ms cubic-bezier(0.4, 0.0, 0.2, 1),
                top 175ms cubic-bezier(0.4, 0.0, 0.2, 1);
  }

  &:focus {
    outline: none;

    &:before {
      top: 0;
      border-color: currentColor;
    }
  }

  &:focus:before,
  &:hover:before {
    transform: scale(1,1);
    transition-duration: 175ms;
    opacity: 1;
  }
`

function Navigation ({pages}) {

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
    <Nav role="navigation" >
      {pages.map(renderNavItems)}
    </Nav>
  )
}

Navigation.propTypes = propTypes

Navigation.defaultProps = defaultProps

export default Navigation

export const navigationFragment = graphql`
  fragment MenuItemPage on ContentfulPage {
    __typename
    title
    slug
  }

  fragment MenuItemSocialMediaLink on ContentfulSocialMediaLink {
    __typename
    service
    url
  }
`
