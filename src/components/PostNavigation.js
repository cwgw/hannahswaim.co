import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import mousetrap from "mousetrap"
import { navigate } from 'gatsby'

import { Location } from '@reach/router'

import { media } from 'style/layout'
import { spacing, fontSizes } from 'style/sizing'
import { style as fontStyle } from 'style/fonts'
import { colors, modalBreakpoint } from 'style/constants'
import UIContext from 'context/UI'

import Box from 'components/Box'
import Button from 'components/Button'
import Icon from 'components/Icon'

const propTypes = {
  location: PropTypes.object.isRequired,
}

const defaultProps = {}

const NavItem = styled(Button)`
  color: inherit;
  background-color: transparent;
  font-size: ${fontStyle.lead.fontSize};

  ${({ direction }) => ({
    prev: {
      left: 0,
      textAlign: 'left',
    },
    next: {
      right: 0,
      textAlign: 'right',
    },
  }[direction])}
`

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  
  ${({ isModal }) => isModal ? `
    display: contents
    color: ${colors.white};
    
    ${NavItem} {
      position: fixed;
      top: 50%;
      z-index: 10;
      transform: translate(0, -50%);
      border: none;
    }

    ${NavItem}:hover,
    ${NavItem}:focus {
      background-color: ${colors.gray[0]};
    }
  ` : `
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${spacing('lg')};

    span {
      margin: 0 ${spacing('xs')};
    }
    
    ${NavItem} {
      color: ${colors.brand[3]};
      border-color: ${colors.brand[4]};
      width: 100%;
      font-size: ${fontSizes.small}px;
      text-transform: uppercase;
    }

    ${media.min.md`
      ${NavItem}:hover,
      ${NavItem}:focus {
        color: ${colors.brand[6]};
        background-color: ${colors.gray[3]};
        border-color: ${colors.gray[3]};
      }
    `}
  `}

`

const PostNavigation = ({
  children,
  location,
  ...props
}) => {
  const { isViewport } = React.useContext(UIContext);
  
  const {
    siblings = [],
    index = 0,
    enableModal,
  } = location.state || {}  

  const isModal = enableModal && isViewport[modalBreakpoint];

  const next = {
    pathname: index + 1 < siblings.length ? siblings[index + 1] : siblings[0],
    state: {
      ...location.state,
      index: index + 1 < siblings.length ? index + 1 : 0,
    },
  };

  const prev = {
    pathname: index > 0 ? siblings[index - 1] : siblings[siblings.length - 1],
    state: {
      ...location.state,
      index: index > 0 ? index - 1 : siblings.length - 1,
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
    <Box
      as="nav"
      {...props}
      >
      <List isModal={isModal} >
        <li>
          <NavItem
            direction="prev"
            aria-label="Previous"
            onClick={toPrevious}
            disabled={!prev.pathname}
            >
            <Icon inline type="previous" />
            {!isModal && <span>previous</span>}
          </NavItem>
        </li>
        <li>
          <NavItem
            direction="next"
            aria-label="Next"
            onClick={toNext}
            disabled={!next.pathname}
            >
            {!isModal && <span>next</span>}
            <Icon inline type="next" />
          </NavItem>
        </li>
      </List>
    </Box>
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
