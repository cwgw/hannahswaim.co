import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import GatsbyImage from 'gatsby-image'
import { transparentize } from 'polished'
import { useSpring, animated } from 'react-spring'

import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { style as fontStyle } from 'style/fonts'
import { spacing } from 'style/sizing'
import { media } from 'style/layout'
import { colors, breakpoints } from 'style/constants'
import { StandardGrid } from 'components/Grid'
import Box from 'components/Box'

const propTypes = {
  image: PropTypes.shape({
    fluid: PropTypes.object,
  }).isRequired,
  text: PropTypes.shape({
    childMarkdownRemark: PropTypes.object,
  }).isRequired,
}

const defaultProps = {
  alignment: 'left',
  breakpoint: 'lg',
}

const Wrapper = styled(StandardGrid)`
  min-height: ${breakpoints.get('xs')}px;

  ${media.min.lg`
    height: 80vh;
  `}
`

const Figure = animated(styled(Box)`
  overflow: hidden;
  max-height: 400px;
  margin-bottom: ${spacing('lg')};
  box-shadow: 0px 4px 72px ${transparentize(0.75, colors.coolBlack)};
  transform-style: preserve-3d;

  ${media.min.md`
    max-height: 500px;
  `}
  
  ${media.min.lg`
    position: relative;
    z-index: -2;
    max-height: none;
    margin-bottom: 0;
  `}
`)

const TextBox = styled(Box)`
  position: relative;
  ${fontStyle.lead}
  border: 2px solid ${colors.brand[4]};
  min-width: 300px;

  & > p:first-child {
    ${fontStyle.hero}
  }

  & > p:last-child {
    margin-bottom: 0;
  }
`

const Hero = ({
  breakpoint,
  image,
  id,
  location,
  text: {
    childMarkdownRemark
  },
  ...props
}) => {
  const [{ y }, setY ] = useSpring(() => ({ y: 0 }));
  const ref = React.useRef();

  useIntersectionObserver((y) => {
    setY({y})
  }, ref);

  const transform = y.interpolate(y => `translate3d(0, ${(y - 0.5) * y * -10}%, 0) scale3d(1, 1, 1)`);

  return (
    <Wrapper
      ref={ref}
      {...props}
      >
      <TextBox
        paddingX="lg"
        paddingY="xl"
        alignSelf="start"
        gridColumn={{
          base: 'contentStart / contentEnd',
          lg: 'col1Start / col3End',
          xl: 'col1Start / col2End',
        }}
        gridRow="2"
        dangerouslySetInnerHTML={{__html: childMarkdownRemark.html}}
      />
      <Figure
        gridColumn={{
          base: 'contentStart / contentEnd',
          lg: 'col4Start / bleedEnd',
        }}
        gridRow={{
          lg: "1 / span 3",
        }}
        as="figure"
        marginTop="md"
        style={{
          transform
        }}
        >
        <GatsbyImage
          fixed={image.fixed}
          fluid={image.fluid}
          style={{
            width: '100%',
            height: '100%',
          }}
          imgStyle={{
            objectPosition: 'left center'
          }}
        />
      </Figure>
    </Wrapper>
  )
}

Hero.propTypes = propTypes

Hero.defaultProps = defaultProps

export default Hero

export const pageQuery = graphql`
  fragment PageHero on ContentfulPageHero {
    id
    text {
      childMarkdownRemark {
        html
      }
    }
    image {
      fluid (maxHeight: 720, quality: 90) {
        aspectRatio
        ...GatsbyContentfulFluid_withWebp
      }
    }
  }
`
