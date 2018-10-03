import React from 'react'
import PropTypes from 'prop-types'
import { PageRenderer } from 'gatsby'

import ViewportObserver from 'components/ViewportObserver'
import Main from './components/Main'
import Wrap from './components/Wrap'

import GlobalStyle from 'components/GlobalStyle'
import Head from 'components/Head'
import Header from 'components/Header'
import Footer from 'components/Footer'
import Graphics from 'components/Graphics'

let Modal

import('components/Modal').then(modal => {
  Modal = modal.default
})

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  hasHero: PropTypes.bool,
}

const defaultProps = {
  hasHero: false,
}

class Layout extends React.Component {

  render ()  {

    const {
      children,
      location,
      title,
      hasHero,
      locale,
      isModal,
      data,
    } = this.props

    if (isModal) {
      return (
        <React.Fragment>
          <PageRenderer location={{pathname: location.state && location.state.origin ? location.state.origin : location.pathname}} />
          <Modal
            isOpen
            location={location}
          >
            {children}
          </Modal>
        </React.Fragment>
      )
    }

    return (
      <ViewportObserver.Provider>
        <Wrap>
          <GlobalStyle />
          <Graphics />
          <Head
            pageTitle={title}
            location={location}
            siteMetadata={data.site.siteMetadata}
            socialMedia={data.socialMedia.edges.map(edge => edge.node)}
            locale={locale}
          />
          <Header
            siteTitle={data.site.siteMetadata.siteTitle}
            pages={data.menu.menuItems}
            isAboveHero={hasHero}
            location={location}
          />
          <Main>
            {children}
          </Main>
          <Footer
            siteTitle={data.site.siteMetadata.siteTitle}
          />
        </Wrap>
      </ViewportObserver.Provider>
    )
  }
}

Layout.propTypes = propTypes

Layout.defaultProps = defaultProps

export default Layout
