exports.shouldUpdateScroll = ({routerProps}) => {

  if (
    routerProps.location.state !== null &&
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