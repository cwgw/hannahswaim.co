import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { px } from 'style/helpers';
import spacing from 'style/spacing';

import Box from 'components/Box';

const propTypes = {
  gap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  getAspectRatio: PropTypes.func,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  isCentered: PropTypes.bool,
  items: PropTypes.array.isRequired,
  more: PropTypes.string,
};

const defaultProps = {
  gap: null,
  getAspectRatio: getAspectRatio,
  height: 180,
  isCentered: false,
  more: 'scroll →',
};

function getAspectRatio(o) {
  if (o.aspectRatio) return o.aspectRatio;
  if (o.fluid) return o.fluid.aspectRatio || 1;
  if (o.fixed) {
    return o.fixed.width / o.fixed.height;
  }
  return 1;
}

const Wrapper = styled(Box)`
  position: relative;
  z-index: 0;
  overflow: hidden;
  margin: -${spacing('xl')} 0;
`;

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
`;

const Inner = styled.ul`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  padding-top: ${spacing('xl')};
  padding-bottom: ${spacing('xl')};
  margin: 0;
  box-sizing: content-box;
  flex: 1;

  & > * {
    box-sizing: border-box;
  }

  & > li {
    list-style: none;
  }
`;

const Row = ({
  children,
  gap: _gap,
  getAspectRatio: ar,
  height: _height,
  isCentered,
  items,
  ...props
}) => {
  const height = Array.isArray(_height) ? px(_height[0]) : px(_height);

  const aspectRatio = items.reduce((sum, o) => sum + ar(o), 0);
  const gap = spacing(_gap) || 0;

  const Children = React.Children.map(children, (child, i) =>
    React.cloneElement(child, {
      flex: items.length > 1 ? `${ar(items[i])}` : 1,
      marginRight: gap && i < items.length - 1 ? gap : null,
    })
  );

  const paddingLeft = `calc(50% - (${ar(items[0])} * ${height} / 2))`;
  const paddingRight = `calc(50% - (${ar(
    items[items.length - 1]
  )} * ${height} / 2))`;

  const width = gap
    ? `calc(${aspectRatio} * ${height} + ${gap} * ${items.length - 1})`
    : `calc(${aspectRatio} * ${height})`;

  return (
    <Wrapper {...props}>
      <Scroller>
        <Inner
          style={{
            width,
            height,
            paddingLeft: isCentered ? paddingLeft : 0,
            paddingRight: isCentered ? paddingRight : null,
          }}
        >
          {Children}
        </Inner>
      </Scroller>
    </Wrapper>
  );
};

Row.propTypes = propTypes;

Row.defaultProps = defaultProps;

export default Row;
