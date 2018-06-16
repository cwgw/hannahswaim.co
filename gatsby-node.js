/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const Promise = require('bluebird')
const path = require('path');

const makeArtPieceSlug = ({title, date, media, id}) => {
  let str = `${title}-${date}-${media.join('-')}-${id}`
  return str.replace(/\s+/g, '-').toLowerCase()
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  const artPieceTemplate = path.resolve('./src/templates/ArtPieceTemplate.js')

  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          artwork: allContentfulArtPiece {
            edges {
              node {
                id
                title
                date(formatString: "YYYY")
                media
              }
            }
          }
        }
      `).then(result => {

        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        result.data.artwork.edges.forEach(({node}, index) => {
          createPage({
            path: `/artwork/${makeArtPieceSlug(node)}/`,
            component: artPieceTemplate,
            context: {
              id: node.id
            },
          })
        })
      })
    )
  })
}
