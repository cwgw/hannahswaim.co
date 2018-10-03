import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from 'components/Layout'
import ArtPieceDetails from 'components/ArtPieceDetails'
import PostNavigation from 'components/PostNavigation'

const propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  pageContext: PropTypes.shape({
    next: PropTypes.string,
    previous: PropTypes.string,
  }).isRequired,
  data: PropTypes.shape({
    artPiece: PropTypes.object,
  }).isRequired,
}

function ArtPieceTemplate (props) {

  const {
    location,
    pageContext,
    data: {
      artPiece,
      node_locale,
      ...data
    },
  } = props

  let isModal = false

  if (
    typeof window !== `undefined` &&
    window.___HMS_INITIAL_RENDER_COMPLETE
  ) {
    isModal = true
  }

  let next, previous

  if (isModal) {

    const {
      siblings,
      index,
    } = location.state || {}

    next = {
      pathname: index + 1 < siblings.length ? siblings[index + 1] : null,
      state: {
        ...location.state,
        index: index + 1,
      }
    }
    previous = {
      pathname: index > 0 ? siblings[index - 1] : null,
      state: {
        ...location.state,
        index: index - 1,
      }
    }
  } else {
    next = {
      pathname: pageContext.next,
      state: location.state,
    }
    previous = {
      pathname: pageContext.previous,
      state: location.state,
    }
  }

  return (
    <Layout
      location={location}
      title={`${artPiece.title}, ${artPiece.date}`}
      data={data}
      locale={node_locale}
    >
      {isModal ? (
        <PostNavigation
          next={next}
          previous={previous}
          variant="dark"
          fullHeight
          fixed
        >
          <ArtPieceDetails
            modalEnabled={isModal}
            {...artPiece}
          />
        </PostNavigation>
      ) : (
        <React.Fragment>
          <PostNavigation
            next={next}
            previous={previous}
            // fixed={viewportDimensions.width >= breakpoints.modal}
          />
          <ArtPieceDetails {...artPiece} />
        </React.Fragment>
      )}
    </Layout>
  )
}

ArtPieceTemplate.propTypes = propTypes

export default ArtPieceTemplate

export const pageQuery = graphql`
  query singleArtPiece($id: String!) {
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
    artPiece: contentfulArtPiece(contentful_id: {eq: $id}) {
      node_locale
      ...ArtPieceDetailsFragment
    }
  }
`
