import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { observer, inject } from 'mobx-react'

import Modal from 'components/Modal'
import Wrap from 'components/Wrap'
import Header from 'components/Header'

import globalStyle from 'utils/globalStyle'
import breakpoints from 'utils/breakpoints'

const propTypes = {
  children: PropTypes.func,
  breakpoint: PropTypes.number,
}

const defaultProps = {
  breakpoint: breakpoints.md,
}

const Layout = (props) => {

  const {
    children,
    location,
    data,
    breakpoint,
    UIStore
  } = props

  const modalEnabled = (
    location.state &&
    location.state.enableModal &&
    UIStore.viewportWidth >= breakpoint
  )

  return (
    <Wrap>
      <Header siteTitle={data.site.siteMetadata.title} />
      {modalEnabled ?
        (
          children({
            ...props,
            location: { pathname: '/' },
          })
        ) : (
          children()
        )
      }
      {modalEnabled && (
        <Modal
          isOpen
          posts={data.selectedArtwork.edges}
          location={location}
        >
          {children}
        </Modal>
      )}
    </Wrap>
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
    selectedArtwork: allContentfulArtPiece (
      sort: {fields: [date], order: DESC }
    ) {
      edges {
        node {
          ...ArtPieceFragment
        }
      }
    }
  }
`
