import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'

import GatsbyLink from 'gatsby-link'

import { artPieceSlug } from 'utils/slugify'
import breakpoints from 'utils/breakpoints'

import Wall from 'components/Wall'
import Modal from 'components/Modal'
import ArtPiece from 'components/ArtPiece'

const propTypes = {
  location: PropTypes.object.isRequired,
  edges: PropTypes.array,
  breakpoint: PropTypes.number,
}

const defaultProps = {
  edges: [],
  breakpoint: breakpoints.md,
}

function Gallery ({edges, location, breakpoint, UIStore}) {

  const modalEnabled = UIStore.viewportWidth >= breakpoint

  const renderArtPieces = ({node}) => (
    <GatsbyLink
      key={node.id}
      to={{
        pathname: `/artwork/${artPieceSlug(node)}`,
        state: {
          enableModal: modalEnabled
        }
      }}
    >
      <ArtPiece {...node} key={node.id} />
    </GatsbyLink>
  )

  return (
    <Wall>
      {edges.map(renderArtPieces)}
    </Wall>
  )
}

Gallery.propTypes = propTypes

Gallery.defaultProps = defaultProps

export default inject('UIStore')(observer(Gallery))
