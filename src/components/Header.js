import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { media } from 'utils/media'
import spacing from 'utils/spacing'
import { acronymize } from 'utils/formatting'
import { colors, breakpoints } from 'utils/constants'
import { withUIProps } from 'components/UIContext'
import { StandardGrid } from 'components/Grid'
import Flex from 'components/Flex'
import Link from 'components/Link'
import Icon from 'components/Icon'


const propTypes = {
  siteTitle: PropTypes.string.isRequired,
  pages: PropTypes.array,
}

const defaultProps = {
  pages: [],
  isAboveHero: false,
}

const Wrapper = styled(StandardGrid)`
  width: 100%;

  ${media.min.lg`
    position: absolute;
    z-index: 10;
  `}
`

const Nav = styled(Flex)`
`

const NavLink = styled(Link)`
  display: inline-block;
  min-width: ${spacing(6)};
  padding: ${spacing(-1)} ${spacing(1)};
  margin: 0 1px;
  background-color: ${colors.white};
  border-radius: 3px;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;

  &:hover:not(.MenuItem--active),
  &:focus:not(.MenuItem--active) {
    background-color: ${colors.gray[3]};
    color: ${colors.brand[6]};
  }

  &:focus {
    position: relative;
  }
`

const Nameplate = styled(NavLink)`
  background-color: ${colors.brand[4]};
  color: ${colors.brand[2]};
  font-weight: 700;
`

const Header = ({
  siteTitle,
  menuItems,
  isMobile,
  viewportDimensions,
}) => (
  <Wrapper
    role="banner"
    as="header"
    >
    <Nav
      gridColumn="contentStart / contentEnd"
      gridRow="contentStart / contentEnd"
      justifyContent={isMobile ? 'space-between' : 'flex-start'}
      flexFlow="row nowrap"
      alignItems="baseline"
      marginRight="auto"
      as="nav"
      role="navigation"
      >
      <Nameplate
        to={'/'}
        as={Link}
        title="Home"
        >
        {viewportDimensions.width < breakpoints.xs ? acronymize(siteTitle) : siteTitle}
      </Nameplate>
      {menuItems.map(({
        id,
        slug,
        url,
        service,
        title,
        __typename
      }) => (
        <NavLink
          key={id}
          to={url || '/' + slug}
          title={title || service}
          activeClassName="MenuItem--active"
          >
          {__typename === 'ContentfulSocialMediaLink'
            ? <Icon type={service} inline />
            : title
          }
        </NavLink>
      ))}
    </Nav>
  </Wrapper>
)

Header.propTypes = propTypes

Header.defaultProps = defaultProps

export default withUIProps(Header)
