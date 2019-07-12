import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import get from 'lodash/get';

import { colors } from 'style/constants';
import { spacing } from 'style/sizing';

import Box from 'components/Box';
import ImageWall from 'components/ImageWall';
import Piece from 'components/Piece';

import Text from './Text';

const propTypes = {
  artwork: PropTypes.array.isRequired,
  location: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

const defaultProps = {};

const StyledText = styled(Text)`
  & h2 {
    position: relative;
    display: inline-block;
    border-bottom: 2px solid ${colors.brand[4]};
  }
`;

const Gallery = ({ location, artwork, text, id, ...props }) => {
  const edges = artwork
    .slice()
    .sort((a, b) => {
      return b.date - a.date;
    })
    .map(item => {
      return {
        node: {
          ...item,
          date: item.date.slice(0, 4),
        },
      };
    });

  const siblings = edges.map(({ node }) => node.fields.slug);

  return (
    <Box {...props}>
      {text && text.childMarkdownRemark && <StyledText text={text} />}
      <ImageWall
        items={edges.map(({ node }) => node)}
        getAspectRatio={node => get(node, 'images[0].fluid.aspectRatio', 1)}
      >
        {edges.map(({ node }, index) => (
          <Piece
            key={node.id}
            location={location}
            siblings={siblings}
            siblingIndex={index}
            {...node}
          />
        ))}
      </ImageWall>
    </Box>
  );
};

Gallery.propTypes = propTypes;

Gallery.defaultProps = defaultProps;

export default Gallery;

export const pageQuery = graphql`
  fragment PageArtwork on ContentfulPageArtworkGallery {
    id
    text {
      childMarkdownRemark {
        html
      }
    }
    artwork {
      id
      fields {
        slug
      }
      title
      date(formatString: "YYYYMMDD")
      media
      childContentfulArtPieceDimensionsJsonNode {
        height
        width
        depth
        units
      }
      images {
        id
        fluid(maxWidth: 480, quality: 90) {
          aspectRatio
          ...GatsbyContentfulFluid_withWebp_noBase64
        }
      }
    }
  }
`;
