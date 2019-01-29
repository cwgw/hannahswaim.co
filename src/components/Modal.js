import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReactModal from 'react-modal'
import { navigate } from "gatsby"
import { transparentize } from 'polished'

import { style as fontStyle } from 'style/fonts'
import { colors } from 'style/constants'
import PostNavigation from 'components/PostNavigation'
import Button from 'components/Button'
import Icon from 'components/Icon'

const Close = styled(Button)`
  color: ${colors.white};
  background-color: transparent;
  border: none;
  font-size: ${fontStyle.lead.fontSize};

  &:hover,
  &:focus {
    background-color: ${colors.gray[0]};
  }
`

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
      location,
      isOpen,
    } = this.props

    const {
      siblings = [],
      index = 0,
    } = location.state || {}

    const next = {
      pathname: siblings[index + 1] || null,
      state: {
        ...location.state,
        index: index + 1,
      }
    }

    const previous = {
      pathname: siblings[index - 1] || null,
      state: {
        ...location.state,
        index: index - 1,
      }
    }

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
          <Close
            aria-label="Close Modal"
            onClick={this.closeModal}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              zIndex: 1000,
            }}
            >
            <Icon
              type="close"
              inline
            />
          </Close>
          <PostNavigation
            next={next}
            previous={previous}
            >
            {children}
          </PostNavigation>
        </section>
      </ReactModal>
    )
  }
}

Modal.propTypes = propTypes

Modal.defaultProps = defaultProps

export default Modal
