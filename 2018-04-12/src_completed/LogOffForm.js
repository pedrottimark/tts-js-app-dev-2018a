import React from 'react';

const LogOffForm = ({disabled, onClick}) => (
  <form className="logOff">
    <button disabled={disabled} onClick={onClick}>Log off</button>
  </form>
);

export default LogOffForm;
