import React from 'react'
import PropTypes from 'prop-types'
// import { graphql } from 'gatsby'

import spacing from 'utils/spacing'
import { isSet } from 'utils/helpers'

// import ArtPiece from 'components/ArtPiece'
import Piece from 'components/Piece'
import Row from 'components/Row'
import Button from 'components/Button'
import Container from 'components/Container'

const propTypes = {
  items: PropTypes.array.isRequired,
  text: PropTypes.shape({
    childMarkdownRemark: PropTypes.object,
  }),
}

const defaultProps = {}

function FeatureRow (props) {

  const {
    items,
    location,
    text: {
      childMarkdownRemark
    },
    viewMoreLink,
  } = props

  const edges = items.map((item) => ({
    node: {
      ...item,
      date: item.date.slice(0,4)
    }
  }))

  const siblings = edges.map(({node}) => node.fields.slug)

  const combinedAspectRatio = edges.reduce((acc, {node}) => acc = acc + node.images[0].fluid.aspectRatio, 0)

  return (
    <React.Fragment>
      {childMarkdownRemark && (
        <Container dangerouslySetInnerHTML={{__html: childMarkdownRemark.html}} />
      )}
      <Row
        aspectRatio={combinedAspectRatio}
        itemHeight="320px"
        overflow
        >
        {edges.map(({node}, index, arr) => (
          <Piece
            key={node.id}
            location={location}
            siblings={siblings}
            siblingIndex={index}
            style={{
              flex: node.images[0].fluid.aspectRatio,
              marginRight: index + 1 === arr.length ? 0 : spacing(2),
              marginBottom: 0,
            }}
            {...node}
          />
        ))}
      </Row>
      {viewMoreLink && (
        <Container
          marginTop={2}
          >
          <Button
            to={viewMoreLink.slug || viewMoreLink.url}
            external={isSet(viewMoreLink.url)}
            marginLeft="auto"
            variant="brand"
            link
            >
            View More&hellip;
          </Button>
        </Container>
      )}
    </React.Fragment>
  )
}

FeatureRow.propTypes = propTypes

FeatureRow.defaultProps = defaultProps

export default FeatureRow

// export const pageQuery = graphql`
//   fragment PageFeatureRow on ContentfulPageFeatureRow {
//     id
//     items {
//       id
//       fields {
//         slug
//       }
//       title
//       date(formatString: "YYYYMMDD")
//       media
//       childContentfulArtPieceDimensionsJsonNode {
//         height
//         width
//         depth
//         units
//       }
//       images {
//         id
//         sqip(numberOfPrimitives: 6, mode: 4, blur: 10) {
//           dataURI
//         }
//         fluid(maxWidth: 480, quality: 90) {
//           aspectRatio
//           src
//           srcSet
//           srcWebp
//           srcSetWebp
//           sizes
//         }
//       }
//     }
//     viewMoreLink {
//       slug
//       title
//     }
//     text {
//       childMarkdownRemark {
//         html
//       }
//     }
//   }
// `
