import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import isNil from 'lodash/isNil';

import { spacing } from 'style/sizing';
import { px } from 'style/helpers';

import Box from 'components/Box';

const propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  gap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  getAspectRatio: PropTypes.func,
  items: PropTypes.array.isRequired,
  isCentered: PropTypes.bool,
  more: PropTypes.string,
};

const defaultProps = {
  as: null,
  gap: null,
  getAspectRatio: getAspectRatio,
  height: 180,
  isCentered: false,
  innerProps: {
    marginX: 'md',
  },
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
  margin: -${spacing(9)} 0;
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

const Inner = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  padding-top: ${spacing(9)};
  padding-bottom: ${spacing(9)};
  box-sizing: content-box;
  flex: 1;

  & > * {
    box-sizing: border-box;
  }
`;

const Row = ({
  children,
  items,
  getAspectRatio: ar,
  height: _height,
  innerProps: { innerStyle, ...innerProps },
  isCentered,
  gap: _gap,
  ...props
}) => {
  const aspectRatio = items.reduce((sum, o) => sum + ar(o), 0);

  const [parentHeight, setParentHeight] = React.useState(0);

  const ref = React.useRef();

  const setState = React.useCallback(() => {
    if (isNil(ref.current)) {
      return;
    }
    const rect = ref.current.parentNode.getBoundingClientRect();
    setParentHeight(() => rect.height);
  }, [ref]);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    setState();
    const debouncedSetState = debounce(setState, 50, { trailing: true });
    window.addEventListener('resize', debouncedSetState);
    return () => {
      window.removeEventListener('resize', debouncedSetState);
    };
  }, [ref]);

  const gap = spacing(_gap) || 0;
  const height =
    isNil(_height) || _height === 'auto' ? px(parentHeight) : px(_height);

  const childCount = React.Children.count(children);
  const Children = React.Children.map(children, (child, i) =>
    React.cloneElement(child, {
      flex: childCount > 1 ? `${ar(items[i])}` : 1,
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
    <Wrapper ref={ref} {...props}>
      <Scroller>
        <Inner
          {...innerProps}
          style={{
            ...(innerStyle || {}),
            width,
            height,
            paddingLeft: isCentered ? paddingLeft : null,
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
