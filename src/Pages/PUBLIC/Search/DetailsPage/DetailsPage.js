import React from "react";
import Header from "../../../../components/header/Header";
import "./Details.css";
import { useParams } from "react-router-dom";
import inventionData from "./../../../../components/JSON/inventions.json";

function DetailsPage(props) {
  const { id } = useParams();
  const selectedInvention = inventionData.find(
    (invention) => invention.id === Number(id)
  );

  if (!selectedInvention) {
    // Handle case where the invention is not found
    return <p>Invention not found</p>;
  }

  return (
    <>
      <div className="header-details">
        <Header />
      </div>

      <div className="details-page-container">
        <div className="details-sub">
          <div className="title-details">
            <h1>{selectedInvention.Title_of_Invention}</h1>
            <p
              style={{
                fontSize: 17,
                textAlign: "justify",
                fontWeight: "bold",
              }}
            >
              {selectedInvention.Inventors.join(", ")}
            </p>
            <p style={{ marginTop: 40, fontSize: 17, textAlign: "justify" }}>
              {selectedInvention.Summary}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailsPage;
