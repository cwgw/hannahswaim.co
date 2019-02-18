import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image'
import { useSpring, animated } from 'react-spring'

import { spacing } from 'style/layout'
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
`

const AnimatedImage = animated(GatsbyImage)

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
  const [ { inset }, set ] = useSpring(() => ({
    inset: '0px',
    config: {
      tension: 420,
      friction: 12,
    }
  }));
  const shrink = useCallback(() => set({ inset: spacing('sm') }));
  const grow = useCallback(() => set({ inset: '0px' }));

  return (
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
      onFocus={shrink}
      onBlur={grow}
      onMouseEnter={shrink}
      onMouseLeave={grow}
      {...props}
      >
      <span className="sr-only">{formatArtTitle({title, date})}</span>
      <AnimatedImage
        className="Piece__Image"
        fluid={{
          ...images[0].fluid,
          base64: images[0].sqip.dataURI
        }}
        style={{
          height: '100%',
          clipPath: inset.interpolate(i => `inset(${i})`),
        }}
        alt={artMetaString({title, date, dimensions, media})}
      />
    </Link>
  )
}

Piece.propTypes = propTypes

Piece.defaultProps = defaultProps

export default Piece
