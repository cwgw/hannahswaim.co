import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { observer, inject } from 'mobx-react'

import Page from 'components/Page'
import Modal from 'components/Modal'
import Wrap from 'components/Wrap'
import Navigation from 'components/Header/components/Navigation'

import globalStyle from 'utils/globalStyle'
import breakpoints from 'utils/breakpoints'

const propTypes = {
  children: PropTypes.func,
}

const defaultProps = {}

const Layout = (props) => {

  const {
    children,
    location,
    data: {
      site: {
        siteMetadata,
      },
      menu,
    },
    UIStore
  } = props

  const modalEnabled = !!(
    location.state &&
    location.state.enableModal &&
    UIStore.viewportWidth >= breakpoints.modal
  )

  return (
    <Page
      siteMetadata={siteMetadata}
      menu={menu}
    >
      {modalEnabled ?
        (
          children({
            ...props,
            location: { pathname: location.state.origin },
            modalEnabled: modalEnabled,
          })
        ) : (
          children()
        )
      }
      {modalEnabled && (
        <Modal
          isOpen
          location={location}
        >
          {children({
            ...props,
            location: location,
            modalEnabled: modalEnabled,
          })}
        </Modal>
      )}
    </Page>
  )
}

Layout.propTypes = propTypes

Layout.defaultProps = defaultProps

export default inject('UIStore')(observer(Layout))

export const query = graphql`
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
`
