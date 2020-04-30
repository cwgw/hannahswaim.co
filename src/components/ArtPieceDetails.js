import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import debounce from 'lodash/debounce';
import css from '@styled-system/css';

import ArtPieceMeta from 'components/ArtPieceMeta';
import Box from 'components/Box';
import Row from 'components/Row';
import Grid from 'components/Grid';
import PostNavigation from 'components/PostNavigation';

import ModalRoutingContext from 'context/ModalRoutingContext';

const propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  media: PropTypes.array.isRequired,
  images: PropTypes.array.isRequired,
  dimensions: PropTypes.shape({
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

const Container = styled('div')(
  css({
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    paddingY: 'xl',
    paddingX: 'xxl',
    height: '100vh',
    boxSizing: 'border-box',
  })
);

const Wrapper = styled('div')(
  css({
    display: 'flex',
    maxWidth: '100%',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'stretch',
    height: '100%',
    margin: '0 auto',
    transition: 'width 300ms linear',
    flexDirection: ['column', null, null, 'column-reverse'],
  })
);

const Meta = styled(Box)(
  css({
    background: '#fff',
    padding: 'lg',
    width: '100%',
  })
);

const ArtPieceDetails = ({ images, isModalEnabled, ...pieceMeta }) => {
  const [height, setHeight] = React.useState(0);
  const [ref, setRef] = React.useState();
  const { modal } = React.useContext(ModalRoutingContext);

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

  if (modal) {
    return (
      <React.Fragment>
        <PostNavigation />
        <Container>
          <Wrapper
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Meta>
              <ArtPieceMeta {...pieceMeta} />
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
    <Grid marginBottom="xxl" marginTop={{ lg: 'xxl' }}>
      <PostNavigation col="contentStart / contentEnd" isModal={false} />
      <Meta col="contentStart / contentEnd">
        <ArtPieceMeta {...pieceMeta} />
      </Meta>
      <Box col="contentStart / contentEnd">
        {images.map(({ id, fluid, fixed }) => (
          <GatsbyImage key={id} fixed={fixed} fluid={fluid} />
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
    dimensions: childContentfulArtPieceDimensionsJsonNode {
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
      thumbnail: localFile {
        childImageSharp {
          resize(
            width: 1200
            height: 1200
            quality: 90
            toFormat: JPG
            cropFocus: ATTENTION
          ) {
            src
          }
        }
      }
    }
  }
`;
