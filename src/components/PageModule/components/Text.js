import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import { colors, brandColors } from 'utils/constants'
import media from 'utils/media'
import spacing from 'utils/spacing'

import Box from 'components/Box'
import { StandardGrid } from 'components/Grid'

const propTypes = {
  text: PropTypes.shape({
    childMarkdownRemark: PropTypes.object,
  }).isRequired,
}

const defaultProps = {}

const Content = styled(Box)`
  ${media.min.md`
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
  `}
`

const Text = ({
  text: {
    childMarkdownRemark
  },
  location,
  id,
  ...props
}) => (
  <StandardGrid {...props} >
    <Content
      gridColumn={{
        null: 'contentStart / contentEnd',
        lg: 'col2Start / col5End',
      }}
      gridRow="contentStart / contentEnd"
      dangerouslySetInnerHTML={{__html: childMarkdownRemark.html}}
    />
  </StandardGrid>
)


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