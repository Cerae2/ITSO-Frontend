import React, { useState } from "react";
import Navbar from "../../../../Navbar";
import { useParams } from "react-router-dom";
import inventionData from "./../../../../components/JSON/inventions.json";
import "./DetailsDash.css";
import feedback from "./../../../../assets/fedback.png";
import { Add, Delete, Upload } from "@mui/icons-material";
import { Button } from "@mui/material";

function DetailsDash(props) {
  const { id } = useParams();
  const selectedInvention = inventionData.find(
    (invention) => invention.id === Number(id)
  );

  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (index) => {
    setSelectedButton((prevIndex) => (prevIndex === index ? null : index));
  };

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
                    {selectedInvention.Title_of_Invention}
                  </td>
                </tr>
                <tr className="detail-dash-tr" r>
                  <td className="detail-dash-td title">Status</td>
                  <td className="detail-dash-td">{selectedInvention.Status}</td>
                </tr>
                <tr className="detail-dash-tr">
                  <td className="detail-dash-td title">IP Type</td>
                  <td className="detail-dash-td">
                    {selectedInvention.Category}
                  </td>
                </tr>
                <tr className="detail-dash-tr">
                  <td className="detail-dash-td title">Authors</td>
                  <td className="detail-dash-td">
                    {selectedInvention.Inventors}
                  </td>
                </tr>
                <tr className="detail-dash-tr">
                  <td className="detail-dash-td title">Department</td>
                  <td className="detail-dash-td">
                    {selectedInvention.Department}
                  </td>
                </tr>
                <tr className="detail-dash-tr">
                  <td className="detail-dash-td title">Date of Submisson</td>
                  <td className="detail-dash-td">
                    {selectedInvention.Date_of_Submission}
                  </td>
                </tr>
                <tr className="detail-dash-tr">
                  <td className="detail-dash-td title">Campus</td>
                  <td className="detail-dash-td">{selectedInvention.Campus}</td>
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

              {selectedInvention.Feedback.map((feedbackItem, index) => (
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
                      style={{
                        border: "1px solid rgb(255, 166, 0)",
                        display: "flex",
                        padding: "3px 8px",
                        borderRadius: "12px",
                        width: "100%",
                        height: 35,
                        alignItems: "center",
                        justifyContent: "center",
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsDash;
