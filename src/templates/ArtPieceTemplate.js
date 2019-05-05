import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import ArtPieceDetails from 'components/ArtPieceDetails';

const propTypes = {
  data: PropTypes.shape({
    artPiece: PropTypes.object,
  }).isRequired,
  isModalEnabled: PropTypes.bool,
};

const defaultProps = {
  isModalEnabled: false,
};

const ArtPieceTemplate = ({ data: { artPiece }, isModalEnabled }) => (
  <ArtPieceDetails isModalEnabled={isModalEnabled} {...artPiece} />
);

ArtPieceTemplate.propTypes = propTypes;

ArtPieceTemplate.defaultProps = defaultProps;

export default ArtPieceTemplate;

export const pageQuery = graphql`
  query singleArtPiece($id: String!) {
    artPiece: contentfulArtPiece(contentful_id: { eq: $id }) {
      node_locale
      ...ArtPieceDetailsFragment
    }
  }
`;
