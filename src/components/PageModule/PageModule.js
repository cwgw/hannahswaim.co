import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import Gallery from './components/Gallery'
import Hero from './components/Hero'
import Text from './components/Text'
import FeatureRow from './components/FeatureRow'

import spacing from 'utils/spacing'

const propTypes = {
  type: PropTypes.string.isRequired
}

const defaultProps = {}

const Container = styled.div`
  margin-bottom: ${spacing(6)};
`

function PageModule (props) {

  const {
    artwork,
    image,
    items,
    location,
    text,
    type,
  } = props

  const renderModule = () => {
    switch (type) {
      case 'ContentfulPageArtworkGallery':
        return (
          <Gallery
            location={location}
            edges={artwork
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
            image={{fluid: {
              ...image.fluid,
              base64: image.sqip.dataURI
            }}}
            html={text.childMarkdownRemark.html}
          />
        )
      case 'ContentfulPageText':
        return (
          <Text
            html={text.childMarkdownRemark.html}
          />
        )
      case 'ContentfulPageFeatureRow':
        return (
          <FeatureRow
            location={location}
            edges={items
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

  return (
    <Container>
      {renderModule()}
    </Container>
  )

}

PageModule.propTypes = propTypes

PageModule.defaultProps = defaultProps

export default PageModule

export const PageModuleFragments = graphql`
  fragment PageHero on ContentfulPageHero {
    __typename
    id
    text {
      childMarkdownRemark {
        html
      }
    }
    image {
      sqip(numberOfPrimitives: 6, mode: 4, blur: 10) {
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
        sqip(numberOfPrimitives: 6, mode: 4, blur: 10) {
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
        sqip(numberOfPrimitives: 6, mode: 4, blur: 10) {
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
`
