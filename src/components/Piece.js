import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image'

import { spacing } from 'style/layout'
import { ease } from 'style/constants'
import { formatArtTitle, artMetaString } from 'utils/formatting'
import DefaultLink from 'components/Link'
import Box from 'components/Box'

const propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      fluid: PropTypes.object,
      sqip: PropTypes.object,
    })
  ).isRequired,
  childContentfulArtPieceDimensionsJsonNode: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
    depth: PropTypes.number,
    units: PropTypes.string,
  }).isRequired,
  className: PropTypes.string,
  captionBreakpoint: PropTypes.string,
  siblings: PropTypes.array,
  siblingIndex: PropTypes.number,
  enableModal: PropTypes.bool,
}

const defaultProps = {
  className: null,
  captionBreakpoint: 'lg',
  siblings: [],
  siblingIndex: 0,
  style: {},
  enableModal: false,
}

const Link = styled(Box)`
  display: block;

  .Piece__Image {
    clip-path: inset(0);
    transition: clip-path 75ms ${ease.out};
  }

  &:focus .Piece__Image,
  &:hover .Piece__Image {
    clip-path: inset(${spacing('xs')});
  }
`

const Piece = ({
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
  captionBreakpoint,
  childContentfulArtPieceDimensionsJsonNode: dimensions,
  className,
  ...props
}) => (
  <Link
    to={slug}
    state={{
      enableModal: true,
      origin: location.pathname,
      siblings: siblings,
      index: siblingIndex,
    }}
    className={className}
    as={DefaultLink}
    {...props}
    >
    <span class="sr-only">{formatArtTitle({title, date})}</span>
    <GatsbyImage
      className="Piece__Image"
      fluid={{
        ...images[0].fluid,
        base64: images[0].sqip.dataURI
      }}
      style={{
        height: '100%',
      }}
      alt={artMetaString({title, date, dimensions, media})}
    />
  </Link>
)

Piece.propTypes = propTypes

Piece.defaultProps = defaultProps

export default Piece
