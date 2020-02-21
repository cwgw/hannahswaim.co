import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import css from '@styled-system/css';

import { space } from 'style/utils';
import theme from 'style/theme';

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

const Wrapper = styled(Box)(
  css({
    position: 'relative',
    zIndex: 0,
    overflow: 'hidden',
    margin: `-${space.xl}px 0`,
  })
);

const Scroller = styled('div')({
  position: 'relative',
  zIndex: 2,
  overflow: 'hidden',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  MsOverflowStyle: 'none',
  WebkitOverflowScrolling: 'touch',
  '&::-webkit-scrollbar': {
    width: '0 !important',
    height: '0 !important',
  },
});

const Inner = styled('ul')(
  css({
    position: 'relative',
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'stretch',
    paddingTop: 'xl',
    paddingBottom: 'xl',
    margin: 0,
    boxSizing: 'content-box',
    flex: 1,
    '& > *': {
      boxSizing: 'border-box',
    },
    '& > li': {
      listStyle: 'none',
    },
  })
);

const Row = ({
  children,
  gap: _gap,
  getAspectRatio: ar,
  height: _height,
  isCentered,
  items,
  ...props
}) => {
  let height = Array.isArray(_height) ? _height[0] : _height;
  height = height + 'px';

  const aspectRatio = items.reduce((sum, o) => sum + ar(o), 0);
  const gap = (theme.space[_gap] || 0) + 'px';

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
