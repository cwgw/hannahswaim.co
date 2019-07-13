import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import debounce from 'lodash/debounce';

import media from 'style/media-queries';
import { modalBreakpoint } from 'style/tokens';
import spacing from 'style/spacing';

import ArtPieceMeta from 'components/ArtPieceMeta';
import Box from 'components/Box';
import Row from 'components/Row';
import Grid from 'components/Grid';
import PostNavigation from 'components/PostNavigation';

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
};

const defaultProps = {
  isModalEnabled: false,
};

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  padding: ${spacing('xl')} ${spacing('xxl')};
  height: 100vh;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 100%;
  overflow: hidden;
  justify-content: center;
  align-items: stretch;
  height: 100%;
  margin: 0 auto;
  transition: width 300ms linear;
  flex-direction: column;

  ${media.min[modalBreakpoint]`
    flex-direction: column-reverse;
  `}
`;

const Meta = styled(Box)`
  background: #fff;
  padding: ${spacing('lg')};
  width: 100%;
`;

const ArtPieceDetails = ({
  title,
  date,
  media,
  images,
  isModalEnabled,
  childContentfulArtPieceDimensionsJsonNode: dimensions,
}) => {
  const [height, setHeight] = React.useState(0);
  const [ref, setRef] = React.useState();
  React.useEffect(() => {
    if (ref) {
      const resizeHandler = debounce(
        () => {
          setHeight(ref.clientHeight);
        },
        67,
        { trailing: true }
      );
      resizeHandler();
      window.addEventListener('resize', resizeHandler);

      return () => {
        window.removeEventListener('resize', resizeHandler);
      };
    }
  }, [ref]);

  if (isModalEnabled) {
    return (
      <React.Fragment>
        <PostNavigation />
        <Container>
          <Wrapper
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <Meta>
              <ArtPieceMeta
                title={title}
                date={date}
                media={media}
                dimensions={dimensions}
              />
            </Meta>
            <div
              style={{
                height: '100%',
                flex: 1,
              }}
              ref={setRef}
            >
              <Row items={images} height={height}>
                {images.map(({ id, fluid, fixed }) => (
                  <Box key={id} as="figure" margin="0">
                    <GatsbyImage fluid={fluid} fixed={fixed} />
                  </Box>
                ))}
              </Row>
            </div>
          </Wrapper>
        </Container>
      </React.Fragment>
    );
  }

  return (
    <Grid marginBottom={10}>
      <PostNavigation
        gridColumn="contentStart / contentEnd"
        marginTop={{ lg: 10 }}
        isModal={false}
      />
      <Meta col="contentStart / contentEnd">
        <ArtPieceMeta
          title={title}
          date={date}
          media={media}
          dimensions={dimensions}
        />
      </Meta>
      <Box gridColumn="contentStart / contentEnd">
        {images.map(({ id, fluid, fixed }) => (
          <GatsbyImage
            key={id}
            fixed={fixed}
            fluid={fluid}
            style={{
              marginBottom: spacing('md'),
            }}
          />
        ))}
      </Box>
    </Grid>
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
      fluid(maxWidth: 576, quality: 90) {
        aspectRatio
        ...GatsbyContentfulFluid_withWebp
      }
    }
  }
`;
