import React from 'react';

import { Provider } from 'context/UI';
import Layout from 'components/Layout';

export default ({ element, props }) => (
  <Provider>
    <Layout {...props}>{element}</Layout>
  </Provider>
);
