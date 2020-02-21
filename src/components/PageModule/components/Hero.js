import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import { useSpring, animated } from 'react-spring';
import css from '@styled-system/css';

import useParallax from 'hooks/useParallax';

import { type } from 'style/shared';
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
};

const Wrapper = styled(Grid)(
  css({
    minHeight: '480px',
    [mediaQueries.lg]: {
      height: '80vh',
    },
  })
);

const Figure = animated(
  styled(Box)(
    css({
      overflow: 'hidden',
      maxHeight: '400px',
      marginX: 0,
      marginBottom: 'lg',
      marginTop: 'md',
      boxShadow: props =>
        `0px 3px 36px 2px ${transparentize(0.8, 'coolBlack')(props)}`,
      transformStyle: 'preserve-3d',
      willChange: 'transform',
      [mediaQueries.md]: {
        maxHeight: '500px',
      },
      [mediaQueries.lg]: {
        position: 'relative',
        zIndex: -2,
        maxHeight: 'none',
        marginBottom: 0,
      },
    })
  )
);

const TextBox = styled(Box)(
  css({
    position: 'relative',
    border: '2px solid',
    borderColor: 'brand.4',
    padding: 'lg',
    [mediaQueries.md]: {
      minWidth: '300px',
    },
    '& > p:first-child': type.hero,
    '& > *:nth-child(n + 2)': type.lead,
    '&:before': {
      position: 'absolute',
      top: 2,
      left: -2,
      width: '100%',
      height: '100%',
      background: '#fff',
      opacity: '0.5',
      content: '""',
      zIndex: -1,
    },
  })
);

const Hero = ({
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
