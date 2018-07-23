import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import { PageRenderer } from 'gatsby'

import Wrap from './components/Wrap'
import Head from 'components/Head'
import Header from 'components/Header'
import Footer from 'components/Footer'

import globalStyle from 'utils/globalStyle' // eslint-disable-line no-unused-vars
import { breakpoints } from 'utils/constants'

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
      UIStore,
      title,
      hasHero,
      locale,
      data,
    } = this.props

    const modalEnabled = !!(
      location.state &&
      location.state.enableModal &&
      UIStore.viewportWidth >= breakpoints.modal
    )

    return modalEnabled ?
    (
      <React.Fragment>
        <PageRenderer location={{pathname: location.state && location.state.origin ? location.state.origin : location.pathname}} />
        <Modal
          isOpen
          location={location}
        >
          {children}
        </Modal>
      </React.Fragment>
    ) : (
      <Wrap
        noScroll={UIStore.isNavOpen ? true : false}
      >
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
        />
        <main role="main" >
          {children}
        </main>
        <Footer
          siteTitle={data.site.siteMetadata.siteTitle}
        />
      </Wrap>
    )
  }
}

Layout.propTypes = propTypes

Layout.defaultProps = defaultProps

export default inject('UIStore')(observer(Layout))
