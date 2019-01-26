import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

// import Layout from 'components/Layout'
import * as PageModule from 'components/PageModule'

const propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  data: PropTypes.object,
}

const defaultProps = {
  data: {
    page: {
      id: null,
      title: null,
      slug: null,
      node_locale: null,
      contentModules: []
    }
  }
}

const PageTemplate = ({
  location,
  data: {
    page: {
      contentModules,
      title,
      node_locale,
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
              null: 4,
              md: 8,
            }}
            paddingTop={__typename !== 'ContentfulPageHero' && index === 0 ? 8 : '0'}
            location={location}
            {...content}
          />
        )
        : null
    })}
  </React.Fragment>
)

// const PageTemplate = ({
//   location,
//   data: {
//     page: {
//       contentModules,
//       title,
//       node_locale,
//     },
//   },
// }) => (
//   <Layout
//     location={location}
//     title={title}
//     locale={node_locale}
//     >
//     {contentModules.map(({__typename, ...content}, index) => {
//       const Module = PageModule[__typename]
//       return Module
//         ? (
//           <Module
//             key={content.id}
//             marginBottom={{
//               null: 4,
//               md: 8,
//             }}
//             paddingTop={__typename !== 'ContentfulPageHero' && index === 0 ? 8 : '0'}
//             location={location}
//             {...content}
//           />
//         )
//         : null
//     })}
//   </Layout>
// )


PageTemplate.propTypes = propTypes

PageTemplate.defaultProps = defaultProps

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
        // ...PageInstagram
        // ...PageFeatureRow
