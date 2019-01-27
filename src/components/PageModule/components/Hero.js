import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import GatsbyImage from 'gatsby-image'

import { media } from 'utils/media'
import { colors, breakpoints } from 'utils/constants'
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
  min-height: ${breakpoints.xs}px;

  ${media.min.lg`
    height: 80vh;
    // max-height: ${breakpoints.md}px;
  `}
`

const Figure = styled(Box)`
  margin-bottom: 0;
`

const TextBox = styled(Box)`
  position: relative;
  font-size: 1.5rem;
  line-height: 1.2;
  border: 2px solid ${colors.brand[4]};

  & > p:first-child {
    font-size: 2.5rem;
    font-weight: 700;
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
  viewportDimensions,
  breakpoint,
  location,
  id,
  ...props
}) => (
  <Wrapper
    {...props}
    >
    <TextBox
      paddingY={4}
      paddingX={1}
      alignSelf="start"
      gridColumn={{
        base: 'contentStart / contentEnd',
        lg: 'col1Start / col3End',
        xl: 'col1Start / col2End',
      }}
      gridRow="2"
      dangerouslySetInnerHTML={{__html: childMarkdownRemark.html}}
    />
    {viewportDimensions.width >= breakpoints[breakpoint] && (
      <Figure
        gridColumn={{
          null: 'wideStart / wideEnd',
          // lg: 'col4Start / wideEnd',
          lg: 'col4Start / bleedEnd',
        }}
        gridRow={{
          lg: "1 / span 3",
        }}
        as="figure"
        paddingY={2}
        >
        <GatsbyImage
          {...(image.fixed
            ? {
              fixed: {
                ...image.fixed,
                base64: image.sqip.dataURI,
              }
            }
            : {
              fluid: {
                ...image.fluid,
                base64: image.sqip.dataURI,
              }
            }
          )}
          style={{
            width: '100%',
            height: '100%',
          }}
          imgStyle={{
            objectPosition: 'left center'
          }}
        />
      </Figure>
    )}
  </Wrapper>
)

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
      sqip (numberOfPrimitives: 6, mode: 4, blur: 10) {
        dataURI
      }
      fluid (maxHeight: 720, quality: 90) {
        aspectRatio
        ...GatsbyContentfulFluid_withWebp_noBase64
      }
    }
  }
`
