import React from "react";

import "./Modal.css";

const Modal = props => {
  return (
    <div className='modal'>
      <div className=''>
        <header className='modal__header'>
          <h1>{props.title}</h1>
        </header>
        <section className=' item modal__contents'>{props.children}</section>
        <section className='modal__actions'>
          {props.canCancel && (
            <button
              className='ui button basic teal btn'
              onClick={props.onCancel}
            >
              Cancel
            </button>
          )}
          {props.canConfirm && (
            <button
              className={
                props.confirmText === "Delete"
                  ? "ui button red"
                  : "ui button teal"
              }
              onClick={props.onConfirm}
            >
              {props.confirmText}
            </button>
          )}
        </section>
      </div>
    </div>
  );
};

export default Modal;
