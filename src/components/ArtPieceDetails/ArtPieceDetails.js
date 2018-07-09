import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import GatsbyImage from 'gatsby-image'

import spacing from 'utils/spacing'
import { shadows } from 'utils/constants'

import DefaultContainer from 'components/Container'
import FlexContainer from 'components/FlexContainer'
import ArtPieceMeta from 'components/ArtPieceMeta'
import Row from 'components/Row'

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

const Figure = styled.figure`
  margin: 0;

  ${({aspectRatio}) => aspectRatio && `
    flex: ${aspectRatio};
  `}

  &:only-child {
    flex: 1;
  }
`

const PieceDetails = styled.div`
  width: 100%;
  padding: ${spacing(2)};
  background: #fff;
`

const Container = DefaultContainer.extend`
  position: relative;
  margin-bottom: ${spacing(2)};
`

function ArtPieceDetails (props) {

  const {
    title,
    date,
    media,
    images,
    modalEnabled,
    childContentfulArtPieceDimensionsJsonNode: dimensions,
  } = props

  const combinedAspectRatio = images.reduce((acc, {fluid}) => acc = acc + fluid.aspectRatio, 0)

  return modalEnabled
    ? (
      <FlexContainer
        onClick={(e) => {e.stopPropagation()}}
        direction="column"
        justifyContent="center"
        overflow="hidden"
        noWrap
      >
        <div
          style={{
            position: 'relative',
            boxShadow: shadows[2],
            backgroundColor: 'white',
          }}
        >
          <Row
            aspectRatio={combinedAspectRatio}
            gutter="0px"
            itemHeight="75vh"
            overflow
          >
            {images.map(({id, sqip, fluid}) => (
              <Figure
                key={id}
                aspectRatio={fluid.aspectRatio}
              >
                <GatsbyImage
                  fluid={{
                    ...fluid,
                    base64: sqip.dataURI
                  }}
                />
              </Figure>
            ))}
          </Row>
        </div>
        <PieceDetails>
          <ArtPieceMeta
            title={title}
            date={date}
            media={media}
            dimensions={dimensions}
          />
        </PieceDetails>
      </FlexContainer>
    ) : (
      <React.Fragment>
        <Container>
          <PieceDetails>
            <ArtPieceMeta
              title={title}
              date={date}
              media={media}
              dimensions={dimensions}
            />
          </PieceDetails>
        </Container>
        <Container>
          {images.map(({id, sqip, fluid}) => (
            <GatsbyImage
              key={id}
              fluid={{
                ...fluid,
                base64: sqip.dataURI
              }}
              style={{
                marginBottom: spacing(2)
              }}
            />
          ))}
        </Container>
      </React.Fragment>
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
      sqip(numberOfPrimitives: 6, mode: 4, blur: 10) {
        dataURI
      }
      fluid(quality: 90) {
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
