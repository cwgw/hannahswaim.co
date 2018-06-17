import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import media from 'utils/media'

const propTypes = {}

const defaultProps = {}

const Default = styled.div`

  ${media.min.sm`
    columns: 2 auto;
    column-gap: 1.5rem;
  `}

  ${media.min.lg`
    columns: 3 auto;
  `}
`

function FlexWall (props) {
  const {
    children
  } = props

  return (
    <Default>
      {React.Children.map(children, (child) => (
        React.cloneElement(child, {
          style: {
            display: 'block',
            breakInside: 'avoid',
            ...(child.props.style || {}),
          },
        })
      ))}
    </Default>
  )
}

FlexWall.propTypes = propTypes

FlexWall.defaultProps = defaultProps

export default FlexWall