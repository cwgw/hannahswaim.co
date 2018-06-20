import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReactModal from 'react-modal'
import { transparentize } from 'polished'
import { navigateTo } from "gatsby-link"

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

function Modal (props) {

  const { children, location, isOpen } = props

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => navigateTo(location.state.origin)}
      style={{
        overlay: {
          position: `fixed`,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          // backgroundImage: `linear-gradient(${transparentize(0.075,colors.black)},${transparentize(0.25,colors.black)})`,
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
      <div onClick={() => navigateTo(location.state.origin)} >
        {children}
      </div>
    </ReactModal>
  )
}

Modal.propTypes = propTypes

Modal.defaultProps = defaultProps

export default Modal
