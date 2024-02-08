import React, { useState, useEffect } from "react";
import Navbar from "../../../../Navbar";
import { useParams } from "react-router-dom";
import "./DetailsDash.css";
import feedback from "./../../../../assets/fedback.png";
import { Add, Delete, Upload } from "@mui/icons-material";
import { Button } from "@mui/material";
import axios from "axios";

function DetailsDash(props) {
  const { id } = useParams();
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedInvention, setSelectedInvention] = useState([])

  const handleButtonClick = (index) => {
    setSelectedButton((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    axios.get('uploadforms/forms/',{
    params: {
      id: id,
      select_invention: true
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


  console.log("selected invention", selectedInvention)

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

              {/* {selectedInvention.Feedback.map((feedbackItem, index) => (
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
                      <p>{feedbackItem.File.FileName}</p>
                    </button>
                  </div>
                  <div
                    style={{
                      backgroundColor: "transparent",
                      marginBottom: 10,
                    }}
                  >
                    <Button style={{ color: "red" }} className="del-btn">
                      <Delete></Delete>
                    </Button>
                  </div>
                </div>
              ))}
              <div className="btn-add">
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
                  <Upload></Upload>Add File
                </Button>
              </div>
            </div>
            <div className="box-2-1">
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
              ))} */}
              {/* {selectedInvention.Feedback.length === 0 &&
                selectedInvention.Status !== "Under Review" &&
                selectedInvention.Status !== "Rejected" && (
                  <p style={{ textAlign: "center", marginTop: 10 }}>
                    No returned files.
                  </p>
                )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsDash;
