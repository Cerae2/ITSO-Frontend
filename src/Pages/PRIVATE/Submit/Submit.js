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
      const uploadEndpoint = "uploadforms/file/";

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