import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Box from 'components/Box'
import Flex from 'components/Flex'
import Icon from 'components/Icon'
import Link from 'components/Link'

import spacing from 'utils/spacing'
import { ease, colors } from 'utils/constants'

const propTypes = {
  items: PropTypes.array,
}

const defaultProps = {
  items: [],
}

const NavLink = styled(Box)`
  display: inline-block;
  min-width: ${spacing(6)};
  text-align: center;
  background-color: ${colors.white};
  text-decoration: none;
  border-radius: 3px;
`

const Menu = ({items}) => (
  <Flex
    as="nav"
    role="navigation"
    >
    {items.map(({
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
        activeClassName="MenuItem--active"
        as={Link}
        padding={[-1, 1]}
        marginX={'1px'}
        >
        {__typename === 'ContentfulSocialMediaLink'
          ? <Icon type={service} inline />
          : title
        }
      </NavLink>
    ))}
  </Flex>
)


Menu.propTypes = propTypes

Menu.defaultProps = defaultProps

export default Menu
