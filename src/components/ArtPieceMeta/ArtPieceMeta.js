import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  media: PropTypes.array,
  dimensions: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
    depth: PropTypes.number,
    units: PropTypes.string,
  }),
  style: PropTypes.object,
  className: PropTypes.string,
}

const defaultProps = {
  style: {},
  className: null,
}

const Fragment = styled.p`
  margin: 0;

  ${({small}) => small && `
    font-size: 75%;
  `}

  ${({emphasis}) => emphasis && `
    font-style: italic;
  `}
`

function Details (props) {

  const {
    title,
    date,
    media: mediaArray,
    dimensions: {
      height,
      width,
      depth,
      units
    },
    style,
    className,
  } = props

  let media = null

  if (Array.isArray(mediaArray)) {
    media = mediaArray.slice().sort().reduce((acc, val, index, arr) => {
      if (arr.length === 1) {
        return `${val}.`
      } else {
        return acc = acc + (index === arr.length - 1 ? ` and ${val}.` : index > 0 ? `, ${val}` : val)
      }
    }, '')
    media = media.charAt(0).toUpperCase() + media.slice(1).toLowerCase()
  }

  return (
    <div
      className={className}
      style={style}
    >
      {title && (
        <Fragment>{date ? `${title}, ${date}` : title}</Fragment>
      )}
      {media && (
        <Fragment small emphasis >{media}</Fragment>
      )}
      {height && width && (
        <Fragment small >{`${height} × ${width}${depth ? ` × ${depth}` : ''} ${units}`}</Fragment>
      )}
    </div>
  )
}

Details.propTypes = propTypes

Details.defaultProps = defaultProps

export default Details
