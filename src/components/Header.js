import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { spacing } from 'style/sizing';
import { media } from 'style/layout';
import { acronymize } from 'utils/formatting';
import { colors, navBreakpoint } from 'style/constants';
import UIContext from 'context/UI';
import { StandardGrid } from 'components/Grid';
import Flex from 'components/Flex';
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

const Nav = styled(Flex)`
  flex-flow: row nowrap;
  align-items: baseline;
  margin-right: auto;
  padding-top: ${spacing('md')};
  padding-bottom: ${spacing('md')};
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

const Header = ({ siteTitle, menuItems }) => {
  const { isViewport } = React.useContext(UIContext);
  return (
    <Wrapper role="banner" as="header">
      <Nav
        as="nav"
        gridColumn="contentStart / contentEnd"
        justifyContent={
          isViewport[navBreakpoint] ? 'space-between' : 'flex-start'
        }
        role="navigation"
      >
        <Nameplate to={'/'} title="Home">
          {isViewport.xs ? siteTitle : acronymize(siteTitle)}
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
