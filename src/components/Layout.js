import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';

import theme from 'style/theme';

import GlobalStyle from 'components/GlobalStyle';
import Background from 'components/BackgroundGraphics';
import Head from 'components/Head';
import Header from 'components/Header';
import Footer from 'components/Footer';

const propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

const Wrapper = styled('div')({
  position: 'relative',
  display: 'flex',
  width: '100vw',
  minHeight: '100vh',
  flexFlow: 'column nowrap',
  overflow: 'hidden',
});

const Main = styled('main')({
  display: 'flex',
  flexFlow: 'column nowrap',
  flex: '1',
});

const Layout = ({ children, location }) => {
  const {
    menu: { menuItems },
    site: { siteMetadata },
    socialMedia,
  } = useStaticQuery(
    graphql`
      query Layout {
        site {
          siteMetadata {
            description
            name
            short_name
            siteUrl
          }
        }
        socialMedia: allContentfulSocialMediaLink {
          edges {
            node {
              service
              url
            }
          }
        }
        menu: contentfulMenu {
          menuItems {
            ... on ContentfulPage {
              id
              title
              slug
            }
            ... on ContentfulSocialMediaLink {
              id
              service
              url
            }
          }
        }
      }
    `
  );

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Head
          location={location}
          siteMetadata={siteMetadata}
          socialMedia={socialMedia}
        />
        <GlobalStyle />
        <Background />
        <Header siteName={siteMetadata.name} menuItems={menuItems} />
        <Main role="main">{children}</Main>
        <Footer siteName={siteMetadata.name} />
      </Wrapper>
    </ThemeProvider>
  );
};

Layout.propTypes = propTypes;

export default Layout;
