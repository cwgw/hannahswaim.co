import _get from 'lodash/get'

import WrapPage from './wrap-page'

export const wrapPageElement = WrapPage

export const shouldUpdateScroll = ({routerProps}) => {
  const {origin, enableModal} = _get(routerProps, 'location.state') || {}
  return !(enableModal || origin === 'modal')
}

export const onInitialClientRender = () => {
  window.___HMS_INITIAL_RENDER_COMPLETE = true
}
