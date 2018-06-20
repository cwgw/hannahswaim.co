import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import media from 'utils/media'
import breakpoints from 'utils/breakpoints'

const propTypes = {
  breakpoint: PropTypes.string,
}

const defaultProps = {
  breakpoint: 'sm',
}

const Container = styled.div`
  margin: 0 auto;
  width: 980px;
  max-width: 100%;
`

Container.propTypes = propTypes

Container.defaultProps = defaultProps

export default Container
