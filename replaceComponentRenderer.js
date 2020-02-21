import React from 'react'
import { navigate } from 'gatsby'
import Modal from 'react-modal'
import styled from 'styled-components';
import get from 'lodash/get'
import { transparentize } from 'polished';

import ModalRoutingContext from 'context/ModalRoutingContext'

import { colors } from 'style/tokens';
import Button from 'components/Button';
import Icon from 'components/Icon';

const Close = styled(Button)({
  position: 'absolute',
  top: 0,
  right: 0,
  zIndex: 1000,
});

const withoutPrefix = (path) => {
  const prefix = typeof __BASE_PATH__ !== `undefined`
    ? __BASE_PATH__
    : __PATH_PREFIX__

  return path.slice(prefix ? prefix.length : 0)
}

class ReplaceComponentRenderer extends React.Component {
  state = {
    prevProps: null,
    lastModalProps: null,
    props: null,
    pathname: null,
  }

  modalContentRef = null

  static getDerivedStateFromProps(props, state) {
    // TODO: handle history changes
    if (props.location.pathname !== state.pathname) {
      return {
        pathname: props.location.pathname,
        props: props,
        ...(get(state, 'props.location.state.modal') ? {
          // old page was a modal, keep track so we can render the contents while closing
          lastModalProps: state.props,
        } : {
          // old page was not a modal, keep track so we can render the contents under modals
          prevProps: state.props,
        }),
      }
    }

    return null
  }

  componentDidUpdate(prevProps) {
    if (get(prevProps, 'location.pathname') !== get(this.props, 'location.pathname')
      && get(this.props, 'location.state.modal')
      && this.modalContentRef
    ) {
      this.modalContentRef.scrollTop = 0
    }
  }


  handleRequestClose = () => {
    navigate(
      withoutPrefix(this.state.prevProps.location.pathname),
      {
        state: {
          noScroll: true
        }
      }
    )
  }

  render() {
    // render modal if props location has modal
    const { pageResources, location, modalProps } = this.props
    const { prevProps, lastModalProps } = this.state
    const isModal = prevProps && get(location, 'state.modal')

    // the page is the previous path if this is a modal, otherwise it's the current path
    const pageElement = isModal ? (
      React.createElement(prevProps.pageResources.component, {
        ...prevProps,
        key: prevProps.pageResources.page.path,
      })
    ) : (
      React.createElement(pageResources.component, {
        ...this.props,
        key: pageResources.page.path,
      })
    )

    let modalElement = null

    if (isModal) {
      // Rendering the current page as a modal, so create an element with the page contents
      modalElement = React.createElement(pageResources.component, {
        ...this.props,
        key: pageResources.page.path,
      })
    } else if (lastModalProps) {
      // Not rendering the current page as a modal, but we may be in the process of animating
      // the old modal content to close, so render the last modal content we have cached

      modalElement = React.createElement(get(lastModalProps, 'pageResources.component'), {
        ...lastModalProps,
        key: get(lastModalProps, 'pageResources.page.path'),
      })
    }

    return (
      <>
        {pageElement}
        <Modal
          onRequestClose={this.handleRequestClose}
          contentRef={node => this.modalContentRef = node}
          {...modalProps}
          isOpen={!!isModal}
          contentLabel="Modal"
          style={{
            overlay: {
              position: `fixed`,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1000,
              backgroundColor: transparentize(0.1, colors.gray[0]),
            },
            content: {
              position: `absolute`,
              border: `none`,
              background: `none`,
              padding: 0,
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              overflow: `auto`,
              WebkitOverflowScrolling: `touch`,
            },
          }}
        >
          {modalElement ? (
            <React.Fragment
              key={this.props.location.key}
            >
              <ModalRoutingContext.Provider
                value={{
                  modal: true,
                  closeTo: prevProps ? withoutPrefix(prevProps.location.pathname) : '/'
                }}
              >
                <Close
                  aria-label="Close Modal"
                  onClick={this.handleRequestClose}
                  variant="dark"
                  textStyle="icon"
                >
                  <Icon icon="close" />
                </Close>
                {modalElement}
              </ModalRoutingContext.Provider>
            </React.Fragment>
          ) : null}
        </Modal>
      </>
    )
  }
}

const replaceComponentRenderer = ({ props }, opts) => {
  const { modalProps } = opts
  return React.createElement(ReplaceComponentRenderer, { ...props, modalProps })
}

export default replaceComponentRenderer
