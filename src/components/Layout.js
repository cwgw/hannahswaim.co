import React from 'react'
import PropTypes from 'prop-types'
import { PageRenderer, StaticQuery, graphql } from 'gatsby'
import _get from 'lodash/get'

import GlobalStyle from 'components/GlobalStyle'
import Background from 'components/BackgroundGraphics'
import Head from 'components/Head'
import Header from 'components/Header'
import Footer from 'components/Footer'

let Modal

import('components/Modal').then(modal => {
  Modal = modal.default
})

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  isModalEnabled: PropTypes.bool,
}

const defaultProps = {
  isModalEnabled: false,
}

const Layout = (props) => {
  // console.log(props)
  const {
    children,
    // isModalEnabled,
    location,
    title,
  } = props

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
        {children}
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
            pageTitle={title}
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

Layout.defaultProps = defaultProps

export default Layout
