import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

// import Layout from 'components/Layout'
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

class ArtPieceTemplate extends React.Component {

  componentDidMount () {
    console.log('ArtPieceTemplate did mount')
  }

  render () {

    const {
      location,
      pageContext,
      data: {
        artPiece,
        // node_locale,
      },
    } = this.props

    let isModalEnabled = false

    if (
      typeof window !== `undefined` &&
      window.___HMS_INITIAL_RENDER_COMPLETE
    ) {
      isModalEnabled = true
    }

    let next, previous

    if (isModalEnabled) {

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

    return isModalEnabled
      ? (
        <PostNavigation
          next={next}
          previous={previous}
          variant="dark"
          fullHeight
          fixed
          >
          <ArtPieceDetails
            isModalEnabled={isModalEnabled}
            {...artPiece}
          />
        </PostNavigation>
      ) : (
        <React.Fragment>
          <PostNavigation
            next={next}
            previous={previous}
          />
          <ArtPieceDetails {...artPiece} />
        </React.Fragment>
      )
  }
}

ArtPieceTemplate.propTypes = propTypes

export default ArtPieceTemplate

export const pageQuery = graphql`
  query singleArtPiece($id: String!) {
    artPiece: contentfulArtPiece(contentful_id: {eq: $id}) {
      node_locale
      ...ArtPieceDetailsFragment
    }
  }
`
