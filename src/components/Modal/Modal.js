import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReactModal from 'react-modal'

import { navigateTo } from "gatsby-link"

const propTypes = {
  isOpen: PropTypes.bool,
  location: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
}

const defaultProps = {}

class Modal extends React.Component {

  render() {
    const { children, location } = this.props

    return (
      <ReactModal
        isOpen={this.props.isOpen}
        onRequestClose={() => navigateTo(`/`)}
        style={{
          overlay: {
            position: `fixed`,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: `rgba(0, 0, 0, 0.75)`,
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
        <div onClick={() => navigateTo(`/`)} >
          {typeof children === 'function' ?
            (
              children({
                location: {
                  pathname: location.pathname,
                  state: location.state,
                },
              })
            ) : (
              React.Children.map(children, (child) => (
                React.cloneElement(child, {
                  location: {
                    pathname: location.pathname,
                    state: location.state,
                  },
                })
              ))
            )
          }
        </div>
      </ReactModal>
    )
  }
}

Modal.propTypes = propTypes

Modal.defaultProps = defaultProps

export default Modal
