import React, { useState } from "react";
import Navbar from "../../../Navbar";
import "./submit.css";
import { Button } from "@mui/material";
import { Download } from "@mui/icons-material";
import SubmitContent from "../../../components/SubmitContent";

function Submit(props) {
  const [selectForm, setSelectForm] = useState("Patent");
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(0);

  const handleSelectForm = (form) => {
    setSelectForm(form);
    setCurrentPage(0);
  };

  const renderContent = () => {
    switch (selectForm) {
      case "Patent":
        return (
          <div className="submit-request-cont">
            <h1 className="title-submit">PATENT</h1>
            <SubmitContent></SubmitContent>
          </div>
        );
      case "Utility Model":
        return (
          <div className="submit-request-cont">
            <h1 className="title-submit">UTILITY MODEL</h1>
            <SubmitContent></SubmitContent>
          </div>
        );
      case "Industrial Design":
        return (
          <div className="submit-request-cont">
            <h1 className="title-submit">INDUSTRIAL DESIGN</h1>
            <SubmitContent></SubmitContent>
          </div>
        );
      case "Trademark":
        return (
          <div className="submit-request-cont">
            <h1 className="title-submit">TRADEMARK</h1>
            <SubmitContent></SubmitContent>
          </div>
        );
      case "Copyright":
        return (
          <div className="submit-request-cont">
            <h1 className="title-submit">COPYRIGHT</h1>
            <SubmitContent></SubmitContent>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="submit-cont">
        <div className="btn-cont-submit">
          {[
            "Patent",
            "Utility Model",
            "Industrial Design",
            "Trademark",
            "Copyright",
          ].map((form) => (
            <Button
              key={form}
              style={{
                backgroundColor: selectForm === form ? "#FFC000" : "#201b51",
                color: selectForm === form ? "#201b51" : "#FFC000",
              }}
              onClick={() => handleSelectForm(form)}
            >
              {form}
            </Button>
          ))}
        </div>
        {renderContent()}
      </div>
    </div>
  );
}

export default Submit;
