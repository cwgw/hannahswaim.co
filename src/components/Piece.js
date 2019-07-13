import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GatsbyImage from 'gatsby-image';

import { colors, ease } from 'style/tokens';
import media from 'style/media-queries';
import spacing from 'style/spacing';
import { formatArtTitle, artMetaString } from 'utils/formatting';

import Link from 'components/Link';
import Box from 'components/Box';

const propTypes = {
  location: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      fluid: PropTypes.object,
    })
  ).isRequired,
  childContentfulArtPieceDimensionsJsonNode: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
    depth: PropTypes.number,
    units: PropTypes.string,
  }).isRequired,
  className: PropTypes.string,
  siblings: PropTypes.array,
  siblingIndex: PropTypes.number,
  enableModal: PropTypes.bool,
};

const defaultProps = {
  className: null,
  siblings: [],
  siblingIndex: 0,
  style: {},
  enableModal: false,
};

const Piece = styled(
  ({
    childContentfulArtPieceDimensionsJsonNode: dimensions,
    className,
    date,
    fields: { slug },
    id,
    images,
    location,
    media,
    siblingIndex,
    siblings,
    title,
    ...props
  }) => (
    <Box
      to={slug}
      state={{
        enableModal: true,
        origin: location.pathname,
        siblings: siblings,
        index: siblingIndex,
      }}
      className={className}
      as={Link}
      {...props}
    >
      <span className="sr-only">{formatArtTitle({ title, date })}</span>
      <GatsbyImage
        className="Piece__Image"
        fluid={images[0].fluid}
        style={{
          height: '100%',
        }}
        alt={artMetaString({ title, date, dimensions, media })}
      />
    </Box>
  )
)`
  display: block;
  border-radius: ${spacing('xs')};
  overflow: hidden;
  cursor: zoom-in;

  & .Piece__Image {
    background: ${colors.gray[3]};
  }

  & .Piece__Image picture {
    transition: opacity 200ms ${ease.in};
  }

  &:focus .Piece__Image picture {
    opacity: 0.5;
  }

  ${media.min.sm`
    &:hover .Piece__Image picture {
      opacity: 0.5;
    }
  `}
`;

Piece.propTypes = propTypes;

Piece.defaultProps = defaultProps;

export default Piece;
