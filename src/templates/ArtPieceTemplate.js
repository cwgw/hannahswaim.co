import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { graphql } from 'gatsby'

import { breakpoints } from 'utils/constants'
import { isSet } from 'utils/helpers'

import Layout from 'components/Layout'
import ArtPieceDetails from 'components/ArtPieceDetails'
import PostNavigation from 'components/PostNavigation'

const propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  pageContext: PropTypes.shape({
    next: PropTypes.string,
    previous: PropTypes.string,
  }).isRequired,
  data: PropTypes.shape({
    artPiece: PropTypes.object,
  }).isRequired,
  UIStore: PropTypes.object,
}

function ArtPieceTemplate (props) {

  const {
    location,
    pageContext,
    data: {
      artPiece
    },
    UIStore,
  } = props

  const modalEnabled = !!(
    isSet(location.state)
    && location.state.enableModal
    && UIStore.viewportWidth >= breakpoints.modal
  )

  let next, previous

  if (modalEnabled) {

    const {
      siblings,
      index,
    } = location.state || {}

    next = {
      pathname: index + 1 < siblings.length ? siblings[index + 1] : null,
      state: {
        ...location.state,
        index: index + 1,
      }
    }
    previous = {
      pathname: index > 0 ? siblings[index - 1] : null,
      state: {
        ...location.state,
        index: index - 1,
      }
    }
  } else {
    next = {
      pathname: pageContext.next,
      state: location.state,
    }
    previous = {
      pathname: pageContext.previous,
      state: location.state,
    }
  }

  return (
    <Layout location={location} >
      {modalEnabled ? (
        <PostNavigation
          next={next}
          previous={previous}
          variant="dark"
          fullHeight
          fixed
        >
          <ArtPieceDetails
            modalEnabled={modalEnabled}
            {...artPiece}
          />
        </PostNavigation>
      ) : (
        <React.Fragment>
          <PostNavigation
            next={next}
            previous={previous}
            fixed={UIStore.viewportWidth >= breakpoints.modal}
          />
          <ArtPieceDetails {...artPiece} />
        </React.Fragment>
      )}
    </Layout>
  )
}

ArtPieceTemplate.propTypes = propTypes

export default inject('UIStore')(observer(ArtPieceTemplate))

export const pageQuery = graphql`
  query singleArtPiece($id: String!) {
    artPiece: contentfulArtPiece(contentful_id: {eq: $id}) {
      ...ArtPieceDetailsFragment
    }
  }
`
