import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Container from 'components/Container'

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
}

const defaultProps = {}

const Default = styled.h1`
`

const Header = styled.header`
`

function PageHeading ({children, ...props}) {

  const Element = typeof children !== 'string' ? Header : Default

  return (
    <Container>
      <Element
        element={typeof children === 'string' ? 'h1' : 'header'}
        {...props}
      >
        {children}
      </Element>
    </Container>
  )
}

PageHeading.propTypes = propTypes

PageHeading.defaultProps = defaultProps

export default PageHeading
