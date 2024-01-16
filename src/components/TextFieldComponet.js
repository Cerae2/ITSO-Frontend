import React from "react";
import { TextField } from "@mui/material";

function TextFieldComponet({ label, helperText, onChange, type, width }) {
  return (
    <div style={{ marginBottom: 25 }}>
      <TextField
        type={type}
        onChange={onChange}
        label={label}
        helperText={helperText}
        style={{ marginRight: 15, width: width || "30vh" }}
      ></TextField>
    </div>
  );
}

export default TextFieldComponet;
