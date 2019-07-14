import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import { transparentize } from 'polished';
import { useSpring, animated } from 'react-spring';

import useParallax from 'hooks/useParallax';
import { colors, breakpoints } from 'style/tokens';
import media from 'style/media-queries';
import spacing from 'style/spacing';
import type from 'style/type';

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
  min-height: ${breakpoints.get('xs')}px;

  ${media.min.lg`
    height: 80vh;
  `}
`;

const Figure = animated(styled(Box)`
  overflow: hidden;
  max-height: 400px;
  margin-bottom: ${spacing('lg')};
  box-shadow: 0px 3px 36px 2px ${transparentize(0.8, colors.coolBlack)};
  transform-style: preserve-3d;
  will-change: transform;

  ${media.min.md`
    max-height: 500px;
  `}

  ${media.min.lg`
    position: relative;
    z-index: -2;
    max-height: none;
    margin-bottom: 0;
  `}
`);

const TextBox = styled(Box)`
  position: relative;
  border: 2px solid ${colors.brand[4]};

  ${media.min.md`
    min-width: 300px;
  `}

  & > p:first-child {
    ${type.hero}
  }

  & > *:nth-child(n + 2) {
    ${type.lead}
  }

  & > p:last-child {
    margin-bottom: 0;
  }

  &:before {
    position: absolute;
    top: 0.5rem;
    left: -0.5rem;
    width: 100%;
    height: 100%;
    background: #fff;
    opacity: 0.5;
    content: '';
    z-index: -1;
  }
`;

const Hero = ({
  breakpoint,
  image,
  id,
  location,
  text: { childMarkdownRemark },
  ...props
}) => {
  const [{ y }, setY] = useSpring(() => ({
    y: 0,
    config: {
      precision: 0.1,
    },
  }));

  const ref = useParallax(y => {
    setY({ y: y * 100 });
  });

  const transform = y.interpolate(
    y => `matrix(1, 0, 0, 1, 0, ${50 / 2 - y / 2})`
  );

  return (
    <Wrapper ref={ref} {...props}>
      <TextBox
        paddingX="lg"
        paddingY="xl"
        alignSelf="start"
        col={{
          base: 'contentStart / contentEnd',
          lg: 'col1Start / col3End',
          xl: 'col1Start / col2End',
        }}
        row="2"
        dangerouslySetInnerHTML={{ __html: childMarkdownRemark.html }}
      />
      <Figure
        col={{
          base: 'contentStart / contentEnd',
          lg: 'col4Start / bleedEnd',
        }}
        row={{ lg: '1 / span 3' }}
        as="figure"
        marginTop="md"
        style={{ transform }}
      >
        <GatsbyImage
          fixed={image.fixed}
          fluid={image.fluid}
          style={{
            width: '100%',
            height: '100%',
          }}
          imgStyle={{ objectPosition: 'left center' }}
        />
      </Figure>
    </Wrapper>
  );
};

Hero.propTypes = propTypes;

Hero.defaultProps = defaultProps;

export default Hero;

export const pageQuery = graphql`
  fragment PageHero on ContentfulPageHero {
    id
    text {
      childMarkdownRemark {
        html
      }
    }
    image {
      fluid(maxWidth: 900, quality: 90) {
        aspectRatio
        ...GatsbyContentfulFluid_withWebp
      }
    }
  }
`;
