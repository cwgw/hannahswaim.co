import React from 'react'
import PropTypes from 'prop-types'
import { Link as GatsbyLink } from 'gatsby'

const propTypes = {
  activeClassName: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  rel: PropTypes.string,
  target: PropTypes.string,
  to: PropTypes.string.isRequired,
  title: PropTypes.string,
}

const defaultProps = {
  activeClassName: null,
  children: null,
  className: null,
  rel: "noreferrer",
  target: "_blank",
  title: null,
}

const Link = ({
  activeClassName,
  children,
  className,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  rel,
  state,
  style,
  target,
  to,
  title,
  ...props
}) => {
  // test for leading backslash
  // only matching strings get the GatsbyLink
  return /^\/(?!\/)/.test(to)
    ? (
      <GatsbyLink
        {...{
          activeClassName,
          className,
          onBlur,
          onFocus,
          onMouseEnter,
          onMouseLeave,
          state,
          style,
          title,
          to,
        }}
        >
        {children}
      </GatsbyLink>
    )
    : (
      <a
        href={to}
        {...{
          className,
          onBlur,
          onFocus,
          onMouseEnter,
          onMouseLeave,
          rel,
          style,
          target,
          title,
        }}
        >
        {children}
      </a>
    )
}

Link.propTypes = propTypes

Link.defaultProps = defaultProps

export default Link
