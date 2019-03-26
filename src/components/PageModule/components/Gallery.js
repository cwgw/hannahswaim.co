import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import ImageWall from 'components/ImageWall'
import Piece from 'components/Piece'

import { Dummy } from 'hooks/useIntersectionObserver'

const propTypes = {
  artwork: PropTypes.array.isRequired,
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ])
}

const defaultProps = {}

const Gallery = ({
  location,
  artwork,
  id,
  ...props
}) => {

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
    <ImageWall
      items={edges.map(({node}) => node)}
      childAspectRatioResolver={({images}) => (images[0] && images[0].fluid && images[0].fluid.aspectRatio) || 1}
      {...props}
      >
      {edges.map(({node}, index) => (
        <Piece
          key={node.id}
          location={location}
          siblings={siblings}
          siblingIndex={index}
          {...node}
        />
      ))}
    </ImageWall>
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
        fluid(maxWidth: 480, quality: 90) {
          aspectRatio
          ...GatsbyContentfulFluid_withWebp
        }
      }
    }
  }
`
