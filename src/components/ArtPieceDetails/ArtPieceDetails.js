import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import GatsbyImage from 'gatsby-image'

import spacing from 'utils/spacing'
import { media } from 'utils/media'
// import { modalBreakpoint } from 'utils/constants'
import { formatArtMeta } from 'utils/formatting'
import Container from 'components/Container'
import Flex from 'components/Flex'
import ArtPieceMeta from 'components/ArtPieceMeta'
import Row from 'components/Row/RowAlt'
import Box from 'components/Box'

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
  isModalEnabled: PropTypes.bool,
}

const defaultProps = {
  isModalEnabled: false,
}

const Wrapper = styled(Flex)`
  display: flex;
  max-width: 100%;
  overflow: hidden;
  justify-content: center;
  margin: 0 auto;
  transition: width 300ms linear;
  flex-direction: column;

  ${media.min.modal`
    flex-direction: column-reverse;
  `}
`

const Meta = styled(Box)`
  background: #fff;

  & span,
  & small {
    display: block;
    line-height: 1.2;
  }
`

function ArtPieceDetails (props) {

  const {
    title,
    date,
    media,
    images,
    isModalEnabled,
    childContentfulArtPieceDimensionsJsonNode: dimensions,
  } = props

  // const combinedAspectRatio = images.reduce((acc, {fluid}) => acc = acc + fluid.aspectRatio, 0)

  const meta = formatArtMeta({title, date, media, dimensions})

  return isModalEnabled
    ? (
      <Wrapper
        onClick={(e) => {e.stopPropagation()}}

        >
        <Meta
          padding={2}
          >
          <span>{meta.title}</span>
          <small><em>{meta.media}</em></small>
          <small>{meta.dimensions}</small>
        </Meta>
        <Row
          childAspectRatioResolver={({fluid}) => fluid.aspectRatio}
          height="75vh"
          items={images}
          >
          {images.map(({id, sqip, fluid}) => (
            <Box
              key={id}
              as="figure"
              margin="0"
              >
              <GatsbyImage
                fluid={{
                  ...fluid,
                  base64: sqip.dataURI,
                }}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </Box>
          ))}
        </Row>
      </Wrapper>
    ) : (
      <React.Fragment>
        <Container>
          <Meta>
            <ArtPieceMeta
              title={title}
              date={date}
              media={media}
              dimensions={dimensions}
            />
          </Meta>
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
                marginBottom: spacing(-1)
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
