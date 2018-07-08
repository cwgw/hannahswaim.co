import React from 'react'
import { Router } from 'react-router-dom';
import { Provider } from 'mobx-react';

import { isSet, hasDeep } from 'utils/helpers'

import UIStore from 'stores/UIStore';

export const replaceRouterComponent = ({ history }) => {
  const ConnectedRouterWrapper = ({ children }) => (
    <Provider UIStore={UIStore}>
      <Router history={history}>
        {children}
      </Router>
    </Provider>
  );

  return ConnectedRouterWrapper
}

export const onRouteUpdate = ({ location }) => {
  UIStore.closeNav()
}

export const shouldUpdateScroll = ({prevRouterProps}) => {
  if (hasDeep(prevRouterProps, 'history.location.state') && isSet(prevRouterProps.history.location.state)) {
    return !!!(prevRouterProps.history.location.state.origin === 'modal' || prevRouterProps.history.location.state.enableModal)
  }

  return true
}