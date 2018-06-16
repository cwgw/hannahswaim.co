import React from 'react'
import PropTypes from 'prop-types'

import Container from 'components/Container'
import ArtPiece from 'components/ArtPiece'

const propTypes = {
  edges: PropTypes.array,
}

const defaultProps = {
  edges: [],
}

function Gallery ({edges}) {

  const renderArtPieces = ({node}) => (
    <ArtPiece
      key={node.id}
      {...node}
    />
  )

  return (
    <Container flex >
      {edges.map(renderArtPieces)}
    </Container>
  )
}

Gallery.propTypes = propTypes

Gallery.defaultProps = defaultProps

export default Gallery
