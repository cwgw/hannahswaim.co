import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import { navigate } from "gatsby";
import { transparentize } from 'polished';

import { style as fontStyle } from 'style/fonts';
import { colors } from 'style/constants';
import Button from 'components/Button';
import Icon from 'components/Icon';

const Close = styled(Button)`
  color: ${colors.white};
  background-color: transparent;
  border: none;
  font-size: ${fontStyle.lead.fontSize};

  &:hover,
  &:focus {
    background-color: ${colors.gray[0]};
  }
`;

const propTypes = {
  isOpen: PropTypes.bool,
  location: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

const defaultProps = {
  isOpen: false,
  location: {},
  children: null,
};

ReactModal.setAppElement(`#___gatsby`);

const Modal = ({
  children,
  location,
  isOpen,
}) => {
  const closeModal = React.useCallback(() => {
    let state = { origin: 'modal' };
    navigate(location.state.origin, { state });
  });

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
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
      <section onClick={closeModal} >
        <Close
          aria-label="Close Modal"
          onClick={closeModal}
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
        {children}
      </section>
    </ReactModal>
  );
};

Modal.propTypes = propTypes;

Modal.defaultProps = defaultProps;

export default Modal;
