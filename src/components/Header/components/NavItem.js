import React from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'

const NavItem = styled(
  ({external, children, ...props}) => external
  ? <a {...props} rel="noopener noreferrer" target="_blank" >{children}</a>
  : <GatsbyLink {...props} >{children}</GatsbyLink>
)`
  display: block;
  text-decoration: none;
`

export default NavItem
