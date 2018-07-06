import React from 'react'
import PropTypes from 'prop-types'

import Container from 'components/Container'

const propTypes = {
  html: PropTypes.string.isRequired,
}

const defaultProps = {}

function Text (props) {

  const {
    html,
  } = props

  return (
    <Container>
      <div dangerouslySetInnerHTML={{__html: html}} />
    </Container>
  )
}

Text.propTypes = propTypes

Text.defaultProps = defaultProps

export default Text
