import React from 'react'
import _debounce from 'lodash/debounce'

import { navBreakpoint } from 'utils/constants'

const ViewportContext = React.createContext({})

export const { Consumer } = ViewportContext

export class Provider extends React.Component {

  constructor (props) {
    super(props)

    let state = {
      dim: {
        width: 0,
        height: 0,
      },
      isNavOpen: false,
    }

    this.debouncedSetViewportDimensions = _debounce(this.setViewportDimensions, 50, {trailing: true})

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.debouncedSetViewportDimensions)
      state.dim = this.getViewportDimensions()
    }

    this.state = state
  }

  setViewportDimensions = () => {
    const dim = this.getViewportDimensions()
    this.setState(state => ({
      dim: dim,
      isNavOpen: dim.width >= navBreakpoint ? false : state.isNavOpen,
    }))
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.debouncedSetViewportDimensions)
  }

  getViewportDimensions = () => ({
    width: window.innerWidth,
    height: window.innerHeight
  })

  toggleNav = () => {
    this.setState(state => ({
      isNavOpen: !state.isNavOpen,
    }))
  }

  closeNav = () => {
    this.setState({
      isNavOpen: false,
    })
  }

  render () {
    return (
      <ViewportContext.Provider
        value={{
          toggleNav: this.toggleNav,
          closeNav: this.closeNav,
          ...this.state
        }}
      >
        {this.props.children}
      </ViewportContext.Provider>
    )
  }
}

export function withViewportProps (Component) {
  return function ViewportDimensionsHOC (props) {
    return (
      <ViewportContext.Consumer>
        {state => (
          <Component
            viewportDimensions={state.dim}
            isNavOpen={state.isNavOpen}
            toggleNav={state.toggleNav}
            closeNav={state.closeNav}
            {...props}
          />
        )}
      </ViewportContext.Consumer>
    )
  }
}

export default {
  Consumer,
  Provider
}
