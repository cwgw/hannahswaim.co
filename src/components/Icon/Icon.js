import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import * as icons from './icons';

const propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  icons: PropTypes.object,
  label: PropTypes.string,
  style: PropTypes.object,
};

const defaultProps = {
  className: null,
  icons: icons,
  label: PropTypes.string,
  style: {},
};

const Icon = styled(({ className, icon, icons, label, style }) => {
  if (!icon || !icons[icon]) {
    return null;
  }

  const iconData = icons[icon];

  const defaultAttributes = {
    viewBox: '0 0 100 100',
    fill: 'none',
    stroke: 'currentColor',
    preserveAspectRatio: 'none',
  };

  const aria = label
    ? { 'aria-label': label }
    : { 'aria-hidden': true, focusable: false };

  return (
    <svg
      style={style}
      className={className}
      {...aria}
      {...defaultAttributes}
      {...iconData.attributes}
    >
      {iconData.paths.map(([Element, pathAttributes], index) => (
        <Element
          key={Element + index}
          vectorEffect="non-scaling-stroke"
          {...pathAttributes}
        />
      ))}
    </svg>
  );
})`
  display: inline;
  width: 1em;
  height: 1em;
  top: 0.166666666em;

  ${({ style }) => style}
`;

Icon.propTypes = propTypes;

Icon.defaultProps = defaultProps;

export default Icon;
