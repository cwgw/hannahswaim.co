import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import spacing from 'utils/spacing'

import ArtPiece from 'components/ArtPiece'
import Row from 'components/Row'

const propTypes = {
  edges: PropTypes.array.isRequired,
}

const defaultProps = {}

// const Row = styled.div`
//   width: 100%;
//   overflow: hidden;
//   overflow-x: scroll;
//   -webkit-overflow-scrolling: touch;

// `

// const Overflow = styled.div`
//   display: flex;
//   flex-flow: row nowrap;

//   ${({aspectRatio, gutter}) => aspectRatio && `
//     width: calc(${400 * aspectRatio}px + ${gutter || 0});
//   `}
// `

const Figure = styled.div`
  margin-right: ${spacing(2)};

  &:last-child {
    margin-right: 0;
  }

  ${({aspectRatio}) => aspectRatio && `
    flex: ${aspectRatio};
  `}
`

function FeatureRow (props) {
  const {
    edges,
    location,
  } = props

  const siblings = edges.map(({node}) => node.fields.slug)

  const renderArtwork = ({node}, index, arr) => {
    return (
      <Figure
        key={node.id}
        aspectRatio={node.images[0].fluid.aspectRatio}
      >
        <ArtPiece
          location={location}
          siblings={siblings}
          index={index}
          {...node}
        />
      </Figure>
    )
  }

  const combinedAspectRatio = edges.reduce((acc, {node}) => acc = acc + node.images[0].fluid.aspectRatio, 0)

  return (
    <Row
      aspectRatio={combinedAspectRatio}
      itemHeight="320px"
      overflow
    >
      {edges.map(renderArtwork)}
    </Row>
  )
}

FeatureRow.propTypes = propTypes

FeatureRow.defaultProps = defaultProps

export default FeatureRow
