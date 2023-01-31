import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalOverlay, ModalWindow } from './Modal.styled';


const modalRoot = document.querySelector('#modal-root');

export const Modal = ({onToggleModal, children}) => {
  useEffect(() => {
      return () => window.addEventListener('keydown', handleKeyDown);
  })

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onToggleModal();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onToggleModal();
    }
  };

    return createPortal(
      <ModalOverlay onClick={handleBackdropClick}>
        <ModalWindow>{children}</ModalWindow>
      </ModalOverlay>,
      modalRoot
    );
}

Modal.propTypes = {
  children: PropTypes.node,
  onToggleModal: PropTypes.func.isRequired,
};
