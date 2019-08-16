import React from 'react';
import './Modal.css';

export const Modal = (props) => (
<div className={`modal ${props.isModalOpen ? "active" : ""}`}>
  <div className="modalContent">
    <div className="close">
      <span className="closeIcon" onClick={props.onClose}>&times;</span>
      {props.header && <span>{props.header}</span>}
    </div>
    <div>
      {props.children}
    </div>
  </div>
</div>
);
