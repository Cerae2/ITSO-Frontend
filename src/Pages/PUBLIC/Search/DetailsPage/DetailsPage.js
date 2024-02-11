import React, {useState, useEffect} from "react";
import Header from "../../../../components/header/Header";
import "./Details.css";
import { useParams } from "react-router-dom";
import axios from "axios";


function DetailsPage(props) {
  const { id } = useParams();
  const [selectedInvention, setSelectedInvention] = useState([])

  useEffect(() => {
   
    axios.get('uploadforms/forms/',{
      params: {
        id: id,
        select_invention: true,
        is_admin: true
      },
  
    }).then((response) => {
      console.log(response.data)
      const filteredData = response.data.filter(item => item.upload_status === 'Approved');
      console.log(filteredData);
      setSelectedInvention(filteredData);
    })
  }, [])

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
            <h1>{selectedInvention[0]?.invention_title}</h1>
            <p
              style={{
                fontSize: 17,
                textAlign: "justify",
                fontWeight: "bold",
              }}
            >
              {selectedInvention[0]?.authors}
            </p>
            <p style={{ marginTop: 40, fontSize: 17, textAlign: "justify" }}>
              {selectedInvention[0]?.summary}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailsPage;
