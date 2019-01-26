import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import { transparentize } from 'polished'
import { navigate } from "gatsby"
// import { Spring } from 'react-spring'

import { colors } from 'utils/constants'
import spacing from 'utils/spacing'

import { Control } from 'components/Button'
import Icon from 'components/Icon'

const propTypes = {
  isOpen: PropTypes.bool,
  location: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
}

const defaultProps = {
  isOpen: false,
  location: {},
  children: null,
}

ReactModal.setAppElement(`#___gatsby`)

class Modal extends React.Component {

  closeModal = () => navigate(this.props.location.state.origin, {
    state: {
      origin: 'modal',
    }
  })

  componentDidMount () {
    console.log('Modal did mount')
  }

  render () {

    const {
      children,
      isOpen
    } = this.props

    return (
      <ReactModal
        isOpen={isOpen}
        onRequestClose={this.closeModal}
        contentLabel="Modal"
        style={{
          overlay: {
            position: `fixed`,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
            backgroundColor: transparentize(0.1,colors.gray[0]),
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
        <section onClick={this.closeModal} >
          {children}
          <Control
            aria-label="Close Modal"
            title="Close Modal"
            variant="dark"
            outline
            position="absolute"
            onClick={this.closeModal}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              zIndex: 1000,
              marginBottom: spacing(-1),
            }}
            >
            <Icon type="close" />
          </Control>
        </section>
      </ReactModal>
    )
  }
}

Modal.propTypes = propTypes

Modal.defaultProps = defaultProps

export default Modal
