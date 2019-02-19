import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import GatsbyImage from 'gatsby-image'
import { animated } from 'react-spring'
import { transparentize } from 'polished'

import useScrollPosition from 'hooks/useScrollPosition'
import { style as fontStyle } from 'style/fonts'
import { media, spacing } from 'style/layout'
import { colors, breakpoints } from 'style/constants'
import { withUIProps } from 'components/UIContext'
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
  position: relative;
  z-index: -2;
  max-height: 400px;
  margin-bottom: ${spacing('lg')};
  box-shadow: 0px 4px 72px ${transparentize(0.75, colors.coolBlack)};
  transform-style: preserve-3d;

  ${media.min.lg`
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
  text: {
    childMarkdownRemark
  },
  image,
  isViewport,
  breakpoint,
  location,
  id,
  ...props
}) => {
  const scrollY = useScrollPosition();
  const y = scrollY.interpolate(y => `translate3d(0, ${y * -0.1}px, 0) scale3d(1, 1, 1)`);
  return (
    <Wrapper
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
          base: 'wideStart / wideEnd',
          lg: 'col4Start / bleedEnd',
        }}
        gridRow={{
          lg: "1 / span 3",
        }}
        as="figure"
        marginTop="md"
        style={{
          transform: y,
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

export default withUIProps(Hero)

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
