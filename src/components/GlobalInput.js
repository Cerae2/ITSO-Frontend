import React from "react";
import "./style.css";

function GlobalInput({ placeholder, width }) {
  return (
    <div className="global-input-container">
      <input
        style={{ width: width }}
        placeholder={placeholder}
        className="global-input-component"
      ></input>
      <p className="global-label">Search</p>
    </div>
  );
}

export default GlobalInput;
