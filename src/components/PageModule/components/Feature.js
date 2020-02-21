import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import css from '@styled-system/css';

import { mediaQueries } from 'style/theme';
import { transparentize } from 'style/utils';

import Grid from 'components/Grid';
import Box from 'components/Box';

const propTypes = {
  image: PropTypes.shape({
    fluid: PropTypes.object,
  }).isRequired,
  text: PropTypes.shape({
    childMarkdownRemark: PropTypes.object,
  }).isRequired,
};

const defaultProps = {
  alignment: 'left',
  breakpoint: 'lg',
};

const Figure = styled(Box)(
  css({
    overflow: 'visible',
    height: '300px',
    width: '100%',
    margin: 0,
    marginBottom: 'lg',
    boxShadow: props =>
      `0px 3px 36px 2px ${transparentize(0.8, 'coolBlack')(props)}`,
    '.Feature__Image': {
      width: '100%',
    },
    [mediaQueries.sm]: {
      height: '400px',
    },
    [mediaQueries.lg]: {
      direction: 'rtl',
      maxHeight: 'none',
      marginBottom: 0,
      '.Feature__Image': {
        width: '120%',
      },
    },
  })
);

const TextBox = styled(Box)(
  css({
    padding: 0,
    paddingLeft: [0, null, null, null, 'lg'],
    '& > p:last-child': {
      marginBottom: 0,
    },
  })
);

const Feature = ({
  breakpoint,
  image,
  id,
  location,
  text: { childMarkdownRemark },
  ...props
}) => {
  return (
    <Grid {...props} flex="1" alignContent="center">
      <Figure
        col={[
          'bleedStart / bleedEnd',
          null,
          'contentStart / contentEnd',
          null,
          'contentStart / col3End',
        ]}
        row={{ lg: '1 / span 3' }}
        as="figure"
      >
        <GatsbyImage
          {...image}
          className="Feature__Image"
          style={{
            width: null,
            height: '100%',
          }}
        />
      </Figure>
      <TextBox
        col={{
          base: 'contentStart / contentEnd',
          lg: 'col4Start / contentEnd',
        }}
        row={{ lg: '2 / span 3' }}
        dangerouslySetInnerHTML={{ __html: childMarkdownRemark.html }}
      />
    </Grid>
  );
};

Feature.propTypes = propTypes;

Feature.defaultProps = defaultProps;

export default Feature;

export const pageQuery = graphql`
  fragment PageFeature on ContentfulPageFeature {
    id
    text {
      childMarkdownRemark {
        html
      }
    }
    image {
      fluid(maxHeight: 720, quality: 90) {
        aspectRatio
        ...GatsbyContentfulFluid_withWebp
      }
    }
  }
`;
