import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image'

import fonts from 'utils/fonts'
import spacing from 'utils/spacing'
import { formatArtMeta } from 'utils/formatting'
import { colors, ease } from 'utils/constants'
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
  position: relative;
  display: block;
  color: inherit;
  text-decoration: none;
`

const Figure = styled.figure`
  height: 100%;
  margin-bottom: 0;

  .Piece__Image {
    clip-path: inset(0 0 0);
    transition: clip-path 100ms ${ease.out};
  }

  ${Link}:focus & .Piece__Image,
  ${Link}:hover & .Piece__Image {
    clip-path: inset(4px 4px 12px);
    transition-duration: 200ms;
    /* transition-timing-function: ${ease.in}; */
  }
`

const Caption = styled.figcaption`
  position: absolute;
  z-index: 1;
  bottom: 0;
  padding: ${spacing(-1)} ${spacing(3)} ${spacing(-1)} ${spacing(1)};
  margin: 0 ${spacing(-1)};
  border-bottom: 1px solid ${colors.brand[3]};
  background-color: ${colors.white};
  transform: translate(0,10px);
  opacity: 0;
  transition: 75ms ${ease.out};
  transition-property: transform, opacity;

  ${Link}:focus &,
  ${Link}:hover & {
    transform: translate(0,0);
    opacity: 1;
    transition-duration: 150ms;
  }
`

const Small = styled.small`
  display: block;
  line-height: 1.2;
`

const Title = styled.span`
  display: block;
  font-family: ${fonts.sansSerif};
  font-weight: bold;
`

class Piece extends React.Component {

  render () {

    const {
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
    } = this.props

    const meta = formatArtMeta({title, date, dimensions, media})

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
        title={`View ${meta.title}`}
        as={DefaultLink}
        {...props}
        >
        <Figure>
          <GatsbyImage
            className="Piece__Image"
            fluid={{
              ...images[0].fluid,
              base64: images[0].sqip.dataURI
            }}
            style={{
              height: '100%',
            }}
          />
          <Caption>
            <Title>{meta.title}</Title>
            <Small><em>{meta.media}</em></Small>
            <Small>{meta.dimensions}</Small>
          </Caption>
        </Figure>
      </Link>
    )
  }
}

Piece.propTypes = propTypes

Piece.defaultProps = defaultProps

export default Piece
