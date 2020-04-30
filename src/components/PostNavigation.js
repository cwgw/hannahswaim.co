import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import mousetrap from 'mousetrap';
import { navigate } from 'gatsby';
import { Location } from '@reach/router';
import css from '@styled-system/css';

import ModalRoutingContext from 'context/ModalRoutingContext';

import Box from 'components/Box';
import Button from 'components/Button';
import Icon from 'components/Icon';

const propTypes = {
  location: PropTypes.object.isRequired,
};

const defaultProps = {};

const NavItem = styled(Button)(
  {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  (props) => {
    if (props.direction === 'next') {
      return {
        right: 0,
        textAlign: 'right',
      };
    }
    return {
      left: 0,
      textAlign: 'left',
    };
  }
);

const List = styled('ul')(
  {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
  (props) => {
    if (props.isModal) {
      return {
        display: 'contents',
        [NavItem]: {
          position: 'fixed',
          top: '50%',
          zIndex: '10',
          transform: 'translate(0, -50%)',
        },
      };
    }
    return css({
      display: 'grid',
      gridTemplateColumns: `1fr 1fr`,
      gap: 'md',
      maxWidth: '100%',
      span: {
        marginY: 0,
        marginX: 'xs',
      },
      [NavItem]: {
        width: '100%',
        textTransform: 'uppercase',
      },
    })(props);
  }
);

const PostNavigation = ({ children, location, ...props }) => {
  const { siblings = [], index = 0 } = location.state || {};

  const { modal } = React.useContext(ModalRoutingContext);

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

  const toNext = React.useCallback(
    (e) => {
      if (e) e.stopPropagation();
      if (!next.pathname) return;
      navigate(next.pathname, { state: next.state });
    },
    [next]
  );

  const toPrev = React.useCallback(
    (e) => {
      if (e) e.stopPropagation();
      if (!prev.pathname) return;
      navigate(prev.pathname, { state: prev.state });
    },
    [prev]
  );

  React.useEffect(() => {
    mousetrap.bind('left', toPrev);
    mousetrap.bind('right', toNext);

    return () => {
      mousetrap.unbind('left');
      mousetrap.unbind('right');
    };
  }, [toNext, toPrev]);

  return (
    <Box as="nav" {...props}>
      <List isModal={modal}>
        <li>
          <NavItem
            aria-label="Previous"
            direction="prev"
            disabled={!prev.pathname}
            onClick={toPrev}
            variant={modal ? 'dark' : 'outline'}
            textStyle={modal ? 'icon' : 'small'}
          >
            <Icon icon="previous" />
            {!modal && <span>previous</span>}
          </NavItem>
        </li>
        <li>
          <NavItem
            aria-label="Next"
            direction="next"
            disabled={!next.pathname}
            onClick={toNext}
            variant={modal ? 'dark' : 'outline'}
            textStyle={modal ? 'icon' : 'small'}
          >
            {!modal && <span>next</span>}
            <Icon icon="next" />
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
    {({ location }) => <PostNavigation location={location} {...props} />}
  </Location>
);
