import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { sansSerif } from 'style/fonts';
import { fontSizes } from 'style/sizing';
import { rem } from 'style/helpers';
import { formatArtMeta } from 'utils/formatting';

const propTypes = {
  date: PropTypes.string.isRequired,
  dimensions: PropTypes.object.isRequired,
  media: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
  title: PropTypes.string.isRequired,
};

const Title = styled.span`
  display: block;
  font-size: ${rem(fontSizes.large)};
`;

const Small = styled.small`
  font-family: ${sansSerif};
  display: block;
`;

const ArtPieceMeta = props => {
  const { dimensions, media, title } = formatArtMeta(props);
  return (
    <React.Fragment>
      <Title>
        <em>{title}</em>
      </Title>
      <Small>{media}</Small>
      <Small>{dimensions}</Small>
    </React.Fragment>
  );
};

ArtPieceMeta.propTypes = propTypes;

export default ArtPieceMeta;
