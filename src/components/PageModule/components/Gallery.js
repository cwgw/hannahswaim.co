import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { colors } from 'style/constants'
import { spacing } from 'style/sizing';

import Box from 'components/Box'
import ImageWall from 'components/ImageWall'
import Piece from 'components/Piece'

import Text from './Text'

const propTypes = {
  artwork: PropTypes.array.isRequired,
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ])
}

const defaultProps = {}

const StyledText = styled(Text)`
  & h2 {
    position: relative;
    display: inline-block;
  }

  & h2:before {
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    width: 100%;
    height: 75%;
    transform: translate(${spacing(-2)}, ${spacing(-1)});
    content: '';
    background: ${colors.brand[5]};
  }
`

const Gallery = ({
  location,
  artwork,
  text,
  id,
  ...props
}) => {

  const edges = artwork
    .slice()
    .sort((a,b) => {
      return b.date - a.date
    })
    .map((item) => {
      return {
        node: {
          ...item,
          date: item.date.slice(0,4)
        }
      }
    })

  const siblings = edges.map(({node}) => node.fields.slug)

  return (
    <Box {...props} >
      {text && text.childMarkdownRemark && (
        <StyledText text={text} />
      )}
      <ImageWall
        items={edges.map(({node}) => node)}
        childAspectRatioResolver={({images}) => (images[0] && images[0].fluid && images[0].fluid.aspectRatio) || 1}
        >
        {edges.map(({node}, index) => (
          <Piece
            key={node.id}
            location={location}
            siblings={siblings}
            siblingIndex={index}
            {...node}
          />
        ))}
      </ImageWall>
    </Box>
  )
}

Gallery.propTypes = propTypes

Gallery.defaultProps = defaultProps

export default Gallery

export const pageQuery = graphql`
  fragment PageArtwork on ContentfulPageArtworkGallery {
    id
    text {
      childMarkdownRemark {
        html
      }
    }
    artwork {
      id
      fields {
        slug
      }
      title
      date(formatString: "YYYYMMDD")
      media
      childContentfulArtPieceDimensionsJsonNode {
        height
        width
        depth
        units
      }
      images {
        id
        fluid(maxWidth: 480, quality: 90) {
          aspectRatio
          ...GatsbyContentfulFluid_withWebp
        }
      }
    }
  }
`
