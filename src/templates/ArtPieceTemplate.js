import React from 'react'
import PropTypes from 'prop-types'

import ArtPiece from 'components/ArtPiece'

function ArtPieceTemplate (props) {

  return (
    <ArtPiece {...props.data.artPiece} />
  )
}

export default ArtPieceTemplate

export const pageQuery = graphql`
  query singleArtPiece($id: String!) {
    artPiece: contentfulArtPiece(id: {eq: $id}) {
      ...ArtPieceFragment
    }
  }
`
