import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image'

import { colors, ease } from 'style/constants'
import { spacing } from 'style/sizing'
import { formatArtTitle, artMetaString } from 'utils/formatting'
import Link from 'components/Link'
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

const StyledLink = styled(Box)`
  display: block;
  border-radius: ${spacing('xs')};
  overflow: hidden;

  & .Piece__Image {
    background: ${colors.gray[3]};
  }

  &:hover .Piece__Image picture {
    transition: opacity 100ms ${ease.out};
  }

  &:hover .Piece__Image picture {
    opacity: 0.5;
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
}) => {
  return (
    <StyledLink
      to={slug}
      state={{
        enableModal: true,
        origin: location.pathname,
        siblings: siblings,
        index: siblingIndex,
      }}
      className={className}
      as={Link}
      {...props}
      >
      <span className="sr-only">{formatArtTitle({title, date})}</span>
      <GatsbyImage
        className="Piece__Image"
        fluid={images[0].fluid}
        style={{
          height: '100%',
        }}
        alt={artMetaString({title, date, dimensions, media})}
      />
    </StyledLink>
  )
}

Piece.propTypes = propTypes

Piece.defaultProps = defaultProps

export default Piece
