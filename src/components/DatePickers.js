import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, FormControl } from "@mui/material";

export default function DatePickers() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={"Birth Date"}
        sx={{ width: "30vh", marginRight: 2, marginBottom: 2 }}
      />
    </LocalizationProvider>
  );
}
