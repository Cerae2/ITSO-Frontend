import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { InputLabel } from "@mui/material";

export default function Selection({
  data,
  valueSelect,
  onChange,
  label,
  inputLabel,
  width,
}) {
  return (
    <Box
      sx={{
        // maxWidth: "30vh",
        width: width,
        marginRight: 2,
        marginBottom: 2,
      }}
    >
      <FormControl fullWidth>
        <InputLabel>{inputLabel}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={valueSelect}
          label={label}
          onChange={onChange}
        >
          {data.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
