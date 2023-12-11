import React from "react";
import "./inputfield.css";

function InputField({ label, onChange, colorInput, colorLabel }) {
  return (
    <div className="input-container">
      <input
        placeholder="username"
        onChange={onChange}
        className="input-component text"
      />
      <p className="label">{label}</p>
    </div>
  );
}

export default InputField;
