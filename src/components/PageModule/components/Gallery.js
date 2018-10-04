import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Wall from 'components/Wall'
import ArtPiece from 'components/ArtPiece'

const propTypes = {
  artwork: PropTypes.array.isRequired,
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ])
}

const defaultProps = {}

function Gallery ({location, artwork}) {

  const edges = artwork
    .slice()
    .sort((a,b) => {
      return b.date - a.date
    })
    .map((item) => {
      return {
        node: {
          ...item,
          date: item.date.slice(0,4)
        }
      }
    })

  const siblings = edges.map(({node}) => node.fields.slug)

  return (
    <Wall>
      {edges.map(({node}, index) => (
        <ArtPiece
          key={node.id}
          location={location}
          siblings={siblings}
          siblingIndex={index}
          {...node}
        />
      ))}
    </Wall>
  )
}

Gallery.propTypes = propTypes

Gallery.defaultProps = defaultProps

export default Gallery

export const pageQuery = graphql`
  fragment PageArtwork on ContentfulPageArtworkGallery {
    id
    artwork {
      id
      fields {
        slug
      }
      title
      date(formatString: "YYYYMMDD")
      media
      childContentfulArtPieceDimensionsJsonNode {
        height
        width
        depth
        units
      }
      images {
        id
        sqip(numberOfPrimitives: 6, mode: 4, blur: 10) {
          dataURI
        }
        fluid(maxWidth: 480, quality: 90) {
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
        }
      }
    }
  }
`
