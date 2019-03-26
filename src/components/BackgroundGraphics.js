import React from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'

import useScrollPosition from 'hooks/useScrollPosition'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { colors } from 'style/constants'

const defaultProps = {
  speed: 0.25,
  colors: [
    colors.brand[5],
    colors.brand[4]
  ],
}

const Wrapper = styled.div`
  user-select: none;
  pointer-events: none;
`

const AnimatedContainer = animated(styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform-origin: center top;
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

  const [ { y }, setY ] = useSpring(() => ({ y: 0 }));
  const ref = React.useRef(null);

  useIntersectionObserver(({offset}) => {
    // console.log(offset)
    setY({ y: offset });
  }, ref);

  let y1 = y.interpolate(y => `translate3d(0, ${(y - 0.5) * 30}%, 0) scale3d(1, 1, 1)`);
  let y2 = y.interpolate(y => `translate3d(0, ${(y - 0.5) * 60}%, 0) scale3d(1, 1, 1)`);
  let o1 = y.interpolate([0, 1], [1, 0]);
  let o2 = y.interpolate([0, 0.5, 1], [1, 1, 0]);

  return (
    <Wrapper>
      <Svg preserveAspectRatio="none" ref={ref} >
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
            cx="30%"
            r="105%"
            fill={color1}
          />
          <circle
            cx="20%"
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
            cx="25%"
            r="100%"
            fill="url(#squiggle-1)"
          />
        </Svg>
      </AnimatedContainer>
    </Wrapper>
  )
}

Background.defaultProps = defaultProps

export default Background
