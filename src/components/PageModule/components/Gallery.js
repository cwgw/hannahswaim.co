import React from 'react'
import PropTypes from 'prop-types'

import Wall from 'components/Wall'
import ArtPiece from 'components/ArtPiece'

const propTypes = {
  edges: PropTypes.array,
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ])
}

const defaultProps = {
  edges: [],
}

function Gallery ({edges, location}) {

  const siblings = edges.map(({node}) => node.fields.slug)

  // console.log(siblings)

  const renderArtPieces = ({node}, index) => (
    <ArtPiece
      key={node.id}
      location={location}
      siblings={siblings}
      siblingIndex={index}
      {...node}
    />
  )

  return (
    <Wall>
      {edges.map(renderArtPieces)}
    </Wall>
  )
}

Gallery.propTypes = propTypes

Gallery.defaultProps = defaultProps

export default Gallery
