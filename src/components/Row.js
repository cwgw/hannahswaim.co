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
  childAspectRatioResolver: PropTypes.func,
  items: PropTypes.array.isRequired,
  isCentered: PropTypes.bool,
}

const defaultProps = {
  height: 400,
  gap: null,
  isCentered: false,
  childAspectRatioResolver: () => (1),
}

const Wrapper = styled(Box)`
  margin: -${spacing('xxl')} 0;
`

const Scroller = styled.div`
  padding: ${spacing('xxl')} 0;

  overflow: visible;
  overflow-x: auto;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
  }
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

const Row = ({
  children,
  items,
  childAspectRatioResolver: ar,
  height: _height,
  padding,
  isCentered,
  gap: _gap,
  ...props
}) => {
  const aspectRatio = items.reduce((sum, o) => (sum + ar(o)), 0);

  const gap = spacing(_gap) || 0;
  const height = typeof _height === 'number' ? `${_height}px` : _height;

  const Children = React.Children.map(children, (child, i) => React.cloneElement(child, {
    flex: `${ar(items[i])}`,
    marginRight: gap && i < items.length - 1 ? gap : null,
  }));

  const paddingLeft = `calc(50% - (${ar(items[0])} * ${height} / 2))`;
  const paddingRight = `calc(50% - (${ar(items[items.length - 1])} * ${height} / 2))`;

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
            padding: isCentered ? `0 ${paddingRight} 0 ${paddingLeft}` : null,
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
