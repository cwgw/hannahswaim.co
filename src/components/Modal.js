import React from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';

import { transparentize } from 'polished';

import { colors } from 'style/tokens';
import Button from 'components/Button';
import Icon from 'components/Icon';

const Close = styled(Button)({
  position: 'absolute',
  top: 0,
  right: 0,
  zIndex: 1000,
});

const Modal = ({ handleRequestClose, setContentRef, isOpen, children }) => {
  return (
    <ReactModal
      onRequestClose={handleRequestClose}
      contentRef={setContentRef}
      isOpen={isOpen}
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
      <Close
        aria-label="Close Modal"
        onClick={handleRequestClose}
        variant="dark"
        textStyle="icon"
      >
        <Icon icon="close" />
      </Close>
      {children}
    </ReactModal>
  );
};

export default Modal;
