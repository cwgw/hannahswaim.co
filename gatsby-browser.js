const _hasIn = require('lodash/hasIn')

exports.shouldUpdateScroll = ({routerProps}) => {
  if (
    _hasIn(routerProps, 'location.state') &&
    (
      routerProps.location.state.origin === 'modal' ||
      routerProps.location.state.enableModal
    )
  ) {
    return false
  }

  return true
}

exports.onInitialClientRender = () => {
  window.___HMS_INITIAL_RENDER_COMPLETE = true
}