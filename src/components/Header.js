import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import css from '@styled-system/css';

import { space } from 'style/utils';
// import { acronymize } from 'utils/formatting';

import Box from 'components/Box';
import Button from 'components/Button';
import Grid from 'components/Grid';
import Icon from 'components/Icon';

const propTypes = {
  siteName: PropTypes.string.isRequired,
  pages: PropTypes.array,
};

const defaultProps = {
  pages: [],
  isAboveHero: false,
};

const Wrapper = styled(Grid)(
  css({
    width: '100%',
    zIndex: 10,
    marginY: 'md',
    position: ['relative', null, null, null, 'absolute'],
  })
);

const Nav = styled(Box)({
  whiteSpace: 'nowrap',
  overflow: 'scroll',
  scrollbarWidth: 'none',
  MsOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    width: '0 !important',
  },
});

const List = styled('ul')(
  css({
    display: ['block', null, 'contents'],
    marginY: 0,
    marginX: [0, null, 'md'],
    padding: 0,
    listStyle: 'none',
    whiteSpace: 'nowrap',
    '&:after': {
      width: space.md,
      display: 'inline-block',
      content: '',
    },
  })
);

const ListItem = styled('li')({
  display: 'inline-block',
});

const NavLink = styled(Button)(
  css({
    minWidth: space.xl,
    margin: '0 1px',
    backgroundColor: 'white',
    '&.MenuItem--active, &.MenuItem--active:hover, &.MenuItem--active:focus': {
      background: 'none',
      color: 'brand.2',
      borderColor: 'transparent',
    },
  })
);

const Nameplate = styled(Button)({
  margin: '0 1px',
});

const Header = ({ siteName, menuItems }) => {
  return (
    <Wrapper role="banner" as="header">
      <Nav
        as="nav"
        // col={{
        //   base: 'bleedStart / bleedEnd',
        //   sm: 'contentStart / contentEnd',
        // }}
        col="contentStart / contentEnd"
        role="navigation"
      >
        <List>
          <ListItem>
            <Nameplate to={'/'}>
              {siteName}
              {/* acronymize(siteName) */}
            </Nameplate>
          </ListItem>
          {menuItems.map(({ id, slug, url, service, title, __typename }) => (
            <ListItem key={id}>
              <NavLink
                to={url || '/' + slug}
                activeClassName="MenuItem--active"
              >
                {__typename === 'ContentfulSocialMediaLink' ? (
                  <Icon icon={service.toLowerCase()} />
                ) : (
                  title
                )}
              </NavLink>
            </ListItem>
          ))}
        </List>
      </Nav>
    </Wrapper>
  );
};

Header.propTypes = propTypes;

Header.defaultProps = defaultProps;

export default Header;
