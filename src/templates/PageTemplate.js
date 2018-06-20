import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Gallery from 'components/Gallery'
import ArtPiece from 'components/ArtPiece'
import PageHeading from 'components/PageHeading'

const propTypes = {}

const defaultProps = {}

function PageTemplate (props) {

  const {
    location,
    data: {
      page: {
        content,
        title,
      },
    },
  } = props

  const renderContent = (content) => {
    console.log(content)
    if (content.artwork) {
      return (
        <Gallery
          key={content.id}
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
          location={location}
        />
      )
    }
    if (content.text) {
      console.log(content)
    }
    if (content.text) {
      console.log(content)
    }
  }

  return (
    <div>
      {title && title !== 'home' && (
        <PageHeading>{title}</PageHeading>
      )}
      {content && content.map(renderContent)}
    </div>
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
        artwork: artworkGallery {
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
    }
  }
`
