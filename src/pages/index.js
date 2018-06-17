import React from 'react'
import Link from 'gatsby-link'

import Gallery from 'components/Gallery'
import ArtPiece from 'components/ArtPiece'

const IndexPage = ({data, location}) => {

  return (
    <div>
      <Gallery
        edges={data.selectedArtwork.edges}
        location={location}
      />
    </div>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query GalleryPage {
    selectedArtwork: allContentfulArtPiece (
      sort: {fields: [date], order: DESC }
    ) {
      edges {
        node {
          ...ArtPieceFragment
        }
      }
    }
  }
`
