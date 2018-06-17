import React from 'react'
import PropTypes from 'prop-types'

import ArtPieceDetails from 'components/ArtPieceDetails'

function ArtPieceTemplate (props) {

  console.log(props)

  return (
    <ArtPieceDetails
      modalEnabled={props.location.state && props.location.state.enableModal}
      previous={props.pathContext.previous}
      next={props.pathContext.next}
      {...props.data.artPiece}
    />
  )
}

export default ArtPieceTemplate

export const pageQuery = graphql`
  query singleArtPiece($id: String!) {
    artPiece: contentfulArtPiece(id: {eq: $id}) {
      ...ArtPieceDetailsFragment
    }
  }
`
