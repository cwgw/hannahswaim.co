import React from 'react'
import PropTypes from 'prop-types'

import Layout from 'components/Layout'
import Container from 'components/Container'
import Gallery from 'components/Gallery'

const propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  data: PropTypes.object,
}

const defaultProps = {}

function PageTemplate (props) {

  const {
    location,
    data: {
      page: {
        content,
      },
    },
  } = props

  // console.log(location)

  const renderContent = (content) => {
    if (content.artworkGallery) {
      return (
        <Gallery
          key={content.id}
          edges={content.artworkGallery
            .slice()
            .sort((a,b) => {
              return b.date - a.date
            })
            .map((item) => {
              return {
                node: {
                  ...item,
                  date: item.date.slice(0,4)
                }
              }
            })
          }
          location={location}
        />
      )
    }
    if (content.childContentfulPageContentPageContentTextNode) {
      return (
        <Container
          key={content.id}
        >
          <div dangerouslySetInnerHTML={{__html: content.childContentfulPageContentPageContentTextNode.childMarkdownRemark.html}} />
        </Container>
      )
    }
  }

  return (
    <Layout
      location={location}
      enableModal={location.state && location.state.enableModal}
    >
      {content && content.map(renderContent)}
    </Layout>
  )
}

PageTemplate.propTypes = propTypes

PageTemplate.defaultProps = defaultProps

export default PageTemplate

export const pageQuery = graphql`
  query singlePage($id: String!) {
    page: contentfulPage(id: {eq: $id}) {
      id
      title
      slug
      content {
        ... on ContentfulPageArtworkGallery {
          id
          artworkGallery {
            id
            fields {
              slug
            }
            title
            date(formatString: "YYYYMMDD")
            media
            childContentfulArtPieceDimensionsJsonNode {
              height
              width
              depth
              units
            }
            images {
              id
              sizes(maxWidth: 480, quality: 90) {
                base64
                aspectRatio
                src
                srcSet
                srcWebp
                srcSetWebp
                sizes
              }
            }
          }
        }
        ... on ContentfulPageContent {
          id
          childContentfulPageContentPageContentTextNode {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
