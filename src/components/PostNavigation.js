import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import mousetrap from "mousetrap"
import { navigate } from 'gatsby'

import { Location } from '@reach/router'

import { style as fontStyle } from 'style/fonts'
import { colors } from 'style/constants'
import Flex from 'components/Flex'
import Button from 'components/Button'
import Icon from 'components/Icon'

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  isModal: PropTypes.bool,
  next: PropTypes.object,
  previous: PropTypes.object,
}

const defaultProps = {
  children: null,
  isModal: true,
  next: null,
  previous: null,
}

const NavItem = styled(Button)`
  color: inherit;
  background-color: transparent;
  border: none;
  font-size: ${fontStyle.lead.fontSize};
`

const NavContainer = styled(Flex)`
  ${({ isModal }) => isModal
    ? `
      color: ${colors.white};
      position: fixed;
      top: 50%;
      left: 0;
      width: 100%;
      transform: translate(0,-50%);
      align-items: center;

      ${NavItem}:hover,
      ${NavItem}:focus {
        background-color: ${colors.gray[0]};
      }
    `
    : `
      justify-content: space-between;

      ${NavItem}:hover,
      ${NavItem}:focus {
        color: ${colors.brand[6]};
        background-color: ${colors.gray[3]};
      }
    `
  }
`

const PostNavigation = ({
  children,
  location,
  ...props
}) => {
  const {
    siblings = [],
    index = 0,
  } = location.state || {}

  const next = {
    pathname: siblings[index + 1] || null,
    state: {
      ...location.state,
      index: index + 1,
    },
  };

  const prev = {
    pathname: siblings[index - 1] || null,
    state: {
      ...location.state,
      index: index - 1,
    },
  };
  
  const toNext = React.useCallback((e) => {
    if (e) e.stopPropagation();
    if (!next.pathname) return;
    navigate(next.pathname, { state: next.state });
  });

  const toPrevious = React.useCallback((e) => {
    if (e) e.stopPropagation();
    if (!prev.pathname) return;
    navigate(prev.pathname, { state: prev.state });
  });

  React.useEffect(() => {
    mousetrap.bind('left', toPrevious);
    mousetrap.bind('right', toNext);

    return () => {
      mousetrap.unbind('left');
      mousetrap.unbind('right');
    }
  }, [location]);

  return (
    <NavContainer {...props} >
      <NavItem
        aria-label="Previous"
        onClick={toPrevious}
        disabled={!prev.pathname}
        >
        <Icon
          type="previous"
          inline
        />
      </NavItem>
      {children}
      <NavItem
        aria-label="Next"
        onClick={toNext}
        disabled={!next.pathname}
        >
        <Icon
          type="next"
          inline
        />
      </NavItem>
    </NavContainer>
  );
};

PostNavigation.propTypes = propTypes;

PostNavigation.defaultProps = defaultProps;

export default (props) => (
  <Location>
    {({ location }) => (
      <PostNavigation
        location={location}
        {...props}
      />
    )}
  </Location>
);
