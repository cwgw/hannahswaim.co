import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import { transparentize } from 'polished'
import { push } from "gatsby"

import colors from 'utils/colors'

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

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => push(location.state.origin)}
      style={{
        overlay: {
          position: `fixed`,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
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
      <div onClick={() => push(location.state.origin)} >
        {children}
      </div>
    </ReactModal>
  )
}

Modal.propTypes = propTypes

Modal.defaultProps = defaultProps

export default Modal
