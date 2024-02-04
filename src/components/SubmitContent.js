import { Button } from "@mui/material";
import React, { useState, useCallback } from "react";
import { Download, Upload } from "@mui/icons-material";
import TextFieldComponet from "./TextFieldComponet";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import "./style.css";
import Selection from "./../components/Selection";
import categoryData from "./../components/JSON/category.json";

function SubmitContent({ onFileUpload, type, onChange }) {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [inventionTitle, setTitle] = useState(""); // Add title state
  const [summary, setSummary] = useState(""); // Add summary state
  const [authors, setAuthors] = useState(""); // Add authors state
  const [category, setCategory] = useState("");

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


  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };


  // Function to handle file upload
  const handleFileUpload = async () => {
    try {
      const formData = {
        invention_title: inventionTitle,
        summary: summary,
        authors: authors,
      };

      const uploadEndpoint = "uploadforms/forms/";
      const response = await axios.post(uploadEndpoint, formData);

      console.log("UploadForms Model Upload Response:", response.data);

      const uploadFormId = response.data.id;

      const formData2 = new FormData();
      formData2.append("upload_form", uploadFormId);
      formData2.append("files", response.data.file1);

      const uploadEndpoint2 = "uploadforms/file/";
      const response2 = await axios.post(uploadEndpoint2, formData2);

      console.log("FileUploads Model Upload Response:", response2.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <div className="submit-mainsub">
      <div className="submit-cont-main">
        <div style={{ marginTop: 10, width: "90%" }}>
        <Selection
                inputLabel={"Category"}
                valueSelect={category}
                label={"Category"}
                onChange={handleChangeCategory}
                data={categoryData}
                value={"value"}
                content={"label"}
                width={"100%"}
              />
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
        <TextFieldComponet
          width={"100%"}
          label={"Invention Title"}
          value={inventionTitle}
          onChange={(e) => setTitle(e.target.value)}
        ></TextFieldComponet>
        <div className="selection-request">
        </div>
        <TextFieldComponet
          width={"100%"}
          label={"Summary"}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        ></TextFieldComponet>
        <TextFieldComponet
          width={"100%"}
          label={"Author/s"}
          helperText={
            "Separate it with comma if there are more than one author (ex. John Doe, Jane Doe)"
          }
          value={authors}
          onChange={(e) => setAuthors(e.target.value)}
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
            onClick={handleFileUpload}
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
};
export default SubmitContent;