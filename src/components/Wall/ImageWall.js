import React from 'react'
import PropTypes from 'prop-types'
import _debounce from 'lodash/debounce'

import Grid, { StandardGrid } from 'components/Grid'

const propTypes = {
  items: PropTypes.array,
  columnWidth: PropTypes.number,
  gap: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ])
}

const defaultProps = {
  columnWidth: 300,
  gap: 18,
  minColumns: 2,
}

// masonry-styles image layout using css grid
// @see https://medium.com/@andybarefoot/a-masonry-style-layout-using-css-grid-8c663d355ebb
class ImageWall extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      containerWidth: null
    }
    this.windowExists = typeof window !== 'undefined'
    this.container = React.createRef()
  }

  componentDidMount () {
    if (this.windowExists && typeof this.container.current !== 'undefined') {
      this.setContainerWidth()
      this.debouncedSetContainerWidth = _debounce(this.setContainerWidth, 50, {trailing: true}).bind(this)
      window.addEventListener('resize', this.debouncedSetContainerWidth)
    }
  }

  componentWillUnmount () {
    if (this.windowExists) {
      window.removeEventListener('resize', this.debouncedSetContainerWidth)
    }
  }

  setContainerWidth = () => {
    const rect = this.container.current.getBoundingClientRect()
    this.setState(prevState => ({
      containerWidth: rect.width,
    }))
  }

  render () {

    const {
      childAspectRatioResolver,
      children,
      columnWidth,
      gap,
      items,
      minColumns,
      ...props
    } = this.props
    const { containerWidth } = this.state

    const rowBaseHeight = Math.ceil(columnWidth / 5)
    let columnWidthActual = columnWidth

    if (containerWidth > 0) {
      let columnCount = Math.floor(containerWidth / columnWidth)
      columnCount = Math.max(minColumns, (containerWidth % columnWidth > gap * columnCount - gap) ? columnCount : columnCount - 1)
      columnWidthActual = (containerWidth - gap * columnCount - gap) / columnCount
    }

    const Children = React.Children.map(children, (child, i) => {
      const itemHeight = columnWidthActual / childAspectRatioResolver(items[i])
      return React.cloneElement(child, {
        gridRowEnd: `span ${Math.ceil((itemHeight + gap) / (rowBaseHeight + gap))}`,
        marginBottom: '0',
      })
    })

    return (
      <StandardGrid
        {...props}
        >
        <Grid
          gridColumn="wideStart / wideEnd"
          gridRow="contentStart / contentEnd"
          gridTemplateColumns={`repeat(auto-fill, minmax(${columnWidthActual}px, 1fr))`}
          gridAutoRows={`${rowBaseHeight}px`}
          columnGap={`${gap}px`}
          rowGap={`${gap}px`}
          ref={this.container}
          >
          {Children}
        </Grid>
      </StandardGrid>
    )
  }
}

ImageWall.propTypes = propTypes

ImageWall.defaultProps = defaultProps

export default ImageWall