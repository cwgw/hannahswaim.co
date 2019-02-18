import React from 'react'
import PropTypes from 'prop-types'
import { PageRenderer, StaticQuery, graphql } from 'gatsby'
import _get from 'lodash/get'

import GlobalStyle from 'components/GlobalStyle'
import Background from 'components/BackgroundGraphics'
import Head from 'components/Head'
import Header from 'components/Header'
import Footer from 'components/Footer'
import Modal from 'components/Modal'

const propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
}

const Layout = ({
  children,
  location,
}) => {
  const isModalEnabled = typeof window !== 'undefined' && window.___HMS_INITIAL_RENDER_COMPLETE && _get(location, 'state.enableModal', false)
  return isModalEnabled
    ? (
      <React.Fragment>
        <PageRenderer
          location={{
            pathname: _get(location, 'state.origin', location.pathname)
          }}
        />
        <Modal
          isOpen={isModalEnabled}
          location={location}
          >
          {React.Children.map(children, child => React.cloneElement(child, {isModalEnabled}))}
        </Modal>
      </React.Fragment>
    )
    : (
      <StaticQuery
        query={graphql`
          query Layout {
            site {
              siteMetadata {
                siteTitle
                siteTitleSeparator
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
        `}
        render={({
          site: {
            siteMetadata
          },
          menu: {
            menuItems
          },
          socialMedia
        }) => (
          <React.Fragment>
            <GlobalStyle />
            <Background />
            <Head
              location={location}
              siteMetadata={siteMetadata}
              socialMedia={socialMedia.edges.map(({node}) => node)}
            />
            <Header
              siteTitle={siteMetadata.siteTitle}
              menuItems={menuItems}
            />
            <main role="main" >
              {children}
            </main>
            <Footer siteTitle={siteMetadata.siteTitle} />
            <Modal />
          </React.Fragment>
        )}
      />
    )
}

Layout.propTypes = propTypes

export default Layout
