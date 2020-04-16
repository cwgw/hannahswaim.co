import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

import { space } from 'style/theme';

import Grid from 'components/Grid';

const propTypes = {
  items: PropTypes.array,
  columnWidth: PropTypes.number,
  gridGap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

const defaultProps = {
  columnWidth: 320,
  gridGap: 'md',
  minColumns: 2,
};

// masonry-styles image layout using css grid
// @see https://medium.com/@andybarefoot/a-masonry-style-layout-using-css-grid-8c663d355ebb
const ImageWall = ({
  getAspectRatio,
  children,
  columnWidth,
  gridGap,
  items,
  minColumns,
  ...props
}) => {
  const [containerWidth, setContainerWidth] = React.useState(0);
  const [ref, setRef] = React.useState(null);

  React.useEffect(() => {
    if (ref) {
      const resizeHandler = debounce(
        () => {
          setContainerWidth(ref.clientWidth);
        },
        250,
        { trailing: true }
      );

      resizeHandler();
      window.addEventListener('resize', resizeHandler);

      return () => {
        window.removeEventListener('resize', resizeHandler);
      };
    }
  }, [ref]);

  const rowBaseHeight = 48;

  let col = columnWidth;
  let gap = space[gridGap];

  if (containerWidth > 0) {
    let colCount = Math.floor(containerWidth / columnWidth);
    colCount = Math.max(
      minColumns,
      containerWidth % columnWidth > gap * colCount - gap
        ? colCount
        : colCount - 1
    );
    col = (containerWidth - gap * colCount - gap) / colCount;
  }

  const Children = React.Children.map(children, (child, i) => {
    const itemHeight = col / getAspectRatio(items[i]);
    const rowEnd = Math.ceil((itemHeight + gap) / (rowBaseHeight + gap));
    return React.cloneElement(child, {
      rowEnd: `span ${rowEnd}`,
      marginBottom: '0',
    });
  });

  return (
    <Grid {...props}>
      <Grid
        col="bleedStart / bleedEnd"
        display="grid"
        gap={gap}
        gridAutoRows={`${rowBaseHeight}px`}
        gridTemplateColumns={`repeat(auto-fill, minmax(${col}px, 1fr))`}
        marginX="md"
        ref={setRef}
      >
        {Children}
      </Grid>
    </Grid>
  );
};

ImageWall.propTypes = propTypes;

ImageWall.defaultProps = defaultProps;

export default ImageWall;
