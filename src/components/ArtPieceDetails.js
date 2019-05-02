import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import GatsbyImage from 'gatsby-image'

import { spacing } from 'style/sizing'
import { media } from 'style/layout'
import { modalBreakpoint } from 'style/constants'

import ArtPieceMeta from 'components/ArtPieceMeta'
import Box from 'components/Box'
import Row from 'components/Row'
import { StandardGrid } from 'components/Grid'
import PostNavigation from 'components/PostNavigation'

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

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  margin: ${spacing(8)};
`

const Wrapper = styled.div`
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
  padding: ${spacing('lg')};
  width: 100%;
`

const ArtPieceDetails = ({
  title,
  date,
  media,
  images,
  isModalEnabled,
  childContentfulArtPieceDimensionsJsonNode: dimensions,
}) => {
  if (isModalEnabled) {
    return (
      <React.Fragment>
        <PostNavigation />
        <Container>
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
              childAspectRatioResolver={({ fluid }) => fluid.aspectRatio}
              height="75vh"
              items={images}
              >
              {images.map(({ id, fluid }) => (
                <Box
                  key={id}
                  as="figure"
                  margin="0"
                  >
                  <GatsbyImage
                    fluid={fluid}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </Box>
              ))}
            </Row>
          </Wrapper>
        </Container>
      </React.Fragment>
    );
  }

  return (
    <StandardGrid
      marginBottom={10}
      >
      <PostNavigation
        gridColumn="contentStart / contentEnd"
        marginTop={{ lg: 10 }}
        isModal={false}
      />
      <Meta
        col="contentStart / contentEnd"
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
        gridColumn="contentStart / contentEnd"
        >
        {images.map(({id, fluid}) => (
          <GatsbyImage
            key={id}
            fluid={fluid}
            style={{
              marginBottom: spacing('md')
            }}
          />
        ))}
      </Box>
    </StandardGrid>
  );
};

ArtPieceDetails.propTypes = propTypes;

ArtPieceDetails.defaultProps = defaultProps;

export default ArtPieceDetails;

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
      fluid(quality: 90) {
        aspectRatio
        ...GatsbyContentfulFluid_withWebp
      }
    }
  }
`;
