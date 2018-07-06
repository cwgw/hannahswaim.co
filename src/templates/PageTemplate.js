import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from 'components/Layout'
import Gallery from 'components/Gallery'
import Hero from 'components/Hero'
import Text from 'components/Text'
import FeatureRow from 'components/FeatureRow'

import { isSet } from 'utils/helpers'

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
        contentModules,
      },
    },
  } = props

  const renderContentModules = (content) => {
    switch (content['__typename']) {
      case 'ContentfulPageArtworkGallery':
        return (
          <Gallery
            key={content.id}
            location={location}
            edges={content.artwork
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
          />
        )
      case 'ContentfulPageHero':
        return (
          <Hero
            key={content.id}
            image={{fluid: {
              ...content.image.fluid,
              base64: content.image.sqip.dataURI
            }}}
            html={content.text.childMarkdownRemark.html}
          />
        )
      case 'ContentfulPageText':
        return (
          <Text
            key={content.id}
            html={content.text.childMarkdownRemark.html}
          />
        )
      case 'ContentfulPageFeatureRow':
        return (
          <FeatureRow
            key={content.id}
            location={location}
            edges={content.items
              .slice()
              .map((item) => {
                return {
                  node: {
                    ...item,
                    date: item.date.slice(0,4)
                  }
                }
              })
            }
          />
        )
      default:
        return null
    }
  }

  const overlayHeader = isSet(contentModules)
    && contentModules.length > 0
    && 'ContentfulPageHero' === contentModules[0]['__typename']
    && isSet(contentModules[0].image)

  return (
    <Layout
      location={location}
      enableModal={location.state && location.state.enableModal}
      overlayHeader={overlayHeader}
    >
      {contentModules && contentModules.map(renderContentModules)}
    </Layout>
  )
}

PageTemplate.propTypes = propTypes

PageTemplate.defaultProps = defaultProps

export default PageTemplate

export const pageQuery = graphql`
  fragment PageHero on ContentfulPageHero {
    __typename
    id
    text {
      childMarkdownRemark {
        html
      }
    }
    image {
      sqip(numberOfPrimitives: 10, mode: 4, blur: 10) {
        dataURI
      }
      fluid(maxWidth: 1440, quality: 90) {
        aspectRatio
        src
        srcSet
        srcWebp
        srcSetWebp
        sizes
      }
    }
  }

  fragment PageArtwork on ContentfulPageArtworkGallery {
    __typename
    id
    artwork {
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
        sqip(numberOfPrimitives: 10, mode: 4, blur: 10) {
          dataURI
        }
        fluid(maxWidth: 480, quality: 90) {
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

  fragment PageFeatureRow on ContentfulPageFeatureRow {
    __typename
    id
    items {
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
        sqip(numberOfPrimitives: 10, mode: 4, blur: 10) {
          dataURI
        }
        fluid(maxWidth: 480, quality: 90) {
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

  fragment PageText on ContentfulPageText {
    __typename
    id
    text {
      childMarkdownRemark {
        html
      }
    }
  }

  query singlePage($id: String!) {
    page: contentfulPage(contentful_id: {eq: $id}) {
      id
      title
      slug
      contentModules {
        ... on ContentfulPageText {
          ...PageText
        }
        ... on ContentfulPageHero {
          ...PageHero
        }
        ... on ContentfulPageArtworkGallery {
          ...PageArtwork
        }
        ... on ContentfulPageFeatureRow {
          ...PageFeatureRow
        }
      }
    }
  }
`

// export const pageQuery = graphql`
//   query singlePage($id: String!) {
//     page: contentfulPage(id: {eq: $id}) {
//       id
//       title
//       slug
//       contentModules {
//         __typename
//       }
//     }
//     allContentfulPageHero(
//       filter: {page: {id: {eq: $id}}}
//     ) {
//       edges {
//         node {
//           id
//           text {
//             childMarkdownRemark {
//               html
//             }
//           }
//           image {
//             fluid {
//               base64
//               tracedSVG
//               aspectRatio
//               src
//               srcSet
//               srcWebp
//               srcSetWebp
//               sizes
//             }
//           }
//         }
//       }
//     }
//     allContentfulPageArtworkGallery(
//       filter: {page: {id: {eq: $id}}}
//     ) {
//       edges {
//         node {
//           id
//           artwork {
//             id
//             fields {
//               slug
//             }
//             title
//             date(formatString: "YYYYMMDD")
//             media
//             childContentfulArtPieceDimensionsJsonNode {
//               height
//               width
//               depth
//               units
//             }
//             images {
//               id
//               fluid(maxWidth: 480, quality: 90) {
//                 base64
//                 aspectRatio
//                 src
//                 srcSet
//                 srcWebp
//                 srcSetWebp
//                 sizes
//               }
//             }
//           }
//         }
//       }
//     }
//     allContentfulPageText(
//       filter: {page: {id: {eq: $id}}}
//     ) {
//       edges {
//         node {
//           id
//           text {
//             childMarkdownRemark {
//               html
//             }
//           }
//         }
//       }
//     }
//   }
// `
