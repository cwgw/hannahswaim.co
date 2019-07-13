import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import { transparentize } from 'polished';

import { colors } from 'style/tokens';
import media from 'style/media-queries';
import spacing from 'style/spacing';

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

const Wrapper = styled(Grid)`
  flex: 1;
  flex-basis: 100%;
  align-content: center;
`;

const Figure = styled(Box)`
  overflow: visible;
  height: 300px;
  width: 100%;
  margin-bottom: ${spacing('lg')};
  box-shadow: 0px 3px 36px 2px ${transparentize(0.8, colors.coolBlack)};

  .Feature__Image {
    width: 100%;
  }

  ${media.min.sm`
    height: 400px;
  `}

  ${media.min.lg`
    direction: rtl;
    max-height: none;
    margin-bottom: 0;

    .Feature__Image {
      width: 120%;
    }
  `}
`;

const TextBox = styled(Box)`
  ${media.min.md`
    padding: 0 0 0 ${spacing('lg')};
  `}

  & > p:last-child {
    margin-bottom: 0;
  }
`;

const Feature = ({
  breakpoint,
  image,
  id,
  location,
  text: { childMarkdownRemark },
  ...props
}) => {
  return (
    <Wrapper {...props}>
      <Figure
        gridColumn={{
          base: 'bleedStart / bleedEnd',
          sm: 'contentStart / contentEnd',
          lg: 'contentStart / col3End',
          // xl: 'contentStart / col3End',
        }}
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
        gridColumn={{
          base: 'contentStart / contentEnd',
          lg: 'col4Start / contentEnd',
        }}
        row={{ lg: '2 / span 3' }}
        dangerouslySetInnerHTML={{ __html: childMarkdownRemark.html }}
      />
    </Wrapper>
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
