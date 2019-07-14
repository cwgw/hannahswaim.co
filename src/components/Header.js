import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import UIContext from 'context/UI';
import { colors } from 'style/tokens';
import media from 'style/media-queries';
import spacing from 'style/spacing';
import { acronymize } from 'utils/formatting';

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

const Wrapper = styled(Grid)`
  width: 100%;
  position: relative;
  z-index: 10;
  margin: ${spacing('md')} 0;

  ${media.min.lg`
    position: absolute;
  `}
`;

const Nav = styled(Box)`
  white-space: nowrap;
  overflow: scroll;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 0 !important;
  }

  ${media.min.sm`
    padding-left: 0;
    padding-right: 0;
  `}
`;

const List = styled.ul`
  margin: 0 ${spacing('md')};
  padding: 0;
  list-style: none;
  white-space: nowrap;

  &:after {
    width: ${spacing('md')};
    display: inline-block;
    content: '';
  }

  ${media.min.sm`
    margin: 0;
    display: contents;
  `}
`;

const ListItem = styled.li`
  display: inline-block;
  display: contents;
`;

const NavLink = styled(Button)`
  min-width: ${spacing('xl')};
  margin: 0 1px;
  background: ${colors.white};

  &.MenuItem--active,
  &.MenuItem--active:hover,
  &.MenuItem--active:focus {
    background: none;
    color: ${colors.brand[2]};
    border-color: transparent;
  }
`;

const Nameplate = styled(Button)`
  margin: 0 1px;
`;

const Header = ({ siteName, menuItems }) => {
  const { isViewport } = React.useContext(UIContext);
  return (
    <Wrapper role="banner" as="header">
      <Nav
        as="nav"
        col={{
          base: 'bleedStart / bleedEnd',
          sm: 'contentStart / contentEnd',
        }}
        role="navigation"
      >
        <List>
          <ListItem>
            <Nameplate to={'/'}>
              {isViewport.xs ? siteName : acronymize(siteName)}
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
