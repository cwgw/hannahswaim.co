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

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  const artPieceTemplate = path.resolve('./src/templates/ArtPieceTemplate.js')

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

        const artwork = result.data.artwork.edges

        artwork.forEach(({node}, index) => {
          const next = index + 1 < artwork.length ? artwork[index + 1].node : null
          const prev = index - 1 >= 0 ? artwork[index - 1].node : null
          createPage({
            path: `/artwork/${makeArtPieceSlug(node)}/`,
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
