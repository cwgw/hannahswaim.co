import React from 'react'
import styled from 'styled-components'

import { colors } from 'utils/constants'

import squiggle from 'images/squiggles.svg'

const Graphic = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  // background-image: url(${squiggle}),
  //                   linear-gradient(${colors.brand[4]} 18rem, transparent 36rem);
  // background-size: 100vw 100vh;
  // background-repeat: no-repeat;
  // background-attachment: fixed;
  background-color: ${colors.gray[6]};
`

const Svg = styled.svg`
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
`

const Symbol = styled('use')`
`

const Background = (props) => {
  const scale = 70
  return (
    <React.Fragment>
      <Graphic />
      <Svg preserveAspectRatio="none" >
        <defs>
          <pattern id="squiggle-1" width="48" height="5" patternUnits="userSpaceOnUse" >
            <path fill="none" stroke="#000" strokeWidth="1" d="M 0,0 C 4 0, 4 1, 8 1 S 12 0, 16 0" transform="translate(0 1) scale(3)" vectorEffect="non-scaling-stroke" ></path>
          </pattern>
          <pattern id="squiggle-2" width="48" height="5" patternUnits="userSpaceOnUse" patternTransform="skewX(-12) skewY(4)" >
            <rect width="100%" height="100%" fill="url(#squiggle-1)" />
          </pattern>
          <mask id="squiggle-mask" >
            <g transform={`scale(${1 / scale})`} >
              <rect width="100%" height="100%" fill="#fff" ></rect>
              <rect width="100%" height="100%" fill="url(#squiggle-1)" ></rect>
              <rect width="100%" height="100%" fill="url(#squiggle-2)" ></rect>
            </g>
          </mask>
          <path id="diamond-1" d="M 0,0 1,1 1,3 0,2 z" fill={colors.brand[3]} mask="url(#squiggle-mask)" />
          <path id="diamond-2" d="M 0,1 1,0 1,2 0,3 z" fill={colors.brand[4]} mask="url(#squiggle-mask)" />
          <path id="diamond-3" d="M 0,1 1,0 3,0 2,1 z" fill={colors.brand[5]} mask="url(#squiggle-mask)" />
          <path id="diamond-4" d="M 0,0 2,0 3,1 1,1 z" fill={colors.brand[6]} mask="url(#squiggle-mask)" />
          <path id="triangle-1" d="M 0,0 2,0 0,2 z" fill={colors.gray[3]} mask="url(#squiggle-mask)" />
          <path id="triangle-2" d="M 2,0 2,2 0,2 z" fill={colors.gray[5]} mask="url(#squiggle-mask)" />
          <path id="triangle-3" d="M 0,0 2,0 2,2 z" fill={colors.gray[4]} mask="url(#squiggle-mask)" />
          <path id="triangle-4" d="M 0,0 2,2 0,2 z" fill={colors.gray[2]} mask="url(#squiggle-mask)" />
          <symbol id="star" >
            <Symbol href="#diamond-1" transform="translate(2 1)" />
            <Symbol href="#diamond-2" transform="translate(3 1)" />
            <Symbol href="#diamond-3" transform="translate(3 3)" />
            <Symbol href="#diamond-4" transform="translate(3 4)" />
            <Symbol href="#diamond-1" transform="translate(3 4)" />
            <Symbol href="#diamond-2" transform="translate(2 4)" />
            <Symbol href="#diamond-3" transform="translate(0 4)" />
            <Symbol href="#diamond-4" transform="translate(0 3)" />
            <Symbol href="#triangle-1" transform="translate(3 0)" />
            <Symbol href="#triangle-1" transform="translate(4 1)" />
            <Symbol href="#triangle-2" transform="translate(4 1)" />
            <Symbol href="#triangle-2" transform="translate(5 2)" />
            <Symbol href="#triangle-3" transform="translate(5 4)" />
            <Symbol href="#triangle-3" transform="translate(4 5)" />
            <Symbol href="#triangle-4" transform="translate(4 5)" />
            <Symbol href="#triangle-4" transform="translate(3 6)" />
          </symbol>
        </defs>
        <g transform={`scale(${scale})`} >
          <Symbol href="#star" transform="translate(-3 0)" />
          <Symbol href="#star" transform="translate(1 -4)" />
          <Symbol href="#star" transform="translate(1 -4)" />
        </g>
      </Svg>
    </React.Fragment>
  )
}
//

export default Background
