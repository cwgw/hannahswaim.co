import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import GatsbyImage from 'gatsby-image'
import GatsbyLink from 'gatsby-link'

import media from 'utils/media'
import { artPieceSlug } from 'utils/slugify'

import Details from './components/Details'

const propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  images: PropTypes.array,
  childContentfulArtPieceDimensionsJsonNode: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
    depth: PropTypes.number,
    units: PropTypes.string,
  })
}

const defaultProps = {}

const Default = styled.figure`
  width: 100%;

  ${media.min.sm`
    width: 50%;
    padding: 0.75rem;
  `}

  ${media.min.lg`
    width: 33.33%;
    padding: 0.75rem;
  `}
`

function ArtPiece (props) {

  const  {
    id,
    title,
    date,
    media,
    images,
    childContentfulArtPieceDimensionsJsonNode: dimensions,
  } = props

  return (
    <Default>
      <GatsbyLink to={`/artwork/${artPieceSlug(props)}`} >
        <GatsbyImage
          sizes={images[0].sizes}
        />
      </GatsbyLink>
      <Details
        title={title}
        date={date}
        media={media}
        dimensions={dimensions}
      />
    </Default>
  )
}

ArtPiece.propTypes = propTypes

ArtPiece.defaultProps = defaultProps

export default ArtPiece

export const artPieceFragments = graphql`
  fragment ArtPieceFragment on ContentfulArtPiece {
    id
    childContentfulArtPieceDimensionsJsonNode {
      height
      width
      depth
      units
    }
    title
    date(formatString: "YYYY")
    media
    images {
      id
      sizes(maxWidth: 480, quality: 90) {
        base64
        tracedSVG
        aspectRatio
        src
        srcSet
        srcWebp
        srcSetWebp
        sizes
      }
    }
  }
`
