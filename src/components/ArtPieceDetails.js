import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import GatsbyImage from 'gatsby-image'

import { spacing, media } from 'style/layout'
import { modalBreakpoint } from 'style/constants'
import Flex from 'components/Flex'
import Row from 'components/Row'
import Box from 'components/Box'
import { StandardGrid } from 'components/Grid'
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

  ${media.min[modalBreakpoint]`
    flex-direction: column-reverse;
  `}
`

const Meta = styled(Box)`
  background: #fff;
  padding: ${spacing('md')};
`

const ArtPieceDetails = ({
  title,
  date,
  media,
  images,
  isModalEnabled,
  childContentfulArtPieceDimensionsJsonNode: dimensions,
}) => (isModalEnabled
  ? (
    <Wrapper onClick={(e) => {e.stopPropagation()}} >
      <Meta>
        <ArtPieceMeta
          {...{
            title,
            date,
            media,
            dimensions,
          }}
        />
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
  )
  : (
    <StandardGrid>
      <Meta
        gridColumn={{
          base: 'wideStart / wideEnd',
          xl: 'contentStart / contentEnd',
        }}
        marginTop="xxl"
        >
        <ArtPieceMeta
          {...{
            title,
            date,
            media,
            dimensions,
          }}
        />
      </Meta>
      <Box
        gridColumn={{
          base: 'wideStart / wideEnd',
          xl: 'contentStart / contentEnd',
        }}
        >
        {images.map(({id, sqip, fluid}) => (
          <GatsbyImage
            key={id}
            fluid={{
              ...fluid,
              base64: sqip.dataURI
            }}
            style={{
              marginBottom: spacing('md')
            }}
          />
        ))}
      </Box>
    </StandardGrid>
  )
)

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
