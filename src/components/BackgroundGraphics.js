import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

import useParallax from 'hooks/useParallax';
import { colors } from 'style/constants';

const defaultProps = {
  colors: [colors.brand[6], colors.brand[5]],
};

const Wrapper = styled.div`
  user-select: none;
  pointer-events: none;
`;

const AnimatedContainer = animated(styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  will-change: transform, opacity;
`);

const Svg = styled.svg`
  position: absolute;
  display: block;
  width: calc(200px + 30vw);
  height: 100%;
  overflow: visible;
`;

const Background = ({ colors: [color1, color2, color3] }) => {
  const [{ y }, setY] = useSpring(() => ({
    y: 0,
    config: {
      precision: 0.1,
    },
  }));

  const ref = useParallax(y => {
    setY({ y: y * 100 });
  });

  let y1 = y.interpolate(y => `matrix(1, 0, 0, 1, 0, ${y * 2})`);
  let y2 = y.interpolate(y => `matrix(1, 0, 0, 1, 0, ${y * 3})`);
  let opacity = y.interpolate([0, 50, 100], [1, 1, 0]);

  return (
    <Wrapper>
      <Svg preserveAspectRatio="none" aria-hidden="true" ref={ref}>
        <defs>
          <pattern
            id="squiggle-1"
            width="48"
            height="6"
            patternUnits="userSpaceOnUse"
          >
            <path
              fill="none"
              stroke={color2 || color1}
              strokeWidth="1"
              d="M 0,0 C 4 0, 4 1, 8 1 S 12 0, 16 0"
              transform="translate(0 1) scale(3)"
              vectorEffect="non-scaling-stroke"
            />
          </pattern>
          <pattern
            id="squiggle-2"
            width="48"
            height="6"
            patternUnits="userSpaceOnUse"
            patternTransform="skewX(-12) skewY(4)"
          >
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
          opacity,
          zIndex: -2,
        }}
      >
        <Svg>
          <circle cx="30%" r="105%" fill={color1} />
          <circle cx="20%" r="100%" fill="url(#squiggle-2)" />
        </Svg>
      </AnimatedContainer>
      <AnimatedContainer
        style={{
          transform: y2,
          opacity,
          zIndex: -1,
        }}
      >
        <Svg>
          <circle cx="25%" r="100%" fill="url(#squiggle-1)" />
        </Svg>
      </AnimatedContainer>
    </Wrapper>
  );
};

Background.defaultProps = defaultProps;

export default Background;
