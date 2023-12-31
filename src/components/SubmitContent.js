import { Button } from "@mui/material";
import React from "react";
import { Download } from "@mui/icons-material";

export default function SubmitContent() {
  return (
    <div className="submit-mainsub">
      <div className="submit-request-subcont A">
        <h3>Requirements</h3>
        <div className="form-list-cont">
          <Button
            style={{
              backgroundColor: "white",
              borderRadius: 50,
              marginTop: 20,
            }}
          >
            <Download></Download> FORM
          </Button>
          <Button
            style={{
              backgroundColor: "white",
              borderRadius: 50,
              marginTop: 20,
            }}
          >
            <Download></Download> FORM
          </Button>
          <Button
            style={{
              backgroundColor: "white",
              borderRadius: 50,
              marginTop: 20,
            }}
          >
            <Download></Download> FORM
          </Button>
          <Button
            style={{
              backgroundColor: "white",
              borderRadius: 50,
              marginTop: 20,
            }}
          >
            <Download></Download> FORM
          </Button>
        </div>
      </div>
      <div className="submit-request-subcont B">
        <h3>Submit Requirents</h3>
        <div className="upload-cont"></div>
        <div className="btn-option">
          <Button
            style={{
              backgroundColor: "#3aa03a",
              marginRight: 10,
              color: "white",
              borderRadius: 20,
            }}
          >
            Submit
          </Button>
          <Button
            style={{ backgroundColor: "red", color: "white", borderRadius: 20 }}
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
}
