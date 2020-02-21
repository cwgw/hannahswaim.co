import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import css from '@styled-system/css';

import Box from 'components/Box';
import Icon from 'components/Icon';
import Button from 'components/Button';
import Grid from 'components/Grid';

const propTypes = {
  siteName: PropTypes.string,
};

const defaultProps = {
  siteTitle: null,
};

const Wrapper = styled(Box)(
  css({
    textAlign: 'center',
    backgroundColor: 'brand.6',
    color: 'brand.4',
    '& > *': {
      paddingY: 'sm',
      paddingX: 'md',
    },
    [`& ${Icon}`]: {
      fontSize: '2rem',
      display: 'block',
      margin: '0 auto',
    },
  })
);

const List = styled(Box)(
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
    li: {
      listStyle: 'none',
      flexGrow: 1,
      marginLeft: '1px',
    },
    [Button]: {
      display: 'block',
    },
  })
);

const Footer = ({ siteName, ...props }) => (
  <Wrapper {...props}>
    <Grid as="nav">
      <List as="ul" col="contentStart / contentEnd">
        <li>
          <Button
            to="https://www.instagram.com/hannahswaimco/"
            variant="outline"
          >
            <Icon icon="instagram" />
            {'@hannahswaimco'}
          </Button>
        </li>
        <li>
          <Button to="mailto:hannahswaimco@gmail.com" variant="outline">
            <Icon icon="mail" />
            {'get in touch'}
          </Button>
        </li>
      </List>
    </Grid>
    <p>{siteName}</p>
  </Wrapper>
);

Footer.propTypes = propTypes;

Footer.defaultProps = defaultProps;

export default Footer;
