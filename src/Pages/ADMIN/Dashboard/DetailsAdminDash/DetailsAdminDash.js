import React, { useState, useCallback, useEffect } from "react";
import Navbar from "../../../../Navbar";
import { useParams } from "react-router-dom";
import "./DetailsAdminDash.css";
import {
  ArrowDropDownCircle,
  Download,
  Undo,
  Upload,
} from "@mui/icons-material";
import { DownOutlined } from "@ant-design/icons";
import {
  Button,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";
import { Dropdown, Menu, Modal, Space } from "antd";
import statusData from "./../../../../components/JSON/status.json";
import feedback from "./../../../../assets/fedback.png";
import axios from "axios";
import { useDropzone } from "react-dropzone";

function DetailsAdminDash(props) {
  const { id } = useParams();
  
  const [selectedInvention, setSelectedInvention] = useState([])
  const [feedBackData, setFeedBackData] = useState({
    upload_form: "",
    file_status: "",
    feedback_text: ""
  })
  const [fetchFeedBacks, setFetchFeedBacks] = useState([])
  const [selectedButton, setSelectedButton] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleButtonClick = (index) => {
    setSelectedButton((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() =>{
    const authToken = localStorage.getItem('authToken')
    axios.get('uploadforms/forms/',{
    params: {
      id: id,
      select_invention: true,
      is_admin: true
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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitFeedback = () =>{
    const authToken = localStorage.getItem('authToken')
    axios.post('uploadforms/feedbacks/', feedBackData, {
      headers: {
        Authorization:  `Token ${authToken}`,
        "Content-Type": 'application/json'
      }
    }).then(() => {
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
  

  const handleChange = (event) => {
    setStatus(event.target.value);
    setFeedBackData((prevData) => ({
      ...prevData,
      upload_form: selectedInvention[0]?.id,
      file_status: event.target.value
    }))
  };

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

       // Check if any file uploaded is not a PDF
      const nonPDFFile = newFiles.find(file => file.file.type !== 'application/pdf');
       if (nonPDFFile) {
         alert('File should be in PDF format');
         return;
       }

      formData2.append("upload_form", selectedInvention[0]?.id);
      newFiles.forEach((newFile, index) => {
        formData2.append("files", newFile.file);
      });
      formData2.append("add_new_file", true);
      formData2.append("add_new_file_admin", true)
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
                {/* {selectedButton !== null && ( */}
                {fetchFeedBacks.map((feedback) => (
                  <div className="feedback-file">
                  <p className="feedback-title" style={{wordBreak:'break-word'}}>{feedback.feedback_text}</p>
                  <p className="feedback-timestamp">{formatDateTime(feedback.created_at)}</p>
                </div>
                ))}
                  
                {/* )}
                {selectedButton === null && (
                  <p className="feedback-title">No file selected.</p>
                )} */}
              </div>
            </div>
          </div>

          <div className="box-2">
            <div className="box-2-2">

              <div className="form-title-feed">
                <h2>SUBMITTED FORM</h2>
              </div>


              <div className="submission-cont">

                <div className="modal-btn-arrow">

                  <div>
                    <Button
                      style={{ color: "#0D0359" }}
                      onClick={handleOpenModal}
                    >
                      <Undo></Undo>
                      Set statis and Feedback
                    </Button>
                  </div>

                  <p className="status-style">{selectedInvention[0]?.upload_status}</p>
                </div>

                <div className="button-feed-cont">
                  {selectedInvention[0]?.file_uploads.map((file, index) => (
                    <div className="file-btn" key={index}>
                      <a href={file.file}>
                        <p>{file.file_name}</p>
                      </a>

                      <div
                        style={{
                          marginBottom: 10,
                          display: "flex",
                        }}
                      ></div>

                    </div>
                  ))}
                </div>
                <div className="btn-add"  {...getRootProps()} >
        `        <input {...getInputProps()} />
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
        
                </div>`

                
              </div>
              

              <Modal
                style={{
                  backgroundColor:"white",
                  borderRadius: 10,
                  marginTop:90
                }}
                width={"100vh"}
                height={"10vh"}
                visible={isModalOpen}
                onCancel={handleCloseModal}
                footer={[
                  // <Button
                  //   style={{
                  //     backgroundColor: "red",
                  //     color: "white",
                  //     marginRight: 10,
                  //   }}
                  //   key="close"
                  //   onClick={handleCloseModal}
                  // >
                  //   Close
                  // </Button>,
                  <Button
                    style={{ backgroundColor: "green", color: "white" }}
                    key="submit"
                    onClick={handleSubmitFeedback}
                  >
                    Return with Feedback
                  </Button>
                ]}
              >
                <div className="status-cont">
                  <div>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Select Status
                      </InputLabel>

                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="SELECT ACTION"
                        onChange={handleChange}
                        value={status}
                      >
                        {statusData.map((index) => (
                          <MenuItem value={index.value}>{index.label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <div className="feedback-cont-ad">
                    <h3>Leave Feedback</h3>
                    <textarea value={feedBackData.feedback_text} onChange={(event) => {
                      setFeedBackData((prevData) => ({
                        ...prevData,
                        feedback_text: event.target.value
                      }))
                    }} className="text-feedback"></textarea>
                  </div>
                  <dic className="admin-feed-btn"></dic>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DetailsAdminDash;
