import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

import media from 'utils/media'

const propTypes = {
  flex: PropTypes.bool,
}

const defaultProps = {
  flex: false,
}

const Default = styled.div`
  margin: 0 auto;
  max-width: 1028px;

  ${media.min.sm`
    padding: 0 0.75rem;
  `}
`

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  ${media.min.sm`
    margin: 0 -0.375rem;
  `}
`

function Container ({children, flex, ...props}) {
  return (
    <Default>
      {flex
        ? <Flex>{children}</Flex>
        : children
      }
    </Default>
  )
}

Container.propTypes = propTypes

Container.defaultProps = defaultProps

export default Container
