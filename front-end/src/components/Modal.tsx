import React from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
// import Button from "./Button";
import { ReactComponent as CloseIcon } from "../assets/imgs/close-icon.svg";

ReactModal.setAppElement("#root");

interface ChatProps {
    hideModal: (e : any) => void,
    onRequestClose: (e : any) => void,
    children: any,
    isOpen : boolean,
} 



const Modal = (props : ChatProps) => {
  return (
    <ModalStyle
    style={{
      
      overlay: {
        background: 'rgba(255, 255, 255, 0.1)',
        zIndex: '89'
      },
     }}
    {...props}>
      <ModalContentStyle>

        
        <button  onClick={props.hideModal}>
          <CloseIcon />
        </button>


        <div>{props.children}</div>


      </ModalContentStyle>
    </ModalStyle>
  );
};
export default Modal;

const ModalStyle = styled(ReactModal)`
  position: fixed;
  z-index: 10;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  transform: translate(-50%, -50%);
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.07);
  background-color: ${props => props.theme.colors.primarybg};
  border: 1px solid black;
  width: clamp(475px, 400px, 100%);
  max-height: 85vh;
  /* min-height: 85vh; */
  padding: 0 50px;
  overflow: hidden;
  padding-bottom: 0px;
  border-radius: 20px;
  display: flex;
  :focus {
    outline: none;
  }

  @media (max-width: 576px) {
    width: 100%;
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    transform: none !important;
    border-radius: 5px 5px 0 0;
    padding: 25px 1.5rem 0;
  }
`;

const ModalContentStyle = styled.div`
  position: relative;
  width: 100%;
  color: white;
  > button:first-child {
    position: absolute;
    right: -30px;
    top: 15px;
    padding: 5px;
    background-color: transparent;
    svg {
      max-height: 20px;
      min-height: 20px;
      max-width: 20px;
      min-width: 20px;
      path {
        stroke: white;
      }
    }
    @media (max-width: 576px) {
      position: fixed;
      right: 10px;
      top: 10px;
      background-color: blue;
    }
  }
  > div {
    height: 100%;
    overflow: auto;
    padding: 3px;
    padding-bottom: 60px;
    padding-top: 60px;
    @media (max-width: 576px) {
      padding-top: 0px;
      padding-bottom: 20px;
    }
  }
`;