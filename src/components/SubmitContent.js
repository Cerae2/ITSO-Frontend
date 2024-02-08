import { Button } from "@mui/material";
import React, { useState, useCallback, useEffect } from "react";
import { Download, Upload } from "@mui/icons-material";
import TextFieldComponent from "../components/TextFieldComponet"
import { useDropzone } from "react-dropzone";
import axios from "axios";
import FormData from "form-data"; // Add this line
import "./style.css";
import Selection from "./../components/Selection"; // Add this line
import formData from "./../components/JSON/category.json";
import { useSelector } from "react-redux";

function SubmitContent({ onFileUpload, type, onChange }) {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [inventionTitle, setTitle] = useState(""); // Add title state
  const [summary, setSummary] = useState(""); // Add summary state
  const [authors, setAuthors] = useState(""); // Add authors state
  const [formType, setFormType] = useState("");
  const [uploadForm, setUploadForm] = useState("");
  const [files, setFiles] = useState("");

  const removeFile = (id) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      console.log("accepted", acceptedFiles)
      const newFiles = acceptedFiles.map((file) => ({
        file,
        id: Math.random().toString(36).substring(7),
      }));
      console.log("new files", newFiles)
      setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
      
    },
    [uploadedFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "application/pdf",
    multiple: true, // Allow multiple files
  });

  const handleChangeForm = (event) => {
    setFormType(event.target.value);
  };

 

  const formData2 = new FormData();

  useEffect(() => {
    if(uploadedFiles){
      uploadedFiles.forEach((fileObj) => {
        formData2.append("files", fileObj.file);
      });
      console.log("uploadedfiles", uploadedFiles)
      let entryCount =  0;
      for (let entry of formData2.entries()) {
        entryCount++;
      }
    console.log("Number of entries in formData2:", entryCount);
    }
  }, [uploadedFiles])

  const personalInfo = useSelector(
    (state) => state.personalInfo.data 
  );

  const userId = personalInfo?.id;

  const handleFileUpload = async () => {
    try {
      // Step 1: Upload form data
      const formData1 = new FormData();
      const authToken = localStorage.getItem("authToken")
      formData1.append("user", userId);
      formData1.append("invention_title", inventionTitle);
      formData1.append("summary", summary);
      formData1.append("authors", authors);
      formData1.append("form_type", formType);
      console.log("formdata1", formData1)
      // Endpoint for uploading form data
      const uploadEndpoint1 = "uploadforms/forms/";
      const response1 = await axios.post(uploadEndpoint1, formData1, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });
  
      // Log response and get the upload form ID
      console.log("UploadForms Model Upload Response:", response1.data);
      const uploadFormId = response1.data.id;
  
      // Step 2: Upload files
      
      
      // Append upload form ID
      formData2.append("upload_form", uploadFormId);
  
      // Append each file from the uploadedFiles array
      
      
      // Endpoint for uploading files
      const uploadEndpoint2 = "uploadforms/file/";
      const response2 = await axios.post(uploadEndpoint2, formData2, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });
  
      // Log response for file uploads
      console.log("FileUploads Model Upload Response:", response2.data);
  
      // Update uploadForm state with the uploaded form ID
      setUploadForm(uploadFormId);
  
      // Update files state if needed
      // setFiles(uploadedFiles);
      
    } catch (error) {
      // Handle errors
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
          <TextFieldComponent
            width={"100%"}
            label={"Invention Title"}
            value={inventionTitle}
            onChange={(e) => setTitle(e.target.value)}
          ></TextFieldComponent>
          <div className="selection-request">
          </div>
          <TextFieldComponent
            width={"100%"}
            label={"Summary"}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          ></TextFieldComponent>
          <TextFieldComponent
            width={"100%"}
            label={"Author/s"}
            helperText={
              "Separate it with comma if there are more than one author (ex. John Doe, Jane Doe)"
            }
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
          ></TextFieldComponent>
        </div>
      </div>

      <div className="submit-request-subcont B">
        <h3>Submit Requirements</h3>
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
