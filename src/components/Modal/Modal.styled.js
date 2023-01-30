import { AiOutlineCloseCircle } from "react-icons/ai";

import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;
export const ModalWindow = styled.div`
position: relative;
  max-width: calc(100vw - 100px);
  max-height: calc(100vh - 50px);
`;

export const ContainerButtonIcon = styled.div`
position: absolute;
top: 5px;
right: 5px;
`;

export const ButtonIcon = styled.button`
  padding: 0;
  border: none;
  outline: 1px solid transparent;
  background-color: transparent;
  cursor: pointer;

  & svg {
    transition: fill 250ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  & svg:hover,
  & svg:focus {
    fill: #02be6e;
    transition: fill 250ms cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

export const CloseIcon = styled(AiOutlineCloseCircle)`
`;
