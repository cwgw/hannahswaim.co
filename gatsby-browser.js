import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'mobx-react';

import UIStore from 'stores/UIStore';

exports.replaceRouterComponent = ({ history }) => {
  const ConnectedRouterWrapper = ({ children }) => (
    <Provider UIStore={UIStore}>
      <Router history={history}>
        {children}
      </Router>
    </Provider>
  );

  return ConnectedRouterWrapper
}

exports.shouldUpdateScroll = args => {

  // const windowWidth = window.innerWidth
  // // Scroll position only matters on mobile as on larger screens, we use a
  // modal.
  // if (windowWidth < 750) {
  //   return true
  // } else {
  //   return false
  // }
}