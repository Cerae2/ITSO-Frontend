import React from "react";
import "./passwordfield.css";

function PasswordField({ label, onChange }) {
  return (
    <div className="input-container">
      <p className="pass-label">{label}</p>
      <input
        placeholder="password"
        type="password"
        onChange={onChange}
        className="input-component password"
      ></input>
    </div>
  );
}

export default PasswordField;
