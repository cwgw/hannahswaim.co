import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// import { graphql } from 'gatsby'

import { spacing } from 'style/sizing'
import { media } from 'style/layout'
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

const Text = React.forwardRef(({
  text: {
    childMarkdownRemark
  },
  ...props
}, ref) => (
  <StandardGrid {...props} ref={ref} >
    <Content
      col={{
        base: 'contentStart / contentEnd',
        xl: 'contentStart / col4End',
      }}
      dangerouslySetInnerHTML={{__html: childMarkdownRemark.html}}
      row="1"
    />
  </StandardGrid>
));

Text.propTypes = propTypes

Text.defaultProps = defaultProps

export default Text

// export const pageQuery = graphql`
//   fragment PageText on ContentfulPageText {
//     id
//     text {
//       childMarkdownRemark {
//         html
//       }
//     }
//   }
// `
