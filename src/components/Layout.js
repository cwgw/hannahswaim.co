import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { PageRenderer, useStaticQuery, graphql } from 'gatsby';
import get from 'lodash/get';

import theme from 'style/theme';

import GlobalStyle from 'components/GlobalStyle';
import Background from 'components/BackgroundGraphics';
import Head from 'components/Head';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Modal from 'components/Modal';

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
  const isInitialRender = React.useRef(
    typeof window !== 'undefined' && !!!window.___IS_INITIAL_RENDER_COMPLETE
  );
  const isDesktop = typeof window !== 'undefined' && window.innerWidth > 576;
  const isModalEnabled =
    isInitialRender && get(location, 'state.enableModal', false) && isDesktop;

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

  if (isModalEnabled) {
    return (
      <React.Fragment>
        <PageRenderer
          location={{
            pathname: get(location, 'state.origin', location.pathname),
          }}
        />
        <ThemeProvider theme={theme}>
          <Modal isOpen={isModalEnabled} location={location}>
            {React.Children.map(children, child =>
              React.cloneElement(child, { isModalEnabled })
            )}
          </Modal>
        </ThemeProvider>
      </React.Fragment>
    );
  }

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
