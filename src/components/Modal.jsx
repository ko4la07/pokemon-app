import React from 'react';
import '../styles/Modal.css';
import { MdClose } from "react-icons/md";

const Modal = ({children, isOpen, closeModal}) => {
  const handleModalContainerClick = (e) => e.stopPropagation();
  return (
    <article className = {`modal ${isOpen && 'is-open'}`} onClick = {closeModal}>
      <div className = 'modal-container'onClick = {handleModalContainerClick}>
      <button className="modal-close" onClick = {closeModal}><MdClose/></button>
      {children}
      </div>
    </article>
  )
};

export default Modal;