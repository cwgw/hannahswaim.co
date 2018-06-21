import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import { PageRenderer, StaticQuery } from 'gatsby'

import Wrap from 'components/Wrap'
import Header from 'components/Header'
import Footer from 'components/Footer'

import globalStyle from 'utils/globalStyle' // eslint-disable-line no-unused-vars
import breakpoints from 'utils/breakpoints'

let Modal
import('components/Modal').then(modal => {
  Modal = modal.default
})

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
}

const defaultProps = {}

const Layout = (props) => {

  const {
    children,
    location,
    UIStore,
    enableModal,
  } = props

  const modalEnabled = !!(
    location.state &&
    location.state.enableModal &&
    UIStore.viewportWidth >= breakpoints.modal
  )

  const renderLayout = (data) => {
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
        )}
      </React.Fragment>
    ) : (
      <Wrap>
        <Header
          siteTitle={data.site.siteMetadata.title}
          pages={data.menu.menuItems}
        />
        <main>
          {children}
        </main>
        <Footer
          siteTitle={data.site.siteMetadata.title}
          pages={data.menu.menuItems}
        />
      </Wrap>
    )
  }

  return (
    <StaticQuery
      query={graphql`
        query layout {
          site {
            siteMetadata {
              title
            }
          }
          menu: contentfulMenu {
            ...NavigationItems
          }
        }
      `}
      render={renderLayout}
    />
  )
}

Layout.propTypes = propTypes

Layout.defaultProps = defaultProps

export default inject('UIStore')(observer(Layout))
