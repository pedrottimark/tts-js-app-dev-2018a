import React from 'react';

const ModalDialog = ({children, onClick}) => (
  <div className="modalDialog">
    {children}
    <button onClick={onClick}>Get out of my way!</button>
  </div>
);

export default ModalDialog;
