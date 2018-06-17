import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import mousetrap from "mousetrap"

import GatsbyImage from 'gatsby-image'
import { navigateTo } from "gatsby-link"

import { artPieceSlug } from 'utils/slugify'
import media from 'utils/media'

import Wrap from 'components/Wrap'
import ArtPieceMeta from 'components/ArtPieceMeta'
import Icon from 'components/Icon'

const propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  media: PropTypes.array.isRequired,
  images: PropTypes.array.isRequired,
  childContentfulArtPieceDimensionsJsonNode: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
    depth: PropTypes.number,
    units: PropTypes.string,
  }).isRequired,
  modalEnabled: PropTypes.bool,
}

const defaultProps = {
  modalEnabled: false,
}

const Outer = styled.div`

  ${({modalEnabled}) => modalEnabled && `
    height: 100vh;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: stretch;
  `}
`

const Inner = styled.div`
  display: flex;
  width: 980px;
  max-width: 100%;
  max-height: 100%;
  margin: 1.5rem auto;
  padding: 0;
  background-color: #fff;
  overflow: hidden;
  overflow-y: scroll;

  ${media.min.md`
    max-width: calc(100% - 4.5rem);
  `}
`

const Navigation = styled.nav`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;

  ${media.min.md`
    width: calc(100% - 1.5rem);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  `}

  ${media.min.lg`
    width: calc(100% - 3rem);
  `}

  ${({modalEnabled}) => modalEnabled && `
    color: #fff;
    max-width: 1196px;
  `}
`

const Button = styled.button`
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  color: inherit;

  ${({variant}) => {
    switch (variant) {
      case 'previous':
        return `margin-right: auto;`
        break;
      case 'next':
        return `margin-left: auto;`
        break;
    }
  }}
`

const Caret = styled(Icon)`
  width: 1.5rem;
  height: 3rem;

  ${media.min.lg`
    width: 2.25rem;
    height: 4.5rem;
  `}
`

const PieceImages = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
  background: #fff;
  overflow: scroll;
`

const PieceDetails = styled.div`
  min-width: 224px;
  padding: 1.5rem;
  background: #fff;
  align-self: flex-start;
  top: 1.5rem;
`

class ArtPieceDetails extends React.Component {

  constructor (props) {
    super(props)

    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
  }

  componentDidMount() {
    mousetrap.bind(`left`, () => this.previous())
    mousetrap.bind(`right`, () => this.next())
    if (this.props.modalEnabled) {
      mousetrap.bind(`spacebar`, () => this.next())
    }
  }

  componentWillUnmount() {
    mousetrap.unbind(`left`)
    mousetrap.unbind(`right`)
    mousetrap.unbind(`spacebar`)
  }

  next(e) {
    if (e) {
      e.stopPropagation()
    }

    if (this.props.next) {
      navigateTo({
        pathname: artPieceSlug(this.props.next),
        state: {
          enableModal: this.props.modalEnabled,
        }
      })
    }
  }

  previous(e) {
    if (e) {
      e.stopPropagation()
    }

    if (this.props.previous) {
      navigateTo({
        pathname: artPieceSlug(this.props.previous),
        state: {
          enableModal: this.props.modalEnabled,
        }
      })
    }
  }

  render () {

    const {
      id,
      title,
      date,
      media,
      images,
      onClick,
      modalEnabled,
      previous,
      next,
      childContentfulArtPieceDimensionsJsonNode: dimensions,
    } = this.props

    const renderButton = (variant) => this.props[variant] ?
      (
        <Button
          variant={variant}
          onClick={this[variant]}
          modalEnabled={modalEnabled}
        >
          <Caret type={variant} />
        </Button>
      ) : (
        null
      )

    return (
      <Outer modalEnabled={modalEnabled} >
        <Navigation modalEnabled={modalEnabled} >
          {['previous','next'].map(renderButton)}
        </Navigation>
        <Inner onClick={(e) => {e.stopPropagation()}} >
          <PieceImages>
            {images.map(({sizes, id}) => (
              <GatsbyImage
                key={id}
                sizes={sizes}
                style={{
                  marginBottom: modalEnabled ? null : '1.5rem',
                }}
              />
            ))}
          </PieceImages>
          <PieceDetails>
            <ArtPieceMeta
              title={title}
              date={date}
              media={media}
              dimensions={dimensions}
            />
          </PieceDetails>
        </Inner>
      </Outer>
    )
  }
}

ArtPieceDetails.propTypes = propTypes

ArtPieceDetails.defaultProps = defaultProps

export default ArtPieceDetails

export const artPieceDetailsFragments = graphql`
  fragment ArtPieceDetailsFragment on ContentfulArtPiece {
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
      sizes(maxWidth: 808, quality: 90) {
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
