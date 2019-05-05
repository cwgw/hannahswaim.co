import React from 'react';
import PropTypes from 'prop-types';
import { Link as GatsbyLink } from 'gatsby';

const propTypes = {
  activeClassName: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  rel: PropTypes.string,
  target: PropTypes.string,
  to: PropTypes.string.isRequired,
  title: PropTypes.string,
};

const defaultProps = {
  activeClassName: null,
  children: null,
  className: null,
  rel: 'noreferrer',
  target: '_blank',
  title: null,
};

const Link = ({
  activeClassName,
  children,
  className,
  onBlur,
  onFocus,
  onMouseEnter,
  onMouseLeave,
  rel,
  state,
  style,
  target,
  title,
  to,
}) => {
  // test for leading backslash
  // only matching strings get the GatsbyLink
  return /^\/(?!\/)/.test(to) ? (
    <GatsbyLink
      activeClassName={activeClassName}
      className={className}
      onBlur={onBlur}
      onFocus={onFocus}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      state={state}
      style={style}
      title={title}
      to={to}
      children={children}
    />
  ) : (
    <a
      className={className}
      children={children}
      href={to}
      onBlur={onBlur}
      onFocus={onFocus}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      rel={rel}
      style={style}
      target={target}
      title={title}
    />
  );
};

Link.propTypes = propTypes;

Link.defaultProps = defaultProps;

export default Link;
