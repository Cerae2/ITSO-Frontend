import React from "react";
import Navbar from "../../../../Navbar";
import { useParams } from "react-router-dom";
import inventionData from "./../../../../components/JSON/inventions.json";

function DetailsDash(props) {
  const { id } = useParams();
  const selectedInvention = inventionData.find(
    (invention) => invention.id === Number(id)
  );

  if (!selectedInvention) {
    // Handle case where the invention is not found
    return <p>Invention not found</p>;
  }

  return (
    <div>
      <Navbar></Navbar>
      <div>
        <h1>{selectedInvention.Title_of_Invention}</h1>
      </div>
    </div>
  );
}

export default DetailsDash;
