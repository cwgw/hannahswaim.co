import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import mousetrap from "mousetrap"

import GatsbyImage from 'gatsby-image'

import media from 'utils/media'

import Container from 'components/Container'
import ArtPieceMeta from 'components/ArtPieceMeta'

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

const Row = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 1.5rem auto;
  overflow: hidden;
`

const PieceImages = styled.div`
  width: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  background: #fff;
`

const Overflow = styled.div`
  display: flex;
  flex-flow: row nowrap;

  ${({aspectRatio}) => `
    /** width = height * aspect-ratio */
    min-width: ${75 * aspectRatio}vh;
    // height: 85vh;
  `}
`

const Figure = styled.figure`
  margin: 0;

  ${({flex}) => flex && `
    flex: ${flex};

    &:only-child {
      flex: 1;
    }
  `}
`

const PieceDetails = styled.div`
  width: 100%;
  padding: 1.5rem;
  background: #fff;
  align-self: flex-start;
  top: 1.5rem;
`

function ArtPieceDetails (props) {

  const {
    id,
    title,
    date,
    media,
    images,
    modalEnabled,
    childContentfulArtPieceDimensionsJsonNode: dimensions,
  } = props

  const aspectRatio = images.reduce((acc, {sizes}) => acc = acc + sizes.aspectRatio, 0)

  return modalEnabled
    ? (
      <Row onClick={(e) => {e.stopPropagation()}} >
        <PieceImages>
          <Overflow aspectRatio={aspectRatio} >
            {images.map(({id, sizes}) => (
              <Figure
                key={id}
                flex={sizes.aspectRatio}
              >
                <GatsbyImage sizes={sizes} />
              </Figure>
            ))}
          </Overflow>
        </PieceImages>
        <PieceDetails>
          <ArtPieceMeta
            title={title}
            date={date}
            media={media}
            dimensions={dimensions}
          />
        </PieceDetails>
      </Row>
    ) : (
      <Container>
        {[images[0]].map(({id, sizes}) => (
          <GatsbyImage
            key={id}
            sizes={sizes}
          />
        ))}
        <ArtPieceMeta
          title={title}
          date={date}
          media={media}
          dimensions={dimensions}
        />
        {images.slice(1).map(({id, sizes}) => (
          <GatsbyImage
            key={id}
            sizes={sizes}
          />
        ))}
      </Container>
    )
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
