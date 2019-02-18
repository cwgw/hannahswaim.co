import React from 'react'
import styled from 'styled-components'
import { animated } from 'react-spring'

import useScrollPosition from 'hooks/useScrollPosition'
import { colors } from 'style/constants'

const defaultProps = {
  speed: 0.5,
  colors: [
    colors.brand[5],
    colors.brand[4]
  ],
}

const AnimatedContainer = animated(styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform-origin: center top;
  user-select: none;
  pointer-events: none;
`)

const Svg = styled.svg.attrs({
  preserveAspectRatio: 'none',
  'aria-hidden': true,
})`
  position: absolute;
  display: block;
  width: calc(200px + 30vw);
  height: 100%;
  overflow: visible;
`

const clamp = (
  num,
  min = Number.NEGATIVE_INFINITY,
  max = Number.POSITIVE_INFINITY
) => {
  return num <= min
    ? min
    : num >= max
      ? max
      : num
};

const Background = ({
  speed,
  colors: [
    color1,
    color2,
    color3
  ],
}) => {

  let y = useScrollPosition();
  let y1 = y.interpolate(y => `translate3d(0px, ${clamp(y * speed, -200, 600)}px, 0px) scale3d(1, 1, 1)`);
  let y2 = y.interpolate(y => `translate3d(0px, ${clamp(y * speed * 0.9, -200, 600)}px, 0px) scale3d(1, 1, 1)`);
  let o1 = y.interpolate(o => clamp(1 - (o / 300), 0, 1));
  let o2 = y.interpolate(o => clamp(1 - (o / 1600), 0, 1));

  return (
    <React.Fragment>
      <Svg preserveAspectRatio="none" >
        <defs>
          <pattern id="squiggle-1" width="48" height="6" patternUnits="userSpaceOnUse" >
            <path
              fill="none"
              stroke={color2 || color1}
              strokeWidth="1"
              d="M 0,0 C 4 0, 4 1, 8 1 S 12 0, 16 0"
              transform="translate(0 1) scale(3)"
              vectorEffect="non-scaling-stroke"
            />
          </pattern>
          <pattern id="squiggle-2" width="48" height="6" patternUnits="userSpaceOnUse" patternTransform="skewX(-12) skewY(4)" >
            <path
              fill="none"
              stroke={color3 || color2 || color1}
              strokeWidth="1"
              d="M 0,0 C 4 0, 4 1, 8 1 S 12 0, 16 0"
              transform="translate(0 1) scale(3)"
              vectorEffect="non-scaling-stroke"
            />
          </pattern>
        </defs>
      </Svg>
      <AnimatedContainer
        style={{
          transform: y1,
          opacity: o1,
          zIndex: -2
        }}
        >
        <Svg>
          <circle
            cx="25%"
            r="110%"
            fill={color1}
          />
          <circle
            cx="25%"
            r="100%"
            fill="url(#squiggle-2)"
          />
        </Svg>
      </AnimatedContainer>
      <AnimatedContainer
        style={{
          transform: y2,
          opacity: o2,
          zIndex: -1
        }}
        >
        <Svg>
          <circle
            cx="20%"
            r="100%"
            fill="url(#squiggle-1)"
          />
        </Svg>
      </AnimatedContainer>
    </React.Fragment>
  )
}

Background.defaultProps = defaultProps

export default Background
