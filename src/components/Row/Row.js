import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import spacing from 'utils/spacing'
import { ease } from 'utils/constants'

const propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  aspectRatio: PropTypes.number,
  itemHeight: PropTypes.string,
  maxHeight: PropTypes.string,
  gutter: PropTypes.string,
  style: PropTypes.object,
}

const defaultProps = {
  aspectRatio: 1,
  itemHeight: '270px',
  maxHeight: null,
  gutter: spacing(2),
  style: {},
}

const Frame = styled(
  ({style, ...props}) => <div {...props} />
)`
  overflow: hidden;
  ${({style}) => style}
`

const Scroll = styled.div`
  width: 100%;
  margin-bottom: -${spacing(2)};
  padding-bottom: ${spacing(2)};
  overflow: hidden;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
`

const Overflow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  transition: min-width 175ms ${ease};
  width: 100%;

  ${({width}) => width && `
    min-width: ${width};
  `}

  ${({height}) => height && `
    height: ${height};
  `}
`

class Row extends React.Component {

  constructor (props) {
    super(props)
    this.setScrollRef = this.setScrollRef.bind(this)
  }

  componentDidUpdate () {
    if (this.scrollEl) {
      this.scrollEl.scrollLeft = 0
    }
  }

  setScrollRef (ref) {
    this.scrollEl = ref
  }

  render () {

    const {
      children,
      aspectRatio,
      itemHeight,
      maxHeight,
      gutter,
      style,
    } = this.props

    return (
      <Frame style={style} >
        <Scroll ref={this.setScrollRef} >
          <Overflow
            width={`calc(${aspectRatio} * ${itemHeight} + ${gutter})`}
            height={maxHeight}
          >
            {children}
          </Overflow>
        </Scroll>
      </Frame>
    )
  }
}

Row.propTypes = propTypes

Row.defaultProps = defaultProps

export default Row
