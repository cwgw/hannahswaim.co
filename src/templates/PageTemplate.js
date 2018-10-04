import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from 'components/Layout'
import * as PageModule from 'components/PageModule'
import Box from 'components/Box'

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
        title,
        node_locale,
      },
      ...data
    },
  } = props

  const hasHero = isSet(contentModules)
    && contentModules.length > 0
    && 'ContentfulPageHero' === contentModules[0]['__typename']
    && isSet(contentModules[0].image)

  return (
    <Layout
      location={location}
      title={title}
      hasHero={hasHero}
      data={data}
      locale={node_locale}
    >
      {contentModules && contentModules.map(({__typename, ...content}) => {
        const Module = PageModule[__typename]
        return Module ? (
          <Box
            key={content.id}
            marginBottom={8}
          >
            <Module
              location={location}
              {...content}
            />
          </Box>
        ) : null
      })}
    </Layout>
  )
}

PageTemplate.propTypes = propTypes

PageTemplate.defaultProps = defaultProps

export default PageTemplate

export const pageQuery = graphql`
  query singlePage($id: String!) {
    site {
      siteMetadata {
        siteTitle
        siteTitleSeparator
        siteUrl
      }
    }
    socialMedia: allContentfulSocialMediaLink {
      edges {
        node {
          service
          url
        }
      }
    }
    menu: contentfulMenu {
      menuItems {
        ... on ContentfulPage {
          ...MenuItemPage
        }
        ... on ContentfulSocialMediaLink {
          ...MenuItemSocialMediaLink
        }
      }
    }
    page: contentfulPage(contentful_id: {eq: $id}) {
      id
      title
      slug
      node_locale
      contentModules {
        ...PageText
        ...PageHero
        ...PageArtwork
        ...PageFeatureRow
        ...PageInstagram
      }
    }
  }
`
