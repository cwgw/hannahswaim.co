import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import { spacing, media } from 'style/layout'
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
      margin-bottom: ${spacing('xl')};
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
        base: 'contentStart / contentEnd',
        xl: 'col2Start / col5End',
      }}
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
