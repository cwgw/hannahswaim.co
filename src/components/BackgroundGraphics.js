import React from 'react'
import styled from 'styled-components'
import { Controller, animated } from 'react-spring'

import { colors } from 'style/constants'

const defaultProps = {
  speed: -0.2,
  colors: [
    colors.brand[5],
    colors.brand[4],
    colors.brand[4]
  ],
}

const Graphic = styled.div`
  position: absolute;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  user-select: none;
  pointer-events: none;
`

const Svg = styled.svg`
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
`

const AnimatedContainer = animated(styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform-origin: center top;
`)

const clamp = (num, min, max) => num <= min ? min : num >= max ? max : num

class Background extends React.Component {

  constructor (props) {
    super(props)
    this.controller = new Controller({
      to: {
        y1: 0,
        y2: 0,
        o1: 1,
        o2: 1,
      },
      config: {
        tension: 400,
        friction: 18,
      },
    })
    this.isWindowDefined = typeof window !== 'undefined'
    this.isBusy = false
  }

  componentDidMount () {
    if (this.isWindowDefined) {
      window.addEventListener('scroll', this.handleScrollChange)
      this.handleScrollChange()
      this.controller.start()
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
        this.controller.update({
          to: this.getAnimationValues()
        })
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
      colors: [color1, color2, color3]
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
              <path fill="none" stroke={color3} strokeWidth="1" d="M 0,0 C 4 0, 4 1, 8 1 S 12 0, 16 0" transform="translate(0 1) scale(3)" vectorEffect="non-scaling-stroke" />
            </pattern>
          </defs>
        </Svg>
        <AnimatedContainer
          style={{
            transform: y1.interpolate(y => `translate3d(0px, ${y}px, 0px) scale3d(1, 1, 1)`),
            opacity: o1,
          }}
          >
          <Svg preserveAspectRatio="none" >
            <circle
              cx="25%"
              cy="0"
              r="65%"
              fill={color1}
            />
            <circle
              cx="16%"
              cy="20"
              r="60%"
              fill="url(#squiggle-2)"
            />
          </Svg>
        </AnimatedContainer>
        <AnimatedContainer
          style={{
            transform: y2.interpolate(y => `translate3d(0px, ${y}px, 0px) scale3d(1, 1, 1)`),
            opacity: o2,
          }}
          >
          <Svg preserveAspectRatio="none" >
            <circle
              cx="18%"
              cy="20"
              r="60%"
              fill="url(#squiggle-1)"
            />
          </Svg>
        </AnimatedContainer>
      </Graphic>
    )
  }
}

Background.defaultProps = defaultProps

export default Background
