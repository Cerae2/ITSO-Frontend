import React from "react";
import { TextField } from "@mui/material";

function TextFieldComponet({ label, onChange, type }) {
  return (
    <div style={{ marginBottom: 25 }}>
      <TextField
        type={type}
        onChange={onChange}
        label={label}
        style={{ marginRight: 15, width: "30vh" }}
      ></TextField>
    </div>
  );
}

export default TextFieldComponet;
