import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { spacing } from 'style/sizing'
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
  innerProps: {},
  childAspectRatioResolver: () => (1),
}

const Wrapper = styled(Box)`
  position: relative;
  z-index: 0;
  overflow: hidden;
  margin: ${spacing(-10)} 0;
`

const Scroller = styled.div`
  position: relative;
  z-index: 2;
  overflow: hidden;
  overflow-x: scroll;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
  }
`

const Inner = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  justify-content: space-between;
  padding-top: ${spacing(10)};
  padding-bottom: ${spacing(10)};
  box-sizing: content-box;
  flex: 1;
  pointer-events: none;

  & > * {
    box-sizing: border-box;
  }
`

const Row = ({
  children,
  items,
  childAspectRatioResolver: ar,
  height: _height,
  innerProps: {
    innerStyle,
    ...innerProps
  },
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
    style: {
      pointerEvents: 'all',
    },
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
          {...innerProps}
          style={{
            ...(innerStyle || {}),
            width: width,
            height: height,
            paddingLeft: isCentered ? paddingLeft : null,
            paddingRight: isCentered ? paddingRight : null,
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
