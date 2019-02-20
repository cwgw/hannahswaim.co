import React, { useEffect, useState } from 'react'
import _debounce from 'lodash/debounce'

import { breakpoints } from 'style/constants'

const UIContext = React.createContext({})

function getViewportWidth() {
  const viewportWidth = typeof window === 'undefined' ? 0 : window.innerWidth;
  let state = {};
  for (let [key, value] of breakpoints.entries()) {
    state[key] = value < viewportWidth
  }
  return state
}

function Provider({ children }) {
  const isWindowDefined = typeof window !== 'undefined'
  const [ {isViewport}, set ] = useState({isViewport: getViewportWidth()})

  const setViewportWidth = _debounce(() => {
    set({isViewport: getViewportWidth()});
  }, 50, {trailing: true});

  useEffect(() => {
    if (isWindowDefined) {
      window.addEventListener('resize', setViewportWidth);
    }

    return () => {
      if (isWindowDefined) {
        window.removeEventListener('resize', setViewportWidth);
      }
    }
  });

  return (
    <UIContext.Provider value={{ isViewport }} >{children}</UIContext.Provider>
  )
}

const Consumer = UIContext.Consumer

export {
  UIContext as default,
  UIContext,
  Consumer,
  Provider
}
