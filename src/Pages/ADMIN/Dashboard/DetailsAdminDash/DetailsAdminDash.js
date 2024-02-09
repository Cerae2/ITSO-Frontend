import React, { useState, useEffect } from "react";
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

function DetailsAdminDash(props) {
  const { id } = useParams();
  
    const [selectedInvention, setSelectedInvention] = useState([])
  const [selectedButton, setSelectedButton] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("");

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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const statusMenu = (
    <Menu style={{ width: 250 }}>
      {statusData.map((status) => (
        <Menu.Item key={status.value}>
          <a href={status.link} target="_blank" rel="noopener noreferrer">
            {status.label}
          </a>
        </Menu.Item>
      ))}
    </Menu>
  );

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleDownloadFile = () => {

  }

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
                    {selectedInvention[0]?.uploaded_at}
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
                {selectedButton !== null && (
                  <div className="feedback-file">
                    <p className="feedback-title">
                      {selectedInvention.Feedback[selectedButton].FileComment}
                    </p>
                  </div>
                )}
                {selectedButton === null && (
                  <p className="feedback-title">No file selected.</p>
                )}
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
                    </Button>
                    <Button onClick={handleDownloadFile} style={{ color: "#00B050", marginLeft: -30 }}>
                      <Download></Download>
                    </Button>
                  </div>

                  <p className="status-style">Pending</p>
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
              </div>

              <Modal
                style={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  marginTop: 90,
                }}
                width={"100vh"}
                height={"10vh"}
                visible={isModalOpen}
                onCancel={handleCloseModal}
                footer={[
                  <Button
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      marginRight: 10,
                    }}
                    key="close"
                    onClick={handleCloseModal}
                  >
                    Close
                  </Button>,
                  <Button
                    style={{ backgroundColor: "green", color: "white" }}
                    key="submit"
                    onClick={handleCloseModal}
                  >
                    Submit
                  </Button>,
                ]}
              >
                <div className="status-cont">
                  <div>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        SELECT ACTION
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
                    <textarea className="text-feedback"></textarea>
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
