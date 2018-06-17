import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { transparentize } from 'polished'
import { observer, inject } from 'mobx-react'

import GatsbyImage from 'gatsby-image'

import media from 'utils/media'
import { breakpoints } from 'utils/breakpoints'

import Meta from 'components/ArtPieceMeta'

const propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
  childContentfulArtPieceDimensionsJsonNode: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
    depth: PropTypes.number,
    units: PropTypes.string,
  }).isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  breakpoint: PropTypes.number,
}

const defaultProps = {
  style: {},
  className: null,
  breakpoint: breakpoints.lg,
}

const Default = styled.figure`
  width: 100%;
  position: relative;
  overflow: hidden;
`

const Caption = styled.figcaption`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1.5rem 0.75rem 0.75rem;

  opacity: 0;
  transform: translate3d(0,-3rem,0);
  transition: transform 175ms cubic-bezier(0.4, 0.0, 0.2, 1), opacity 350ms cubic-bezier(0.4, 0.0, 0.2, 1);
  transition-delay: 100ms, 0ms;

  ${Default}:hover & {
    opacity: 1;
    transform: translate3d(0,0,0);
    transition-delay: 0ms;
  }
`

function ArtPiece (props) {

  const  {
    id,
    title,
    date,
    media,
    images,
    style,
    UIStore,
    breakpoint,
    childContentfulArtPieceDimensionsJsonNode: dimensions,
  } = props

  return (
    <Default
      style={style}
    >
      <GatsbyImage
        sizes={images[0].sizes}
      />
      {UIStore.viewportWidth >= breakpoint && (
        <Caption>
          <Meta
            title={title}
            date={date}
            media={media}
            dimensions={dimensions}
          />
        </Caption>
      )}
    </Default>
  )
}

ArtPiece.propTypes = propTypes

ArtPiece.defaultProps = defaultProps

export default inject('UIStore')(observer(ArtPiece))

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
