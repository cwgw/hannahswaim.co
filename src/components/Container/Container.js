// import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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
