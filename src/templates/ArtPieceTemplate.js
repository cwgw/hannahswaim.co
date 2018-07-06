import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { graphql } from 'gatsby'

import breakpoints from 'utils/breakpoints'

import Layout from 'components/Layout'
import ArtPieceDetails from 'components/ArtPieceDetails'
import PostNavigation from 'components/PostNavigation'

const propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  pageContext: PropTypes.shape({
    next: PropTypes.object,
    previous: PropTypes.object,
  }).isRequired,
  data: PropTypes.shape({
    artPiece: PropTypes.object,
  }).isRequired,
  UIStore: PropTypes.object,
}

function ArtPieceTemplate (props) {

  const {
    location,
    pageContext: {
      next,
      previous,
    },
    data: {
      artPiece
    },
    UIStore,
  } = props

  const modalEnabled = !!(
    location.state &&
    location.state.enableModal &&
    UIStore.viewportWidth >= breakpoints.modal
  )

  const formatLocation = (node) => node
    ? {
      pathname: node.fields.slug,
      state: location.state,
    }
    : null

  return modalEnabled
    ? (
      <Layout location={location} >
        <PostNavigation
          next={formatLocation(next)}
          previous={formatLocation(previous)}
          variant="dark"
          fullHeight
          fixed
        >
          <ArtPieceDetails
            modalEnabled={modalEnabled}
            {...artPiece}
          />
        </PostNavigation>
      </Layout>
    ) : (
      <Layout location={location} >
        <PostNavigation
          next={formatLocation(next)}
          previous={formatLocation(previous)}
          fixed={UIStore.viewportWidth >= breakpoints.modal}
        />
        <ArtPieceDetails {...artPiece} />
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
