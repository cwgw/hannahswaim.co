import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import breakpoints from 'utils/breakpoints'

import ArtPieceDetails from 'components/ArtPieceDetails'
import Container from 'components/Container'
import FlexContainer from 'components/FlexContainer'
import Navigation from 'components/PostNavigation'

const propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  pathContext: PropTypes.shape({
    next: PropTypes.object,
    previous: PropTypes.object,
  }).isRequired,
  data: PropTypes.shape({
    artPiece: PropTypes.object,
  }).isRequired,
  UIStore: PropTypes.object,
}

const FixedFlexContainer = FlexContainer.extend`
  position: fixed;
  width: 100%;
  top: 50%;
  left: 0;
  transform: translate(0,-50%);
`

function ArtPieceTemplate (props) {

  const {
    location,
    pathContext: {
      next,
      previous,
    },
    data: {
      artPiece
    },
    modalEnabled,
    UIStore,
  } = props


  const formatLocation = (node) => node
    ? {
      pathname: node.fields.slug,
      state: location.state,
    }
    : null

  return modalEnabled
    ? (
      <Navigation
        next={formatLocation(next)}
        previous={formatLocation(previous)}
        variant={modalEnabled ? 'dark' : 'light'}
        fixed={modalEnabled}
      >
        <ArtPieceDetails
          modalEnabled={modalEnabled}
          {...artPiece}
        />
      </Navigation>
    ) : (
      <div>
        <Navigation
          next={formatLocation(next)}
          previous={formatLocation(previous)}
          fixed={UIStore.viewportWidth >= breakpoints.modal}
        />
        <ArtPieceDetails {...artPiece} />
      </div>
    )
}

ArtPieceTemplate.propTypes = propTypes

export default inject('UIStore')(observer(ArtPieceTemplate))

export const pageQuery = graphql`
  query singleArtPiece($id: String!) {
    artPiece: contentfulArtPiece(id: {eq: $id}) {
      ...ArtPieceDetailsFragment
    }
  }
`
