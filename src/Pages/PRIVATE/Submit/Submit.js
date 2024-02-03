import React, { useState } from "react";
import Navbar from "../../../Navbar";
import "./submit.css";
import { Button } from "@mui/material";
import { Download } from "@mui/icons-material";
import SubmitContent from "../../../components/SubmitContent";
import axios from "axios";

function Submit(props) {
  const [selectForm, setSelectForm] = useState("Patent");
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(0);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Function to handle file upload
  const handleFileUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      // Replace 'your-upload-endpoint' with your actual file upload endpoint
      const uploadEndpoint = "your-upload-endpoint";

      const response = await axios.post(uploadEndpoint, formData);

      console.log("Sample API Response:", response.data);
      // Handle the response as needed
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSelectForm = (form) => {
    setSelectForm(form);
    setCurrentPage(0);
  };

  // const renderContent = () => {
  //   switch (selectForm) {
  //     case "Patent":
  //       return (
  //         <div className="submit-request-cont">
  //           <h1 className="title-submit">PATENT</h1>
  //           <SubmitContent
  //             onChange={handleFileChange}
  //             onFileUpload={handleFileUpload}
  //           ></SubmitContent>
  //         </div>
  //       );
  //     case "Utility Model":
  //       return (
  //         <div className="submit-request-cont">
  //           <h1 className="title-submit">UTILITY MODEL</h1>
  //           <SubmitContent></SubmitContent>
  //         </div>
  //       );
  //     case "Industrial Design":
  //       return (
  //         <div className="submit-request-cont">
  //           <h1 className="title-submit">INDUSTRIAL DESIGN</h1>
  //           <SubmitContent></SubmitContent>
  //         </div>
  //       );
  //     case "Trademark":
  //       return (
  //         <div className="submit-request-cont">
  //           <h1 className="title-submit">TRADEMARK</h1>
  //           <SubmitContent></SubmitContent>
  //         </div>
  //       );
  //     case "Copyright":
  //       return (
  //         <div className="submit-request-cont">
  //           <h1 className="title-submit">COPYRIGHT</h1>
  //           <SubmitContent></SubmitContent>
  //         </div>
  //       );
  //     default:
  //       return null;
  //   }
  // };

  return (
    <div>
      <Navbar></Navbar>
      <div className="submit-cont">
        <SubmitContent></SubmitContent>
      </div>
    </div>
  );
}

export default Submit;
