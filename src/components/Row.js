import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { spacing } from 'style/layout'
import Box from 'components/Box'

const propTypes = {
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  gap: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  childAspectRatioResolver: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  isCentered: PropTypes.bool,
}

const defaultProps = {
  height: 400,
  gap: null,
  isCentered: false,
}

const Wrapper = styled(Box)`
  overflow: hidden;
`

const Scroller = styled.div`
  margin-bottom: -${spacing(2)};
  padding-bottom: ${spacing(2)};
  overflow: hidden;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`

const Inner = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  justify-content: space-between;
  box-sizing: content-box;
  flex: 1;

  & > * {
    box-sizing: border-box;
  }
`

const Row = ({children, items, childAspectRatioResolver: ar, height: _height, padding, isCentered, gap: _gap, ...props}) => {

  const aspectRatio = items.reduce((sum,o) => sum + ar(o), 0)

  const gap = typeof _gap === 'number' ? spacing(_gap) : _gap
  const height = typeof _height === 'number' ? `${_height}px` : _height

  const Children = React.Children.map(children, (child,i) => React.cloneElement(child, {
    flex: ar(items[i]),
    marginRight: gap && i < items.length - 1 ? gap : null,
  }))

  const paddingValues = typeof padding === 'string' ? padding.split(/\s+/) : []

  const p = [
    paddingValues[0] || '0',
    paddingValues[1] || paddingValues[0] || (isCentered ? `calc(50% - (${ar(items[items.length - 1])} * ${height} / 2))` : '0'),
    paddingValues[2] || paddingValues[0] || '0',
    paddingValues[3] || paddingValues[1] || paddingValues[0] || (isCentered ? `calc(50% - (${ar(items[0])} * ${height} / 2))` : '0'),
  ].join(' ')

  const width = gap
    ? `calc(${aspectRatio} * ${height} + ${gap} * ${items.length - 1})`
    : `calc(${aspectRatio} * ${height})`

  return (
    <Wrapper {...props} >
      <Scroller>
        <Inner
          style={{
            width: width,
            height: height,
            padding: p,
          }}
          >
          {Children}
        </Inner>
      </Scroller>
    </Wrapper>
  )
}

Row.propTypes = propTypes

Row.defaultProps = defaultProps

export default Row
