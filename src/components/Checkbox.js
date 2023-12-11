import React, { useState } from "react";
import "./style.css";
import { Checkbox } from "@mui/material";

function CheckBox({ label, onChange }) {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
    onChange(label, !checked);
  };

  return (
    <div className="check-container">
      <Checkbox
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
}

export default CheckBox;
