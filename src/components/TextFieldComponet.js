import React from "react";
import { TextField } from "@mui/material";

function TextFieldComponet({ label, onChange }) {
  return (
    <div style={{ marginBottom: 25 }}>
      <TextField
        onChange={onChange}
        label={label}
        style={{ marginRight: 15, width: "30vh" }}
      ></TextField>
    </div>
  );
}

export default TextFieldComponet;
