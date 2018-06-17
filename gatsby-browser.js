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
