import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import { transparentize } from 'polished'

import GatsbyImage from 'gatsby-image'
import { Link as GatsbyLink, graphql } from 'gatsby'

import spacing from 'utils/spacing'
import media from 'utils/media'
import { breakpoints, ease, colors } from 'utils/constants'

import Meta from 'components/ArtPieceMeta'

const propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
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
  className: PropTypes.string,
  captionBreakpoint: PropTypes.number,
  siblings: PropTypes.array,
  index: PropTypes.number,
}

const defaultProps = {
  className: null,
  captionBreakpoint: breakpoints.lg,
  siblings: [],
  index: 0,
  style: {},
}

const Link = styled(GatsbyLink)`
  display: block;
  break-inside: avoid;
  margin-bottom: ${spacing(2)};
  color: ${colors.white};
  position: relative;

  ${media.min.lg`

    &:after {
      content: '';
      position: absolute;
      top: ${spacing(-3)};
      left: ${spacing(-3)};
      right: ${spacing(-3)};
      bottom: ${spacing(-3)};
      border: 1px solid transparent;
      background-color: ${transparentize(0.5, colors.gray[1])};
      transition: opacity 175ms ${ease};
      opacity: 0;
    }

    &:focus {
      outline: none;
      background-color: ${colors.coolBlack};

      &:after {
        opacity: 1;
        border-color: currentColor;
      }
    }
  `}
`

const Figure = styled.figure`
  position: relative;
  margin: 0;
  overflow: hidden;
`

const Caption = styled.figcaption`
  position: absolute;
  z-index: 1;
  right: 0;
  bottom: 0;
  left: 0;
  padding: ${spacing(-1)};
  margin: ${spacing(-3)};
  opacity: 0;
  background-color: ${transparentize(0.5, colors.gray[1])};
  transform: translate3d(0,${spacing(2)},0);
  transition: transform 175ms ${ease} 100ms,
              opacity 350ms ${ease} 0ms,
              background-color 175ms ${ease};

  ${Link}:hover &,
  ${Link}:focus & {
    opacity: 1;
    transform: translate3d(0,0,0);
    transition-delay: 0ms;
  }
  ${Link}:focus & {
    background-color: ${transparentize(1, colors.gray[1])};
  }
`

function ArtPiece (props) {

  const  {
    location,
    siblings,
    siblingIndex,
    id,
    title,
    date,
    media,
    images,
    fields: {
      slug,
    },
    UIStore,
    captionBreakpoint,
    childContentfulArtPieceDimensionsJsonNode: dimensions,
    style,
  } = props

  return (
    <Link
      key={id}
      to={{
        pathname: slug,
        state: {
          enableModal: UIStore.viewportWidth >= breakpoints.modal,
          origin: location.pathname,
          siblings: siblings,
          index: siblingIndex,
        }
      }}
      style={style}
    >
      <Figure>
        <GatsbyImage
          fluid={{
            ...images[0].fluid,
            base64: images[0].sqip.dataURI
          }}
        />
        {UIStore.viewportWidth >= captionBreakpoint && (
          <Caption>
            <Meta
              title={title}
              date={date}
              media={media}
              dimensions={dimensions}
            />
          </Caption>
        )}
      </Figure>
    </Link>
  )
}

ArtPiece.propTypes = propTypes

ArtPiece.defaultProps = defaultProps

export default inject('UIStore')(observer(ArtPiece))

export const artPieceFragments = graphql`
  fragment ArtPieceFragment on ContentfulArtPiece {
    id
    fields {
      slug
    }
    title
    date(formatString: "YYYY")
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
`
