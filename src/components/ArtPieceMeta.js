import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { sansSerif } from 'style/fonts';
import { formatArtMeta } from 'utils/formatting';

const propTypes = {
  date: PropTypes.string.isRequired,
  dimensions: PropTypes.object.isRequired,
  media: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
  title: PropTypes.string.isRequired,
};

const Title = styled.span`
  display: block;
  font-family: ${sansSerif};
  font-weight: bold;
`;

const Small = styled.small`
  display: block;
`;

const ArtPieceMeta = props => {
  const { dimensions, media, title } = formatArtMeta(props);
  return (
    <React.Fragment>
      <Title>{title}</Title>
      <Small>
        <em>{media}</em>
      </Small>
      <Small>{dimensions}</Small>
    </React.Fragment>
  );
};

ArtPieceMeta.propTypes = propTypes;

export default ArtPieceMeta;
