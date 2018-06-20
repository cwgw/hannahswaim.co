/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const Promise = require('bluebird')
const path = require('path');

const makeArtPieceSlug = ({title, date, media, id}) => {
  let str = `${title}-${date}-${media.join('-')}-${id}`
  return str.replace(/[\s|#]+/g, '-').toLowerCase()
}

exports.onCreateNode = (args) => {
  const { node, boundActionCreators, getNode } = args
  const { createNodeField } = boundActionCreators

  if (/ContentfulArtPiece/.test(node.internal.type) && typeof node.slug === `undefined` ) {
    // This is pretty fragile.
    // It equires that all properties are set and truthy, and does no type checking.
    // Also, the date is expected to be in ISO 8601 format, with leading four-digit year
    const slug = `/artwork/${makeArtPieceSlug({...node, date: node.date.slice(0,4)})}/`

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  const artPieceTemplate = path.resolve('./src/templates/ArtPieceTemplate.js')
  const pageTemplate = path.resolve('./src/templates/PageTemplate.js')

  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          artwork: allContentfulArtPiece (
            sort: {fields: [date], order: DESC }
          ) {
            edges {
              node {
                id
                fields {
                  slug
                }
              }
            }
          }
          pages: allContentfulPage {
            edges {
              node {
                slug
                id
              }
            }
          }
        }
      `).then(result => {

        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        result.data.pages.edges.forEach(({node: {slug, id}}, index) => {
          createPage({
            path: `/${slug ? slug : ''}`,
            component: pageTemplate,
            context: {
              id: id,
            },
          })
        })

        const artwork = result.data.artwork.edges

        artwork.forEach(({node}, index) => {

          const next = index + 1 < artwork.length ? artwork[index + 1].node : null
          const prev = index - 1 >= 0 ? artwork[index - 1].node : null

          createPage({
            path: node.fields.slug,
            component: artPieceTemplate,
            context: {
              id: node.id,
              next: next,
              previous: prev,
            },
          })
        })

      })
    )
  })
}
