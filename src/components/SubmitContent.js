import { Button } from "@mui/material";
import React, { useState, useCallback } from "react";
import { Download, Upload } from "@mui/icons-material";
import TextFieldComponet from "./TextFieldComponet";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import "./style.css";
import Selection from "./../components/Selection";
import category from "./../components/JSON/category.json";
import dept from "./../components/JSON/colleges.json";
import campus from "./../components/JSON/campus.json";

export default function SubmitContent({ onFileUpload, type, onChange }) {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const removeFile = (id) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) => ({
        file,
        id: Math.random().toString(36).substring(7),
      }));

      setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
      onFileUpload([...uploadedFiles, ...newFiles]);
    },
    [onFileUpload, uploadedFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "application/pdf",
    multiple: true, // Allow multiple files
  });

  return (
    <div className="submit-mainsub">
      <div className="submit-cont-main">
        <div style={{ marginTop: 10, width: "90%" }}>
          <Selection
            inputLabel="Select Category"
            label={"Select Category"}
            data={category}
            width={"100%"}
          ></Selection>
        </div>
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
          <div className="selection-request">
            <Selection
              data={dept}
              label={"Department"}
              inputLabel={"Department"}
              width={"100%"}
            ></Selection>
            <Selection
              data={campus}
              label={"Campus"}
              inputLabel={"Campus"}
              width={"100%"}
            ></Selection>
          </div>
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
        <div className="upload-cont">
          {uploadedFiles.length > 0 ? (
            <div className="uploaded-name-cont">
              <p>Uploaded Files:</p>
              {uploadedFiles.map((uploadedFile) => {
                const fileName =
                  uploadedFile.file.name.length > 30
                    ? uploadedFile.file.name.slice(0, 30) + "..."
                    : uploadedFile.file.name;

                return (
                  <div className="uploaded-name" key={uploadedFile.id}>
                    <p>{fileName}</p>
                    <p>Size: {uploadedFile.file.size} bytes</p>
                    <Button onClick={() => removeFile(uploadedFile.id)}>
                      Remove
                    </Button>
                  </div>
                );
              })}

              <div {...getRootProps()}>
                <input {...getInputProps()} onChange={onChange} />
                <Button>UPLOAD</Button>
              </div>
            </div>
          ) : (
            <div className="uploaded-name-pre" {...getRootProps()}>
              <input {...getInputProps()} onChange={onChange} />
              <Button style={{ height: "100%", width: "100%", padding: 0 }}>
                <div className="buttonUpload">
                  <Upload size={600}></Upload>
                  <p>Drag or click to upload files</p>
                </div>
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="btn-option">
        <Button
          style={{
            backgroundColor: "#3aa03a",
            width: "20vh",
            marginTop: 10,
            color: "white",
            height: "100%",
            borderRadius: 20,
          }}
        >
          Submit
        </Button>

        <Button
          style={{
            height: "100%",
            width: "20vh",
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
  );
}
