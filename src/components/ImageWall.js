import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import isNil from 'lodash/isNil';

import { spacing } from 'style/sizing';
import { px, pxValue } from 'style/helpers';

import { Grid, StandardGrid } from 'components/Grid';

const propTypes = {
  items: PropTypes.array,
  columnWidth: PropTypes.number,
  gap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

const defaultProps = {
  columnWidth: 320,
  gap: 'md',
  minColumns: 2,
};

// masonry-styles image layout using css grid
// @see https://medium.com/@andybarefoot/a-masonry-style-layout-using-css-grid-8c663d355ebb
const ImageWall = ({
  childAspectRatioResolver,
  children,
  columnWidth,
  gap,
  items,
  minColumns,
  ...props
}) => {
  const [containerWidth, setContainerWidth] = React.useState(0);
  const container = React.useRef();

  const setState = React.useCallback(() => {
    if (isNil(container.current)) return;
    const rect = container.current.getBoundingClientRect();
    setContainerWidth(() => rect.width);
  }, [container]);

  React.useEffect(() => {
    if (window === 'undefined') return;
    setState();
    const debouncedSetState = debounce(setState, 50, { trailing: true });
    window.addEventListener('resize', debouncedSetState);
    return () => {
      window.removeEventListener('resize', debouncedSetState);
    };
  }, [container]);

  const rowBaseHeight = Math.ceil(columnWidth / 5);
  let columnWidthActual = columnWidth;
  let gapActual = pxValue(spacing(gap));

  if (containerWidth > 0) {
    let columnCount = Math.floor(containerWidth / columnWidth);
    columnCount = Math.max(
      minColumns,
      containerWidth % columnWidth > gapActual * columnCount - gapActual
        ? columnCount
        : columnCount - 1
    );
    columnWidthActual =
      (containerWidth - gapActual * columnCount - gapActual) / columnCount;
  }

  const Children = React.Children.map(children, (child, i) => {
    const itemHeight = columnWidthActual / childAspectRatioResolver(items[i]);
    return React.cloneElement(child, {
      gridRowEnd: `span ${Math.ceil(
        (itemHeight + gapActual) / (rowBaseHeight + gapActual)
      )}`,
      marginBottom: '0',
    });
  });

  return (
    <StandardGrid {...props}>
      <Grid
        gap={gap}
        gridAutoRows={`${rowBaseHeight}px`}
        gridColumn="bleedStart / bleedEnd"
        gridTemplateColumns={`repeat(auto-fill, minmax(${columnWidthActual}px, 1fr))`}
        marginX="md"
        ref={container}
      >
        {Children}
      </Grid>
    </StandardGrid>
  );
};

ImageWall.propTypes = propTypes;

ImageWall.defaultProps = defaultProps;

export default ImageWall;
