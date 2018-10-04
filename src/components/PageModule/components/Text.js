import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import { containerWidth, colors, brandColors } from 'utils/constants'
import media from 'utils/media'
import spacing from 'utils/spacing'

import Container from 'components/Container'

const propTypes = {
  innerHTML: PropTypes.string.isRequired,
}

const defaultProps = {}

const Content = styled.div`
  padding-bottom: ${spacing(2)};

  ${media.max.sm`
    background-color: ${colors.background};
  `}

  @media screen and (min-width: ${containerWidth}) {

    & .gatsby-resp-image-wrapper {
      margin-left: -${spacing(2)} !important;
      margin-bottom: ${spacing(4)};
      z-index: 1;

      &:after {
        content: '';
        position: absolute;
        background-image: linear-gradient(70deg, ${colors.gray[6]}, ${brandColors[5]});
        mix-blend-mode: color-burn;
        width: 100%;
        height: 100%;
        right: -${spacing(2)};
        bottom: -${spacing(-2)};
        z-index: -1;
      }
    }
  }
`

function Text ({innerHTML}) {

  return (
    <Container>
      <Content dangerouslySetInnerHTML={{__html: innerHTML}} />
    </Container>
  )
}

Text.propTypes = propTypes

Text.defaultProps = defaultProps

export default Text

export const pageQuery = graphql`
  fragment PageText on ContentfulPageText {
    id
    text {
      childMarkdownRemark {
        html
      }
    }
  }
`