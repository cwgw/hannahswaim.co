import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'

import GatsbyImage from 'gatsby-image'
import { Link as GatsbyLink, graphql } from 'gatsby'

import spacing from 'utils/spacing'
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
}

const defaultProps = {
  className: null,
  captionBreakpoint: breakpoints.lg,
}

const Link = styled(GatsbyLink)`
  display: block;
  break-inside: avoid;
  margin-bottom: ${spacing(2)};

  &:focus {
    outline: none;
  }
`

const Figure = styled.figure`
  position: relative;
  margin: 0;
  background-color: ${colors.coolBlack};
  background-color: transparent;
`

const Image = styled(GatsbyImage)`

  ${Link}:focus & {
    opacity: 0.75;
  }
`

const Caption = styled.figcaption`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: ${spacing(-1)};
  opacity: 0;
  transform: translate(0,-${spacing(2)});
  transition: transform 175ms ${ease} 100ms,
              opacity 350ms ${ease} 0ms;

  ${Figure}:hover & {
    opacity: 1;
    transform: translate(0,0);
    transition-delay: 0ms;
  }
`

function ArtPiece (props) {

  const  {
    location,
    id,
    title,
    date,
    media,
    images,
    fields: {
      slug,
    },
    next,
    previous,
    UIStore,
    captionBreakpoint,
    childContentfulArtPieceDimensionsJsonNode: dimensions,
  } = props

  // console.log(location.pathname)

  return (
    <Link
      key={id}
      to={{
        pathname: slug,
        state: {
          enableModal: UIStore.viewportWidth >= breakpoints.modal,
          origin: location.pathname,
          next: next,
          previous: previous,
        }
      }}
      >
      <Figure>
        <Image
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
      sqip(numberOfPrimitives: 10, mode: 4, blur: 10) {
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
