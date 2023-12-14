import React, { useState } from "react";
import "./style.css";
import { Checkbox } from "@mui/material";

const CheckBox = ({ label, onChange, checked, key }) => {
  const handleCheckboxChange = () => {
    onChange(!checked);
  };

  return (
    <div className="check-container">
      <Checkbox
        key={key}
        checked={checked}
        onChange={handleCheckboxChange}
        sx={{
          "& .MuiSvgIcon-root": {
            width: 30,
            height: 30,
            color: "#1a103f",
          },
        }}
      ></Checkbox>
      <p className="cam-label">{label}</p>
    </div>
  );
};

export default CheckBox;
