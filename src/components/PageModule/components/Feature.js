import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import GatsbyImage from 'gatsby-image'
import { transparentize } from 'polished'

import { spacing } from 'style/sizing'
import { media } from 'style/layout'
import { colors } from 'style/constants'
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
  flex: 1;

  &:only-child {
    height: 100%;
    align-content: center;
  }
`

const Figure = styled(Box)`
  overflow: hidden;
  height: 300px;
  width: 100%;
  margin-bottom: ${spacing('lg')};
  box-shadow: 0px 4px 72px ${transparentize(0.75, colors.coolBlack)};

  ${media.min.sm`
    height: 400px;
  `}

  ${media.min.lg`
    max-height: none;
    margin-bottom: 0;
  `}
`

const TextBox = styled(Box)`
  & > p:last-child {
    margin-bottom: 0;
  }
`

const Feature = ({
  breakpoint,
  image,
  id,
  location,
  text: {
    childMarkdownRemark
  },
  ...props
}) => {
  return (
    <Wrapper {...props} >
      <Figure
        gridColumn={{
          base: 'bleedStart / bleedEnd',
          sm: 'contentStart / contentEnd',
          lg: 'bleedStart / col3End',
          // xl: 'contentStart / col3End',
        }}
        as="figure"
        >
        <GatsbyImage
          {...image}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </Figure>
      <TextBox
        gridColumn={{
          base: 'contentStart / contentEnd',
          lg: 'col4Start / contentEnd',
        }}
        dangerouslySetInnerHTML={{__html: childMarkdownRemark.html}}
      />
    </Wrapper>
  )
}

Feature.propTypes = propTypes

Feature.defaultProps = defaultProps

export default Feature

export const pageQuery = graphql`
  fragment PageFeature on ContentfulPageFeature {
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
