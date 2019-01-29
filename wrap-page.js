import React from 'react'

import { Provider } from 'components/UIContext'
import Layout from 'components/Layout'

export default ({element, props}) => (
  <Provider>
    <Layout {...props} >{element}</Layout>
  </Provider>
)
