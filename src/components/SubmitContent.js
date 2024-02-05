import { Button } from "@mui/material";
import React, { useState, useCallback } from "react";
import { Download, Upload } from "@mui/icons-material";
import TextFieldComponet from "./TextFieldComponet";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import FormData from "form-data"; // Add this line
import "./style.css";
import Selection from "./../components/Selection";
import formData from "./../components/JSON/category.json";


function SubmitContent({ onFileUpload, type, onChange }) {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [inventionTitle, setTitle] = useState(""); // Add title state
  const [summary, setSummary] = useState(""); // Add summary state
  const [authors, setAuthors] = useState(""); // Add authors state
  const [formType, setFormType] = useState("");
  const [uploadForm, setUploadForm] = useState("");
  const [files, setFiles] = useState("")

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


  const handleChangeForm = (event) => {
    setFormType(event.target.value);
  };

  const handleFileUpload = async () => {
    try {
      // Step 1: Upload form data
      const formData1 = new FormData();
      formData1.append("invention_title", inventionTitle);
      formData1.append("summary", summary);
      formData1.append("authors", authors);
      formData1.append("form_type", formType);
  
      const uploadEndpoint1 = "uploadforms/forms/";
      const response1 = await axios.post(uploadEndpoint1, formData1);
  
      console.log("UploadForms Model Upload Response:", response1.data);
  
      const uploadFormId = response1.data.id;
  
      // Step 2: Upload files
      const formData2 = new FormData();
      formData2.append("files", files);
      formData2.append("upload_form", uploadForm);
  
      // Append upload form ID
      formData2.append("upload_form", uploadFormId);
  
      // Append files
      uploadedFiles.forEach((file) => {
        formData2.append("files", file.file);
      });
  
      const uploadEndpoint2 = "uploadforms/file/";
      const response2 = await axios.post(uploadEndpoint2, formData2);
  
      console.log("FileUploads Model Upload Response:", response2.data);
  
      // Update uploadForm state
      setUploadForm(uploadFormId);
  
      // Update files state
      setFiles(uploadedFiles);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <div className="submit-mainsub">
      <div className="submit-cont-main">
        <div style={{ marginTop: 10, width: "90%" }}>
        <Selection
                inputLabel={"Form Type"}
                valueSelect={formType}
                label={"Form Type"}
                onChange={handleChangeForm}
                data={formData}
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
}
export default SubmitContent;

/* aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa */