import React from "react";
import { TextField } from "@mui/material";

function TextFieldComponet({ label, helperText, onChange, type, width, value }) {
  return (
    <div style={{ marginBottom: 25 }}>
      <TextField
        type={type}
        value={value}
        onChange={onChange}
        label={label}
        helperText={helperText}
        style={{ marginRight: 15, width: width || "30vh" }}
      ></TextField>
    </div>
  );
}

export default TextFieldComponet;
