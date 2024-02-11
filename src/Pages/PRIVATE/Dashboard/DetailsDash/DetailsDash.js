import React, { useState, useCallback, useEffect } from "react";
import Navbar from "../../../../Navbar";
import { useParams } from "react-router-dom";
import "./DetailsDash.css";
import feedback from "./../../../../assets/fedback.png";
import { Add, Delete, Upload } from "@mui/icons-material";
import { Button } from "@mui/material";
import axios from "axios";
import { useDropzone } from "react-dropzone";

function DetailsDash(props) {
  const { id } = useParams();
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedInvention, setSelectedInvention] = useState([])
  const [fetchFeedBacks, setFetchFeedBacks] = useState([])
  const [selectedInventionID, setSelectedInventioID] = useState(0)
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleButtonClick = (index) => {
    setSelectedButton((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    axios.get('uploadforms/forms/',{
    params: {
      id: id,
      select_invention: true,
      is_admin: false
    },
    headers: {
      Authorization:  `Token ${authToken}`,
      "Content-Type": 'application/json'
    }
    }).then((response) => {
      console.log(response.data)
      setSelectedInvention(response.data)
    })
  }, [])

  const handleDeleteFile = (fileId) => {
    const authToken = localStorage.getItem('authToken')
    axios.delete(`uploadforms/file/${fileId}`, {
      headers: {
        Authorization:  `Token ${authToken}`,
      "Content-Type": 'application/json'
      }
    }).then((response) => {
      console.log(response.data)
      window.location.reload()
    })
  }

  function formatDateTime(dateTimeString) {
    // Create a Date object from the input string
    const date = new Date(dateTimeString);
  
   
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  
    // Format the time part to HH:MM
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true // Use  24-hour format
    });
  
    // Combine the date and time parts
    return `${formattedDate}, ${formattedTime}`;
  }
  


  // useEffect(() => {
  //   if(selectedInvention[0]?.id) {
  //     setSelectedInventioID(selectedInvention[0]?.id)
  //   }
  // }, [selectedInvention[0]?.id])

  useEffect(() =>{
    const authToken = localStorage.getItem('authToken')
    axios.get('uploadforms/feedbacks/', {
    params: {
      upload_form: id
    },
    headers: {
      Authorization:  `Token ${authToken}`,
      "Content-Type": 'application/json'
    }
    }).then((response) => {
      console.log("feedbackdata", response.data)
      setFetchFeedBacks(response.data)
    })
  }, [])

  const onDrop = useCallback(
    (acceptedFiles) => {
      const formData2 = new FormData();
      if (!selectedInvention[0]?.id) {
        console.error('selectedInvention[0]?.id is undefined');
        return;
      }
      const authToken = localStorage.getItem('authToken')
      console.log("accepted", acceptedFiles)
      const newFiles = acceptedFiles.map((file) => ({
        file,
        id: Math.random().toString(36).substring(7),
      }));
      console.log("new files", newFiles)
      formData2.append("upload_form", selectedInvention[0]?.id);
      newFiles.forEach((newFile, index) => {
        formData2.append("files", newFile.file);
      });
      formData2.append("add_new_file", true);
      setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);

      const uploadEndpoint2 = "uploadforms/file/";
      axios.post(uploadEndpoint2, formData2, {
        headers: {
          Authorization: `Token ${authToken}`,
          'Content-Type': 'multipart/form-data'
        }
      }).then(() => {
        window.location.reload()
      })
      
    },
    [selectedInvention]
  );

  
  
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "application/pdf",
    multiple: true, // Allow multiple files
  });

  return (
    <div>
      <Navbar></Navbar>
      <div className="details-dash-con">
        <div className="sub-details-dash-con">
          <div className="box-1">
            <div className="box-1-1">
              <table>
                <tr className="detail-dash-tr">
                  <td className="detail-dash-td title">Invention Title</td>
                  <td className="detail-dash-td">
                    {selectedInvention[0]?.invention_title}
                  </td>
                </tr>
                <tr className="detail-dash-tr" r>
                  <td className="detail-dash-td title">Status</td>
                  <td className="detail-dash-td">{selectedInvention[0]?.upload_status}</td>
                </tr>
                <tr className="detail-dash-tr">
                  <td className="detail-dash-td title">IP Type</td>
                  <td className="detail-dash-td">
                    {selectedInvention[0]?.form_type}
                  </td>
                </tr>
                <tr className="detail-dash-tr">
                  <td className="detail-dash-td title">Authors</td>
                  <td className="detail-dash-td">
                    {selectedInvention[0]?.authors}
                  </td>
                </tr>
                <tr className="detail-dash-tr">
                  <td className="detail-dash-td title">Department</td>
                  <td className="detail-dash-td">
                    {selectedInvention[0]?.department_type}
                  </td>
                </tr>
                <tr className="detail-dash-tr">
                  <td className="detail-dash-td title">Date of Submisson</td>
                  <td className="detail-dash-td">
                    {formatDateTime(selectedInvention[0]?.uploaded_at)}
                  </td>
                </tr>
                <tr className="detail-dash-tr">
                  <td className="detail-dash-td title">Campus</td>
                  <td className="detail-dash-td">{selectedInvention[0]?.school_campus}</td>
                </tr>
              </table>
            </div>
            <div className="box-1-2">
              <div className="feedback-con">
                <img
                  className="feedback-icon"
                  src={feedback}
                  alt="feedback-icon"
                ></img>
                <h3>Feedback</h3>
              </div>
              <div className="feedback-comment">
              {fetchFeedBacks.map((feedback) => (
                  <div className="feedback-file">
                  <p className="feedback-title">
                    {feedback.feedback_text}
                  </p>
                  <p className="feedback-timestamp">{formatDateTime(feedback.created_at)}</p>
                </div>
                ))}
              </div>
            </div>
          </div>

          <div className="box-2">
            <div className="box-2-2">
              <div className="form-title-feed">
                <h2>SUBMITTED FORM</h2>
              </div>

              {selectedInvention[0]?.file_uploads.map((file, index) => (
                <div className="file-btn">
                  <div style={{ width: "100%" }}>
                    <button
                      disabled
                      key={index}
                      className={`file-style ${
                        selectedButton === index ? "selected" : ""
                      }`}
                      onClick={() => handleButtonClick(index)}
                    >
                      <a href={file.file}>
                        <p>{file.file_name}</p>
                      </a>
                    </button>
                  </div>
                  <div
                    style={{
                      backgroundColor: "transparent",
                      marginBottom: 10,
                    }}
                  >
                    <Button onClick={() => {handleDeleteFile(file.id)}} style={{ color: "red" }} className="del-btn">
                      <Delete></Delete>
                    </Button>
                  </div>
                </div>
              ))}
              <div className="btn-add"  {...getRootProps()} >
              <input {...getInputProps()} />
              <Button
                  style={{
                    backgroundColor: "transparent",
                    marginLeft: 10,
                    marginTop: 10,
                    height: 25,
                    width: "auto",
                    color: "#0b9912",
                  }}
                >
                  <Upload >
                    
                    </Upload>Add File
                </Button>
    
              </div>
            </div>
            {/* <div className="box-2-1">
              <h2 style={{ marginBottom: 10 }}>RETURNED FORM</h2>
              {selectedInvention.Feedback.filter(
                (feedbackItem) =>
                  feedbackItem.StatusFeedback === "Under Review" ||
                  feedbackItem.StatusFeedback === "Rejected"
              ).map((feedbackItem, index) => (
                <div className="file-btn" key={index}>
                  <div style={{ width: "90%" }}>
                    <button
                      className={`file-style ${
                        selectedButton === index ? "selected" : ""
                      }`}
                      onClick={() => handleButtonClick(index)}
                    >
                      <p>{feedbackItem.File.FileName}</p>
                    </button>
                  </div>
                  <div
                    style={{
                      backgroundColor: "transparent",
                      marginBottom: 10,
                      textAlign: "center",
                      marginLeft: 10,
                    }}
                  >
                    <p
                      className="feedback-p"
                      style={{
                        background:
                          feedbackItem.StatusFeedback === "Under Review"
                            ? "#ffa600a1"
                            : "red",
                        color: "white",
                      }}
                    >
                      {feedbackItem.StatusFeedback}
                    </p>
                  </div>
                </div>
              ))}
              {selectedInvention.Feedback.length === 0 &&
                selectedInvention.Status !== "Under Review" &&
                selectedInvention.Status !== "Rejected" && (
                  <p style={{ textAlign: "center", marginTop: 10 }}>
                    No returned files.
                  </p>
                )}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsDash;
