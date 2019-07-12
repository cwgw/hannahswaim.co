import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PageRenderer, useStaticQuery, graphql } from 'gatsby';
import get from 'lodash/get';

import UIContext from 'context/UI';
import { modalBreakpoint } from 'style/constants';

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

const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 100vw;
  min-height: 100vh;
  flex-flow: column nowrap;
  overflow: hidden;
`;

const Main = styled.main`
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
`;

const Layout = ({ children, location, ...props }) => {
  const { isViewport } = React.useContext(UIContext);
  const isInitialRender = React.useRef(
    typeof window !== 'undefined' && !!!window.___IS_INITIAL_RENDER_COMPLETE
  );
  const isModalEnabled =
    isInitialRender &&
    get(location, 'state.enableModal', false) &&
    isViewport[modalBreakpoint];

  if (isModalEnabled) {
    return (
      <React.Fragment>
        <PageRenderer
          location={{
            pathname: get(location, 'state.origin', location.pathname),
          }}
        />
        <Modal isOpen={isModalEnabled} location={location}>
          {React.Children.map(children, child =>
            React.cloneElement(child, { isModalEnabled })
          )}
        </Modal>
      </React.Fragment>
    );
  }

  const {
    menu: { menuItems },
    site: { siteMetadata },
    socialMedia,
  } = useStaticQuery(
    graphql`
      query Layout {
        site {
          siteMetadata {
            siteTitle
            siteTitleSeparator
            siteUrl
            description
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
    <Wrapper>
      <Head
        location={location}
        siteMetadata={siteMetadata}
        socialMedia={socialMedia}
      />
      <GlobalStyle />
      <Background />
      <Header siteTitle={siteMetadata.siteTitle} menuItems={menuItems} />
      <Main role="main">{children}</Main>
      <Footer siteTitle={siteMetadata.siteTitle} />
    </Wrapper>
  );
};

Layout.propTypes = propTypes;

export default Layout;
