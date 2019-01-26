import React from 'react'
import _debounce from 'lodash/debounce'

import { navBreakpoint } from 'utils/constants'

const UIContext = React.createContext({})

export const { Consumer } = UIContext

export class Provider extends React.Component {

  constructor (props) {
    super(props)

    this.debouncedSetViewportDimensions = _debounce(this.setViewportDimensions, 50, {trailing: true})
    this.isWindowDefined = typeof window !== 'undefined'

    if (this.isWindowDefined) {
      const dimensions = this.getViewportDimensions()
      this.state = {
        dimensions: dimensions,
        isNavOpen: false,
        isMobile: dimensions.width < navBreakpoint,
      }
    } else {
      this.state = {
        dimensions: {
          width: 0,
          height: 0,
        },
        isNavOpen: false,
        isMobile: true,
      }
    }
  }

  componentDidMount () {
    if (this.isWindowDefined) {
      window.addEventListener('resize', this.debouncedSetViewportDimensions)
      this.setViewportDimensions()
    }
  }

  componentWillUnmount () {
    if (this.isWindowDefined) {
      window.removeEventListener('resize', this.debouncedSetViewportDimensions)
    }
  }

  getViewportDimensions = () => ({
    width: window.innerWidth,
    height: window.innerHeight
  })

  setViewportDimensions = () => {
    const dimensions = this.getViewportDimensions()
    this.setState(state => ({
      dimensions: dimensions,
      isNavOpen: dimensions.width >= navBreakpoint ? false : state.isNavOpen,
      isMobile: dimensions.width < navBreakpoint,
    }))
  }

  toggleNav = () => {
    this.setState(state => ({
      isNavOpen: !state.isNavOpen,
    }))
  }

  closeNav = () => {
    if (this.state.isNavOpen) {
      this.setState({
        isNavOpen: false,
      })
    }
  }

  render () {
    return (
      <UIContext.Provider
        value={{
          toggleNav: this.toggleNav,
          closeNav: this.closeNav,
          ...this.state
        }}
      >
        {this.props.children}
      </UIContext.Provider>
    )
  }
}

export const withUIProps = (Component) => (props) => (
  <UIContext.Consumer>
    {({dimensions, ...state}) => (
      <Component
        viewportDimensions={dimensions}
        {...state}
        {...props}
      />
    )}
  </UIContext.Consumer>
)

export default {
  Consumer,
  Provider
}
