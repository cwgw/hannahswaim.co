import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Link as GatsbyLink } from 'gatsby'

const propTypes = {
  external: PropTypes.bool,
}

const defaultProps = {
  external: false,
}

const Link = styled(
  ({external, children, to, href, isActive, ...props}) => external ? (
    <a
      rel="noopener noreferrer"
      target="_blank"
      href={href || to}
      {...props}
    >
      {children}
    </a>
  ) : (
    <GatsbyLink
      to={to || href}
      {...props}
    >
      {children}
    </GatsbyLink>
  )
)``

Link.propTypes = propTypes

Link.defaultProps = defaultProps

export default Link