import React from 'react'
import _debounce from 'lodash/debounce'

import { breakpoints } from 'style/constants'

const UIContext = React.createContext({});

const isWindowDefined = () => (typeof window !== 'undefined');

function getViewportWidth() {
  const viewportWidth = isWindowDefined() ? window.innerWidth : 0;
  let state = {};
  for (let [key, value] of breakpoints.entries()) {
    state[key] = value < viewportWidth
  }
  return state
}

function Provider({ children }) {
  const [ isViewport, setViewportState ] = React.useState(() => getViewportWidth())
  const isResizeListenerAdded = React.useRef(false);

  const handleResize = _debounce(() => {
    setViewportState(getViewportWidth());
  }, 50, {trailing: true});

  React.useEffect(() => {
    if (isWindowDefined() && !isResizeListenerAdded.current) {
      window.addEventListener('resize', handleResize);
      isResizeListenerAdded.current = true
    }
    return () => {
      if (isResizeListenerAdded.current) {
        window.removeEventListener('resize', handleResize);
      }
    }
  }, []);

  return (
    <UIContext.Provider value={{ isViewport }} >{children}</UIContext.Provider>
  )
}

export {
  UIContext as default,
  UIContext,
  Provider
}
