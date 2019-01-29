import React from 'react'
import _debounce from 'lodash/debounce'
import _isEqual from 'lodash/isEqual'

import { breakpoints } from 'style/constants'

const UIContext = React.createContext({})

class Provider extends React.Component {
  constructor (props) {
    super(props)
    this.isWindowDefined = typeof window !== 'undefined'
    this.debouncedSetViewportWidth = _debounce(this.setViewportWidth, 50, {trailing: true}).bind(this)
    this.state = {
      isViewport: this.getViewportWidth(),
    }
  }

  componentDidMount () {
    if (this.isWindowDefined) {
      window.addEventListener('resize', this.debouncedSetViewportWidth)
      this.setViewportWidth()
    }
  }

  componentWillUnmount () {
    if (this.isWindowDefined) {
      window.removeEventListener('resize', this.debouncedSetViewportWidth)
    }
  }

  getViewportWidth = () => {
    const viewportWidth = this.isWindowDefined ? window.innerWidth : 0
    const state = {}
    for (const [key, value] of breakpoints.entries()) {
      state[key] = value < viewportWidth
    }
    return state
  }

  setViewportWidth = () => {
    const state = this.getViewportWidth()
    if(!_isEqual(state, this.state.isViewport)) {
      this.setState(prevState => ({
        isViewport: state,
      }))
    }
  }

  render () {
    return (
      <UIContext.Provider
        value={{
          ...this.state
        }}
        >
        {this.props.children}
      </UIContext.Provider>
    )
  }
}

const { Consumer } = UIContext

const withUIProps = (Component) => (props) => (
  <UIContext.Consumer>
    {state => (
      <Component
        {...state}
        {...props}
      />
    )}
  </UIContext.Consumer>
)

export {
  Consumer,
  Provider,
  withUIProps
}
