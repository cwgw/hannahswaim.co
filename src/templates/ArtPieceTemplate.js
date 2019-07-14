import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import get from 'lodash/get';

import { meta } from 'utils/meta';
import { formatArtMeta } from 'utils/formatting';

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

const ArtPieceTemplate = ({ data: { artPiece }, isModalEnabled, location }) => {
  const { title, media, dimensions } = formatArtMeta(artPiece);
  let image = get(
    artPiece,
    'images[0].thumbnail.childImageSharp.resize.src',
    null
  );
  if (image) {
    image = `${location.origin}${image}`;
  }

  return (
    <React.Fragment>
      <Helmet
        meta={meta({
          description: `${title}. ${media} ${dimensions}`,
          image,
          location,
          title,
        })}
      />
      <ArtPieceDetails isModalEnabled={isModalEnabled} {...artPiece} />
    </React.Fragment>
  );
};

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
