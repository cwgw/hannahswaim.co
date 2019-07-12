import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { spacing, fontSizes, rem } from 'style/sizing';
import { colors } from 'style/constants';

import Box from 'components/Box';
import Flex from 'components/Flex';
import Icon from 'components/Icon';
import Link from 'components/Link';

const propTypes = {
  siteTitle: PropTypes.string,
};

const defaultProps = {
  siteTitle: null,
};

const Wrapper = styled(Box)`
  text-align: center;
  background-color: ${colors.brand[6]};
  color: ${colors.brand[4]};

  a {
    display: block;
    padding: ${spacing('sm')} ${spacing('md')};
    font-size: ${rem(fontSizes.small)};
    color: ${colors.brand[3]};
    border: 1px solid ${colors.brand[5]};
  }

  a:hover,
  a:focus {
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
    max-width: ${spacing(15)};
    flex-basis: 0;
  }

  & li + li {
    margin-left: -1px;
  }
`;

const Footer = ({ siteTitle, ...props }) => (
  <Wrapper {...props}>
    <Nav>
      <List>
        <li>
          <Link
            to="https://www.instagram.com/hannahswaimco/"
            title="follow me on Instagram"
          >
            <Icon icon="instagram" />
            {'@hannahswaimco'}
          </Link>
        </li>
        <li>
          <Link to="mailto:hannahswaimco@gmail.com" title="send me an email">
            <Icon icon="mail" />
            {'get in touch'}
          </Link>
        </li>
      </List>
    </Nav>
    <p>{siteTitle}</p>
  </Wrapper>
);

Footer.propTypes = propTypes;

Footer.defaultProps = defaultProps;

export default Footer;
