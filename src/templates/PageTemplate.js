import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from 'components/Layout'
import PageModule from 'components/PageModule'

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
    const pageModule = {...content}
    delete pageModule['__typename']
    return (
      <PageModule
        key={content.id}
        location={location}
        type={content['__typename']}
        {...pageModule}
      />
    )
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
