import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import fonts from 'utils/fonts'
import spacing from 'utils/spacing'
import { capitalizeFirstLetterOnly } from 'utils/helpers'

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

const TextFragment = styled.p`
  margin: 0;

  ${({small}) => small && `
    font-family: ${fonts.sansSerif};
    font-size: ${spacing(-1)};
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

  let media

  if (Array.isArray(mediaArray)) {
    media = mediaArray.slice().sort().reduce((acc, val, index, arr) => {
      if (arr.length === 1) {
        return `${val}.`
      } else {
        return acc = acc + (index === arr.length - 1 ? ` and ${val}.` : index > 0 ? `, ${val}` : val)
      }
    }, '')
    media = capitalizeFirstLetterOnly(media)
  }

  return (
    <div
      className={className}
      style={style}
    >
      {title && (
        <TextFragment>{date ? `${title}, ${date}` : title}</TextFragment>
      )}
      {media && (
        <TextFragment small emphasis >{media}</TextFragment>
      )}
      {height && width && (
        <TextFragment small >{`${height} × ${width}${depth ? ` × ${depth}` : ''} ${units}`}</TextFragment>
      )}
    </div>
  )
}

Details.propTypes = propTypes

Details.defaultProps = defaultProps

export default Details
