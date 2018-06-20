import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'

import breakpoints from 'utils/breakpoints'

import Wall from 'components/Wall'
import Modal from 'components/Modal'
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

  const renderArtPieces = ({node}) => (
    <ArtPiece
      key={node.id}
      location={location}
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
