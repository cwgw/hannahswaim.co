import React from 'react'
import PropTypes from 'prop-types'
import _find from 'lodash/find'

import has from 'utils/has'

import { Svg } from 'components/Graphics'

const propTypes = {
  type: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  atts: PropTypes.shape({
    viewBox: PropTypes.string,
    fill: PropTypes.string,
    stroke: PropTypes.string,
  }),
  inline: PropTypes.bool,
}

const defaultProps = {
  type: 'close',
  style: {},
  className: null,
  atts: {},
  inline: false,
}

const icons = {
  close: {
    paths: [
      ['line', {x1: 0, y1: 0, x2: 100, y2: 100}],
      ['line', {x1: 100, y1: 0, x2: 0, y2: 100}],
    ],
    aliases: [
      'x',
    ]
  },
  previous: {
    paths: [
      ['polyline', {points: '50,0 0,50 50,100', transform: 'translate(25,0)'}],
    ],
    aliases: [
      'left',
      'prev',
    ]
  },
  next: {
    paths: [
      ['polyline', {points: '0,0 50,50 0,100', transform: 'translate(25,0)'}],
    ],
    aliases: [
      'right',
    ]
  },
  instagram: {
    atts: {
      viewBox: '0 0 512 512',
      fill: 'currentColor',
      stroke: 'none',
    },
    paths: [
      ['path', {transform: 'translate(32,0)', d: 'M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z'}],
    ],
  },
}

function Icon ({type, style, className, inline}) {

  const name = type.slice().toLowerCase()

  const defaultAtts = {
    viewBox: '0 0 100 100',
    fill: 'none',
    stroke: 'currentColor',
    preserveAspectRatio: 'none',
  }

  const additionalStyle = inline
    ? {
      display: 'inline-block',
      verticalAlign: '-.125em',
      width: '1em',
      height: '1em',
    } : {
      display: 'block',
      width: '100%',
      height: 'auto',
    }

  if (has(icons, name) || _find(icons, (o) => Array.isArray(o.aliases) && o.aliases.includes(name))) {
    const {
      atts,
    } = icons[name]

    return (
      <Svg
        style={{
          ...additionalStyle,
          ...style,
        }}
        className={className}
        atts={{
          ...defaultAtts,
          ...atts,
        }}
        paths={icons[name].paths}
      />
    )
  }

  return null
}

Icon.propTypes = propTypes

Icon.defaultProps = defaultProps

export default Icon
