import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {

}

const defaultProps = {}

function Details (props) {

  const {
    title,
    date,
    media,
    dimensions: {
      height,
      width,
      depth,
      units
    },
  } = props

  return (
    <figcaption>
      <h2
        style={{
          display: 'inline',
          fontSize: 'inherit',
          fontWeight: 'inherit',
        }}
      >
        {title}
      </h2>
      {`, `}
      <time>{date}</time>
      <p>
        {media.slice().sort().reduce((acc, val, index, arr) => {
          return acc = acc + (index === arr.length - 1 ? ` and ${val.toLowerCase()}.` : index > 0 ? `, ${val.toLowerCase()}` : val)
        }, '')}
      </p>
      <p>{`${height} × ${width}${depth ? ` × ${depth}` : ''} ${units}`}</p>
    </figcaption>
  )
}

Details.propTypes = propTypes

Details.defaultProps = defaultProps

export default Details
