import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { colors } from 'style/tokens';
import spacing from 'style/spacing';
import type from 'style/type';

import Box from 'components/Box';
import Icon from 'components/Icon';
import Link from 'components/Link';

const propTypes = {
  siteName: PropTypes.string,
};

const defaultProps = {
  siteTitle: null,
};

const Wrapper = styled(Box)`
  text-align: center;
  background-color: ${colors.brand[6]};
  color: ${colors.brand[4]};

  ${Link} {
    display: block;
    padding: ${spacing('sm')} ${spacing('md')};
    color: ${colors.brand[3]};
    border: 1px solid ${colors.brand[5]};
    ${type.small}
  }

  ${Link}:hover,
  ${Link}:focus {
    background: ${colors.gray[3]};
    color: ${colors.brand[5]};
  }

  & > * {
    padding: ${spacing('sm')} ${spacing('md')};
  }

  & ${Icon} {
    font-size: 2rem;
    display: block;
    margin: 0 auto;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const List = styled.ul`
  display: contents;

  & li {
    list-style: none;
    display: inline-block;
    flex-grow: 1;
    max-width: ${spacing('xxl')};
    flex-basis: 0;
  }

  & li + li {
    margin-left: -1px;
  }
`;

const Footer = ({ siteName, ...props }) => (
  <Wrapper {...props}>
    <Nav>
      <List>
        <li>
          <Link to="https://www.instagram.com/hannahswaimco/">
            <Icon icon="instagram" />
            {'@hannahswaimco'}
          </Link>
        </li>
        <li>
          <Link to="mailto:hannahswaimco@gmail.com">
            <Icon icon="mail" />
            {'get in touch'}
          </Link>
        </li>
      </List>
    </Nav>
    <p>{siteName}</p>
  </Wrapper>
);

Footer.propTypes = propTypes;

Footer.defaultProps = defaultProps;

export default Footer;
