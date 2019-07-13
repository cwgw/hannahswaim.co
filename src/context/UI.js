import React from 'react';
import { em } from 'polished';

import { breakpoints } from 'style/tokens';

const UIContext = React.createContext({});

const isWindowDefined = () => typeof window !== 'undefined';

function Provider({ children }) {
  const [isViewport, setViewportState] = React.useState(
    Array.from(breakpoints.keys()).reduce(
      (o, key) => ({ ...o, [key]: false }),
      {}
    )
  );

  React.useEffect(() => {
    if (isWindowDefined()) {
      let initialState = {};
      for (let [key, width] of breakpoints.entries()) {
        let query = window.matchMedia(`(min-width: ${em(width)})`);
        initialState[key] = query.matches;
        query.addListener(e => {
          let matches = e.matches;
          setViewportState(prev => ({
            ...prev,
            [key]: matches,
          }));
        });
      }
      setViewportState(initialState);
    }
  }, []);

  return (
    <UIContext.Provider value={{ isViewport }}>{children}</UIContext.Provider>
  );
}

export { UIContext as default, UIContext, Provider };
