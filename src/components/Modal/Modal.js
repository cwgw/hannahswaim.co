import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import { transparentize } from 'polished'
import { push } from "gatsby"

import { colors, zIndex } from 'utils/constants'
import spacing from 'utils/spacing'

import { Control } from 'components/Button'
import Icon from 'components/Icon'

const propTypes = {
  isOpen: PropTypes.bool,
  location: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
}

const defaultProps = {}

ReactModal.setAppElement(`#___gatsby`)

function Modal (props) {

  const { children, location, isOpen } = props

  const closeModal = () => push({
    pathname: location.state.origin,
    state: {
      origin: 'modal',
    },
  })

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={{
        overlay: {
          position: `fixed`,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: zIndex.modal,
          backgroundColor: transparentize(0.075,colors.coolBlack),
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
      contentLabel="Modal"
    >
      <section onClick={closeModal} >
        {children}
        <Control
          aria-label="Close Modal"
          title="Close Modal"
          variant="dark"
          position="absolute"
          onClick={closeModal}
          style={{
            right: 0,
            top: 0,
            marginBottom: spacing(-1),
          }}
        >
          <Icon type="close" />
        </Control>
      </section>
    </ReactModal>
  )
}

Modal.propTypes = propTypes

Modal.defaultProps = defaultProps

export default Modal
