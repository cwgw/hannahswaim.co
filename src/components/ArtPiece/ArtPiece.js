import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { transparentize } from 'polished'
import { observer, inject } from 'mobx-react'

import GatsbyImage from 'gatsby-image'
import GatsbyLink from 'gatsby-link'

import media from 'utils/media'
import colors from 'utils/colors'
import { breakpoints } from 'utils/breakpoints'

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
  margin-bottom: 1.5rem;

  ${media.min.xl`
    margin-bottom: 3rem;
  `}

  &:focus {
    outline: none;
  }
`

const Figure = styled.figure`
  width: 100%;
  position: relative;
  overflow: hidden;
  margin: 0;

  ${Link}:focus & {
    background-color: ${colors.link};
  }
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
  padding: 1.5rem 0.75rem 0.75rem;

  opacity: 0;
  transform: translate3d(0,-3rem,0);
  transition: transform 175ms cubic-bezier(0.4, 0.0, 0.2, 1), opacity 350ms cubic-bezier(0.4, 0.0, 0.2, 1);
  transition-delay: 100ms, 0ms;

  ${Figure}:hover & {
    opacity: 1;
    transform: translate3d(0,0,0);
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
    UIStore,
    captionBreakpoint,
    childContentfulArtPieceDimensionsJsonNode: dimensions,
  } = props

  return (
    <Link
      key={id}
      to={{
        pathname: slug,
        state: {
          enableModal: UIStore.viewportWidth >= breakpoints.modal,
          origin: location.pathname,
        }
      }}
      >
      <Figure>
        <Image sizes={images[0].sizes} />
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
