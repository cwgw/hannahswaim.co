import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Spring, animated } from 'react-spring'
import GatsbyImage from 'gatsby-image'

import fonts from 'utils/fonts'
import spacing from 'utils/spacing'
import { formatArtMeta } from 'utils/formatting'
import { colors } from 'utils/constants'
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
`

const Caption = animated(styled.figcaption`
  position: absolute;
  z-index: 1;
  bottom: 0;
  padding: ${spacing(-1)} ${spacing(3)} ${spacing(-1)} ${spacing(1)};
  margin: 0 ${spacing(-1)};
  border-bottom: 1px solid ${colors.brand[3]};
  background-color: ${colors.white};
`)

const Small = styled.small`
  display: block;
  line-height: 1.2;
`

const Title = styled.span`
  display: block;
  font-family: ${fonts.sansSerif};
  font-weight: bold;
`

const Image = animated(GatsbyImage)

class Piece extends React.Component {

  state = {
    isActive: false
  }

  onFocus = () => {
    if (this._isMounted) {
      this.setState(prevState => ({
        isActive: true,
      }))
    }
  }

  onBlur = () => {
    if (this._isMounted) {
      this.setState(prevState => ({
        isActive: false,
      }))
    }
  }

  componentDidMount () {
    this._isMounted = true
  }

  componentWillUnmount () {
    this._isMounted = false
  }

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

    const { isActive } = this.state

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
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onMouseEnter={this.onFocus}
        onMouseLeave={this.onBlur}
        className={className}
        title={`View ${meta.title}`}
        as={DefaultLink}
        {...props}
        >
        <Spring
          native
          to={{
            inset: isActive ? [4, 12] : [0, 0],
            opacity: isActive ? 1 : 0,
            y: isActive ? 0 : 10,
          }}
          config={{
            tension: 240,
            friction: 18,
          }}
          >
          {({inset, opacity, y}) => (
            <Figure>
              <Image
                fluid={{
                  ...images[0].fluid,
                  base64: images[0].sqip.dataURI
                }}
                style={{
                  height: '100%',
                  WebkitClipPath: inset.interpolate((i,b) => `inset(${i}px ${i}px ${b}px)`),
                  clipPath: inset.interpolate((i,b) => `inset(${i}px ${i}px ${b}px)`),
                }}
              />
              <Caption
                style={{
                  transform: y.interpolate(y => `translate3d(0,${y}px,0)`),
                  opacity: opacity,
                }}
                >
                <Title>{meta.title}</Title>
                <Small><em>{meta.media}</em></Small>
                <Small>{meta.dimensions}</Small>
              </Caption>
            </Figure>
          )}
        </Spring>
      </Link>
    )
  }
}

Piece.propTypes = propTypes

Piece.defaultProps = defaultProps

export default Piece
