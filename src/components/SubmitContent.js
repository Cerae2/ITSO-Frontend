import { Button } from "@mui/material";
import React from "react";
import { Download, Upload } from "@mui/icons-material";
import TextFieldComponet from "./TextFieldComponet";

export default function SubmitContent() {
  return (
    <div className="submit-mainsub">
      <div className="submit-cont-main">
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
        <div className="fill-up-form">
          <TextFieldComponet width={"100%"} label={"Title"}></TextFieldComponet>
          <TextFieldComponet
            width={"100%"}
            label={"Summary"}
          ></TextFieldComponet>
          <TextFieldComponet
            width={"100%"}
            label={"Author/s"}
            helperText={
              "Separate it with comma if there are more than one author (ex. John Doe, Jane Doe)"
            }
          ></TextFieldComponet>
        </div>
      </div>
      <div className="submit-request-subcont B">
        <h3>Submit Requirents</h3>
        <div className="upload-cont"></div>
        <div className="btn-option">
          <Button
            style={{
              backgroundColor: "#9aa03a",
              marginRight: 10,
              marginTop: 10,
              color: "white",
              borderRadius: 20,
              width: "100%",
            }}
          >
            Upload <Upload></Upload>
          </Button>

          <Button
            style={{
              backgroundColor: "#3aa03a",
              marginRight: 10,
              marginTop: 10,
              color: "white",
              width: "100%",
              borderRadius: 20,
            }}
          >
            Submit
          </Button>

          <Button
            style={{
              width: "100%",
              display: "flex",
              backgroundColor: "red",
              marginTop: 10,
              color: "white",
              borderRadius: 20,
            }}
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
}
