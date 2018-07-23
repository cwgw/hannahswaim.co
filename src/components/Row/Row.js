import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import spacing from 'utils/spacing'
import { ease } from 'utils/constants'

const propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  overflow: PropTypes.bool,
  aspectRatio: PropTypes.number,
  itemHeight: PropTypes.string,
  maxHeight: PropTypes.string,
  gutter: PropTypes.string,
  style: PropTypes.object,
}

const defaultProps = {
  overflow: false,
  aspectRatio: 1,
  itemHeight: '270px',
  maxHeight: null,
  gutter: spacing(2),
  style: {},
}

const Default = styled.div`
  display: flex;
  flex-flow: row nowrap;
`

const Frame = styled.div`
  overflow: hidden;
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

  ${({aspectRatio, gutter, itemHeight}) => aspectRatio && `
    min-width: calc(${itemHeight} * ${aspectRatio} + ${gutter});
  `}

  ${({maxHeight}) => maxHeight && `
    height: ${maxHeight};
  `}
`

function Row (props) {

  const {
    children,
    overflow,
    aspectRatio,
    itemHeight,
    maxHeight,
    gutter,
    style,
  } = props

  if (overflow) {

    return (
      <Frame style={style} >
        <Scroll>
          <Overflow
            aspectRatio={aspectRatio}
            itemHeight={itemHeight}
            maxHeight={maxHeight}
            gutter={gutter}
          >
            {children}
          </Overflow>
        </Scroll>
      </Frame>
    )
  }

  return (
    <Default>
      {children}
    </Default>
  )
}

Row.propTypes = propTypes

Row.defaultProps = defaultProps

export default Row
