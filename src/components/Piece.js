import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GatsbyImage from 'gatsby-image';
import css from '@styled-system/css';

import { space } from 'style/utils';
import { formatArtTitle, artMetaString } from 'utils/formatting';

import Link from 'components/Link';
import Box from 'components/Box';
import VisuallyHidden from 'components/VisuallyHidden';

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
      asModal={true}
      state={{
        origin: location.pathname,
        siblings: siblings,
        index: siblingIndex,
      }}
      className={className}
      as={Link}
      {...props}
    >
      <VisuallyHidden>{formatArtTitle({ title, date })}</VisuallyHidden>
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
)(
  css({
    display: 'block',
    borderRadius: space.xs,
    overflow: 'hidden',
    cursor: 'zoom-in',
    '& .Piece__Image': {
      backgroundColor: 'gray.3',
    },
    '& .Piece__Image picture': {
      transition: 'opacity 200ms',
      transitionTimingFunction: 'in',
    },
    '&:focus .Piece__Image picture': {
      opacity: 0.5,
    },
    '&:hover .Piece__Image picture': {
      opacity: [1, null, null, 0.5],
    },
  })
);

Piece.propTypes = propTypes;

Piece.defaultProps = defaultProps;

export default Piece;
