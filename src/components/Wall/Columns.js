import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import media from 'utils/media'

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
}

const defaultProps = {}

const Default = styled.div`

  ${media.min.sm`
    columns: 2 auto;
    column-gap: 1.5rem;
  `}

  ${media.min.lg`
    columns: 3 auto;
  `}

  ${media.min.xl`
    column-gap: 3rem;
  `}
`

function Columns (props) {
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

Columns.propTypes = propTypes

Columns.defaultProps = defaultProps

export default Columns