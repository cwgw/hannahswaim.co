import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Link as GatsbyLink } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

const propTypes = {
  external: PropTypes.bool,
}

const defaultProps = {
  external: false,
}

const Link = styled(
  ({external, children, to, href, isActive, ...props}) => external ? (
    <OutboundLink
      rel="noopener noreferrer"
      target="_blank"
      href={href || to}
      {...props}
    >
      {children}
    </OutboundLink>
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