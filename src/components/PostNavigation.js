import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import mousetrap from 'mousetrap';
import { navigate } from 'gatsby';

import { Location } from '@reach/router';

// import { media } from 'style/layout';
import { rem } from 'style/helpers';
import { spacing, fontSizes } from 'style/sizing';
// import { style as fontStyle } from 'style/fonts';
import { colors, modalBreakpoint } from 'style/constants';
import UIContext from 'context/UI';

import Box from 'components/Box';
import Button from 'components/Button';
import Icon from 'components/Icon';

const propTypes = {
  location: PropTypes.object.isRequired,
};

const defaultProps = {};

const NavItem = styled(Button)`
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ direction }) =>
    ({
      prev: {
        left: 0,
        textAlign: 'left',
      },
      next: {
        right: 0,
        textAlign: 'right',
      },
    }[direction])}
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  ${({ isModal }) =>
    isModal
      ? `
    display: contents
    
    ${NavItem} {
      position: fixed;
      top: 50%;
      z-index: 10;
      transform: translate(0, -50%);
    }
  `
      : `
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${spacing('lg')};
    max-width: 100%;

    span {
      margin: 0 ${spacing('xs')};
    }
    
    ${NavItem} {
      width: 100%;
      font-size: ${rem(fontSizes.small)};
      text-transform: uppercase;
    }
  `}
`;

const PostNavigation = ({ children, location, ...props }) => {
  const { isViewport } = React.useContext(UIContext);

  const { siblings = [], index = 0, enableModal } = location.state || {};

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

  const toNext = React.useCallback(e => {
    if (e) e.stopPropagation();
    if (!next.pathname) return;
    navigate(next.pathname, { state: next.state });
  });

  const toPrevious = React.useCallback(e => {
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
    };
  }, [location]);

  return (
    <Box as="nav" {...props}>
      <List isModal={isModal}>
        <li>
          <NavItem
            aria-label="Previous"
            direction="prev"
            disabled={!prev.pathname}
            onClick={toPrevious}
            variant={isModal ? 'dark' : 'outline'}
            textStyle="icon"
          >
            <Icon inline type="previous" />
            {!isModal && <span>previous</span>}
          </NavItem>
        </li>
        <li>
          <NavItem
            aria-label="Next"
            direction="next"
            disabled={!next.pathname}
            onClick={toNext}
            variant={isModal ? 'dark' : 'outline'}
            textStyle="icon"
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

export default props => (
  <Location>
    {({ location }) => <PostNavigation location={location} {...props} />}
  </Location>
);
