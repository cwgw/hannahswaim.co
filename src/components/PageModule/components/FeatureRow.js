import React from 'react'
import PropTypes from 'prop-types'

import spacing from 'utils/spacing'
import { isSet } from 'utils/helpers'

import ArtPiece from 'components/ArtPiece'
import Row from 'components/Row'
import Button from 'components/Button'
import Container from 'components/Container'

const propTypes = {
  edges: PropTypes.array.isRequired,
}

const defaultProps = {}

function FeatureRow (props) {

  const {
    edges,
    location,
    innerHTML,
    link,
  } = props

  const siblings = edges.map(({node}) => node.fields.slug)

  const combinedAspectRatio = edges.reduce((acc, {node}) => acc = acc + node.images[0].fluid.aspectRatio, 0)

  return (
    <React.Fragment>
      {innerHTML && (
        <Container dangerouslySetInnerHTML={{__html: innerHTML}} />
      )}
      <Row
        aspectRatio={combinedAspectRatio}
        itemHeight="320px"
        overflow
      >
        {edges.map(({node}, index, arr) => (
          <ArtPiece
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
      {link && (
        <Container
          marginTop={2}
        >
          <Button
            to={link.slug || link.url}
            external={isSet(link.url)}
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
