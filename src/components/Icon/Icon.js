import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import has from 'utils/has'

const propTypes = {
  type: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
}

const defaultProps = {
  type: 'close',
  style: {},
  className: null,
}

const paths = {
  close: [
    ['line', {x1: 0, y1: 0, x2: 100, y2: 100}],
    ['line', {x1: 100, y1: 0, x2: 0, y2: 100}],
  ],
  left: [
    ['polyline', {points: '100,0 0,50 100,100'}],
  ],
  prev: [
    ['polyline', {points: '100,0 0,50 100,100'}],
  ],
  previous: [
    ['polyline', {points: '100,0 0,50 100,100'}],
  ],
  right: [
    ['polyline', {points: '0,0 100,50 0,100'}],
  ],
  next: [
    ['polyline', {points: '0,0 100,50 0,100'}],
  ],
}

function Icon ({type, style, className}) {

  const renderPaths = (name) => paths[name].map(([Element, atts], index) => (
    <Element
      key={Element+index}
      vectorEffect="non-scaling-stroke"
      fill="transparent"
      stroke="currentColor"
      {...atts}
    />
  ))

  return has(paths, type) ?
  (
    <svg
      style={style}
      className={className}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {renderPaths(type)}
    </svg>
  ) : null
}

Icon.propTypes = propTypes

Icon.defaultProps = defaultProps

export default Icon
