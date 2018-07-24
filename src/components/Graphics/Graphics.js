import React from 'react'
import styled from 'styled-components'
import uuid from 'uuid/v1'

import { angleToPoints, degreesToRadians } from 'utils/helpers'
import { colors, breakpoints, ease } from 'utils/constants'
import spacing from 'utils/spacing'

const linearGradient = ({dir, stops}) => {

  const id = uuid()

  const markup = () => (
    <linearGradient
      id={id}
      {...angleToPoints(degreesToRadians(dir))}
    >
      {stops.map((stop, index) => (
        <stop
          key={stop.stopColor+index}
          {...stop}
        />
      ))}
    </linearGradient>
  )

  return {
    id: id,
    render: markup,
  }
}

const StyledSvg = styled(
  ({style, ...props}) => <svg {...props} />
)`
  ${({style}) => style}
`

export const Svg = (props) => {

  const {
    defs,
    paths,
    atts,
    style,
    className,
  } = props

  const defaultAtts = {
    viewBox: '0 0 100 100',
    preserveAspectRatio: 'none',
  }

  return (
    <StyledSvg
      className={className}
      {...{
        ...defaultAtts,
        ...atts
      }}
      style={style}
    >
      {typeof defs === 'function' && (
        <defs>
          {defs()}
        </defs>
      )}
      {paths.map(([Element, pathAtts], index) => (
        <Element
          key={Element + index}
          vectorEffect="non-scaling-stroke"
          {...pathAtts}
        />
      ))}
    </StyledSvg>
  )
}

export const Circle = ({style, ...props}) => {

  const gradient = linearGradient({
    dir: 135,
    stops: [
      {stopColor: colors.brand[4], offset: '0%'},
      {stopColor: colors.brand[6], offset: '50%'},
    ],
  })

  return (
    <Svg
      style={{
        position: 'absolute',
        userSelect: 'none',
        pointerEvents: 'none',
        width: '120vw',
        height: '120vw',
        left: '-30vw',
        top: '-70vw',
        transition: `right 350ms ${ease}`,
        [`@media (min-width: ${breakpoints.lg}px)`]: {
          width: '1440px',
          height: '1440px',
          left: 'auto',
          right: '36vw',
          top: '-720px',
        },
        ...style,
      }}
      defs={gradient.render}
      paths={[
        ['circle', {...{fill: `url(#${gradient.id})`, r: 50, cx: 50, cy: 50}, ...props}],
      ]}
    />
  )
}

export const Squiggles = ({style, ...props}) => {

  const id = {
    pattern: uuid(),
    mask: uuid(),
    gradient: uuid(),
  }

  const defs = () => (
    <React.Fragment>
      <pattern id={id.pattern} x="0" y="0" width="10" height="6" patternUnits="userSpaceOnUse" >
        <rect fill="#000" x="0" y="0" width="100%" height="100%" />
        <path fill="none"stroke="#fff"strokeWidth="1"d="M 0,0 c 2,0 3,2 5,2 c 2,0 3,-2 5,-2"transform="translate(0 1)" />
      </pattern>
      <mask id={id.mask} >
        <rect x="0" y="0" width="100%" height="100%" fill={`url(#${id.pattern})`} />
      </mask>
      <linearGradient id={id.gradient} x1="50%" y1="100%" x2="100%" y2="0%" >
        <stop stopColor="#ededee" offset="20%" stopOpacity="0.85" />
        <stop stopColor="#ededee" offset="50%" stopOpacity="0.35" />
      </linearGradient>
    </React.Fragment>
  )

  return (
    <Svg
      style={{
        position: 'absolute',
        userSelect: 'none',
        pointerEvents: 'none',
        width: 'calc(200px + 20vw)',
        height: 'calc(200px + 20vw)',
        right: 0,
        bottom: spacing(10),
        ...style,
      }}
      defs={defs}
      paths={[
        ['path', {...{fill: `url(#${id.gradient})`, mask: `url(#${id.mask})`, d: 'M 120,0 l 0,120 l -120,0 z'}, ...props}]
      ]}
    />
  )
}

function Graphics () {
  return (
    <React.Fragment>
      <Circle />
      <Squiggles />
      <Squiggles
        style={{
          transform: 'rotate(180deg)',
          top: spacing(4),
          left: spacing(4),
          bottom: 'auto',
          right: 'auto',
        }}
        fill={colors.brand[6]}
      />
    </React.Fragment>
  )
}

export default Graphics
