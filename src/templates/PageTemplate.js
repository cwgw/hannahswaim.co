import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import * as PageModule from 'components/PageModule'

const propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.shape({
    page: PropTypes.object,
  }).isRequired,
}

const PageTemplate = ({
  location,
  data: {
    page: {
      contentModules,
      // title,
      // node_locale,
    },
  },
}) => (
  <React.Fragment>
    {contentModules.map(({__typename, ...content}, index) => {
      const Module = PageModule[__typename]
      return Module
        ? (
          <Module
            key={content.id}
            marginBottom={{
              base: 'lg',
              md: 'xl',
            }}
            paddingTop={(index === 0 && __typename !== 'ContentfulPageHero') ? 8 : null}
            location={location}
            {...content}
          />
        )
        : null
    })}
  </React.Fragment>
)

PageTemplate.propTypes = propTypes

export default PageTemplate

export const pageQuery = graphql`
  query singlePage($id: String!) {
    page: contentfulPage(contentful_id: {eq: $id}) {
      id
      title
      slug
      node_locale
      contentModules {
        ...PageText
        ...PageHero
        ...PageArtwork
      }
    }
  }
`
