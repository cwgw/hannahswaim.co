import React from 'react';
import styled from 'styled-components';
import { DialogOverlay, DialogContent } from '@reach/dialog';
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
    <DialogOverlay
      onDismiss={handleRequestClose}
      isOpen={isOpen}
      contentLabel="Modal"
      style={{
        position: `fixed`,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        backgroundColor: transparentize(0.1, colors.gray[0]),
      }}
    >
      <DialogContent
        ref={setContentRef}
        style={{
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
      </DialogContent>
    </DialogOverlay>
  );
};

export default Modal;
