import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { spacing } from 'style/sizing';
import { media } from 'style/layout';
import { acronymize } from 'utils/formatting';
import { colors, navBreakpoint } from 'style/constants';
import UIContext from 'context/UI';
import { StandardGrid } from 'components/Grid';
import Box from 'components/Box';
import Button from 'components/Button';
import Icon from 'components/Icon';

const propTypes = {
  siteTitle: PropTypes.string.isRequired,
  pages: PropTypes.array,
};

const defaultProps = {
  pages: [],
  isAboveHero: false,
};

const Wrapper = styled(StandardGrid)`
  width: 100%;
  position: relative;
  z-index: 10;

  ${media.min.lg`
    position: absolute;
  `}
`;

const Nav = styled(Box)`
  padding: ${spacing('md')};
  white-space: nowrap;
  overflow: scroll;

  ${media.min[navBreakpoint]`
    padding-left: 0;
    padding-right: 0;
  `}
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

  &:last-child:after {
    display: inline-block;
    width: ${spacing('md')};
    content: '';
  }
`;
  
const Nameplate = styled(Button)`
  margin: 0 1px;
`;

const Header = ({ siteTitle, menuItems }) => {
  const { isViewport } = React.useContext(UIContext);
  return (
    <Wrapper role="banner" as="header">
      <Nav
        as="nav"
        gridColumn={{
          base: 'bleedStart / bleedEnd',
          [navBreakpoint]: 'contentStart / contentEnd',
        }}
        role="navigation"
      >
        <Nameplate to={'/'} title="Home">
          {siteTitle}
        </Nameplate>
        {menuItems.map(({ id, slug, url, service, title, __typename }) => (
          <NavLink
            key={id}
            to={url || '/' + slug}
            title={title || service}
            activeClassName="MenuItem--active"
          >
            {__typename === 'ContentfulSocialMediaLink' ? (
              <Icon type={service} inline />
            ) : (
              title
            )}
          </NavLink>
        ))}
      </Nav>
    </Wrapper>
  );
};

Header.propTypes = propTypes;

Header.defaultProps = defaultProps;

export default Header;
