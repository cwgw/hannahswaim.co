import React from 'react'
import styled from 'styled-components'
import { Controller, animated } from 'react-spring'

import { colors } from 'utils/constants'

const defaultProps = {
  speed: -0.3,
  colors: [
    colors.brand[5],
    colors.brand[4]
  ],
}

const Graphic = animated(styled.div`
  position: absolute;
  z-index: 0;
  width: 100vw;
  height: 100vh;
`)

const Svg = styled.svg`
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: visible;
`

const AnimatedCircle = animated('circle')

const AnimatedGroup = animated('g')

const clamp = (num, min, max) => num <= min ? min : num >= max ? max : num

class Background extends React.Component {

  constructor (props) {
    super(props)
    this.controller = new Controller({
      y1: 0,
      y2: 0,
      o1: 1,
      o2: 1,
    })
    this.isWindowDefined = typeof window !== 'undefined'
    this.isBusy = false
  }

  componentDidMount () {
    if (this.isWindowDefined) {
      window.addEventListener('scroll', this.handleScrollChange)
      this.handleScrollChange()
    }
  }

  componentWillUnmount () {
    if (this.isWindowDefined) {
      window.removeEventListener('scroll', this.handleScrollChange)
      if (this.RAFID) {
        window.cancelAnimationFrame(this.RAFID)
      }
    }
  }

  handleScrollChange = () => {
    if (!this.isBusy) {
      this.isBusy = true
      this.requestAnimationFrame(() => {
        this.controller.update(this.getAnimationValues())
        this.isBusy = false
      })
    }
  }

  getAnimationValues = () => {
    const scroll = window.pageYOffset
    const speed = this.props.speed
    return {
      y1: Math.max(-900, parseFloat(-(scroll * speed))),
      y2: Math.max(-900, parseFloat(-(scroll * speed * 0.9))),
      o1: clamp(1 - (scroll / 500), 0, 1),
      o2: clamp(1 - (scroll / 1200), 0, 1),
    }
  }

  requestAnimationFrame = (cb) => {
    if (this.isWindowDefined) {
      this.RAFID = window.requestAnimationFrame(cb)
    }
  }

  render () {

    const {
      colors: [color1, color2]
    } = this.props

    const {
      y1,
      y2,
      o1,
      o2,
    } = this.controller.interpolations

    return (
      <Graphic>
        <Svg preserveAspectRatio="none" >
          <defs>
            <pattern id="squiggle-1" width="48" height="6" patternUnits="userSpaceOnUse" >
              <path fill="none" stroke={color2} strokeWidth="1" d="M 0,0 C 4 0, 4 1, 8 1 S 12 0, 16 0" transform="translate(0 1) scale(3)" vectorEffect="non-scaling-stroke" />
            </pattern>
            <pattern id="squiggle-2" width="48" height="6" patternUnits="userSpaceOnUse" patternTransform="skewX(-12) skewY(4)" >
              <rect width="100%" height="100%" fill="url(#squiggle-1)" />
            </pattern>
            <mask id="squiggle-mask" >
              <rect width="100%" height="100%" fill="#000" />
              <rect width="100%" height="100%" fill="url(#squiggle-1)" />
              <rect width="100%" height="100%" fill="url(#squiggle-2)" />
            </mask>
          </defs>
          <AnimatedGroup
            style={{
              willChange: 'transform',
              transform: y1.interpolate(y => `translate3d(0,${y}px,0)`),
              opacity: o1,
            }}
            >
            <AnimatedCircle
              cx="25%"
              cy="0"
              r="65%"
              fill={color1}
            />
            <AnimatedCircle
              cx="18%"
              cy="20"
              r="60%"
              fill="url(#squiggle-1)"
            />
          </AnimatedGroup>
          <AnimatedCircle
            cx="16%"
            cy="20"
            r="60%"
            fill="url(#squiggle-2)"
            style={{
              willChange: 'transform',
              transform: y2.interpolate(y => `translate3d(0,${y}px,0)`),
              opacity: o2,
            }}
          />
        </Svg>
      </Graphic>
    )
  }
}

Background.defaultProps = defaultProps

export default Background
