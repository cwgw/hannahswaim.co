import React from 'react'
import _get from 'lodash/get'

import UIContext from 'components/UIContext'
import Layout from 'components/Layout'

export const wrapRootElement = ({element}) => <UIContext.Provider>{element}</UIContext.Provider>

export const wrapPageElement = ({element, props}) => <Layout {...props} >{element}</Layout>

export const shouldUpdateScroll = ({routerProps}) => {
  const {origin, enableModal} = _get(routerProps, 'location.state') || {}
  return !(enableModal || origin === 'modal')
}

export const onInitialClientRender = () => {
  window.___HMS_INITIAL_RENDER_COMPLETE = true
}
