import { Button } from "@mui/material";
import React, { useState, useCallback } from "react";
import { Download, Upload } from "@mui/icons-material";
import TextFieldComponet from "./TextFieldComponet";
import { useDropzone } from "react-dropzone";
import axios from "axios";

export default function SubmitContent({
  onFileUpload,
  type,
  onChange,
  onClick,
}) {
  const [uploadedFile, setUploadedFile] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      onFileUpload(file);
      setUploadedFile(file);
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "application/pdf",
    multiple: false,
  });

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
        <div className="upload-cont" {...getRootProps()}>
          <input {...getInputProps()} onChange={onChange} />
          {uploadedFile ? (
            <div>
              <p>Uploaded File:</p>
              <p>{uploadedFile.name}</p>
              <p>Size: {uploadedFile.size} bytes</p>
              {/* Add more details about the uploaded file if needed */}
            </div>
          ) : (
            <Button style={{ height: "100%", width: "100%" }}>
              <div style={{}}>
                <Upload size={600}></Upload>
                <p>Drag or click to upload a file</p>
              </div>
            </Button>
          )}
        </div>
        <div className="btn-option">
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
