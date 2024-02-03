import React, { useState, useEffect } from "react";
import Navbar from "../../../Navbar";
import "./userliist.css";
import { Button, Typography } from "@mui/material";
import userlistData from "./../../../components/JSON/userlist.json";
import nothing from "./../../../assets/nothing.png";
import axios from "../../plugins/axios";
import { Cancel, Edit, Save } from "@mui/icons-material";

function UserList(props) {
  const [userDataList, setUserDataList] = useState([]);
  const [edit, setEditStates] = useState(true);
  const [editedUserId, setEditedUserId] = useState(null);
  const authToken = localStorage.getItem("authToken");
  const userStatus = ["active", "deactivate"];

  useEffect(() => {
    axios
      .get("accounts/users/", {
        headers: {
          Authorization: `token ${authToken}`,
        },
      })
      .then((response) => {
        const data = response.data;

        setUserDataList(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [selectedCampus, setSelectedCampus] = useState("ustp_cagayan_de_oro");
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(0);
  const [buttonWidth, setButtonWidth] = useState(17);
  const handleCampusChange = (campus) => {
    setSelectedCampus(campus);
    setCurrentPage(0);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const filteredUserList = userDataList.filter(
    (user) => user["school_campus"] === selectedCampus
  );

  const handleInputChange = (e, userId) => {
    const updatedUserList = userDataList.map((user) =>
      user.id === userId ? { ...user, user_role: e.target.value } : user
    );
    setUserDataList(updatedUserList);
  };

  const totalPages = Math.ceil(filteredUserList.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const visibleUserList = filteredUserList.slice(startIndex, endIndex);

  useEffect(() => {
    const handleResize = () => {
      setButtonWidth(window.innerWidth <= 600 ? 10 : 17);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const capitalizeWords = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const isAdmin = (user) => {
    // Add your logic to check if the user is an admin
    return user.user_role === "admin";
  };

  const handleEdit = (userId) => {
    setEditStates((prevEditStates) => ({
      ...prevEditStates,
      [userId]: !prevEditStates[userId],
    }));
  };

  return (
    <>
      <div className="nav-bar-cont">
        <Navbar></Navbar>
      </div>
      <div className="userlist-cont">
        <div className="btn-cont-userlist">
          {[
            "ustp_alubijid",
            "ustp_cagayan_de_oro",
            "ustp_claveria",
            "ustp_balubal",
            "ustp_jasaan",
            "ustp_oroquieta",
            "ustp_panaon",
            "ustp_villanueva",
          ].map((campus) => (
            <Button
              key={campus}
              style={{
                fontSize: buttonWidth,
                backgroundColor:
                  selectedCampus === campus ? "#FFC000" : "#201b51",
                color: selectedCampus === campus ? "#201b51" : "#FFC000",
              }}
              onClick={() => handleCampusChange(campus)}
            >
              {campus}
            </Button>
          ))}
        </div>
        <div className="table-cont-userlist">
          {visibleUserList.length > 0 ? (
            <div>
              <table className="userlist-table">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>username</th>
                  <th>Birth Date</th>
                  <th>Campus</th>
                  <th>College</th>
                  <th>Email</th>
                  <th>Contact No.</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
                {visibleUserList.map((index) => (
                  <tr key={index.id}>
                    <td>{index.id}</td>
                    <td>
                      {`${index["first_name"]} ${index["middle_name"]} ${index["last_name"]}`}
                    </td>
                    <td>{index["username"]}</td>
                    <td>{index["birth_date"]}</td>
                    <td>{index["school_campus"]}</td>
                    <td>{index["department_type"]}</td>
                    <td>{index["email"]}</td>
                    <td>{index["contact_number"]}</td>
                    <td>{index["user_role"]}</td>
                    <td>
                      {edit[index.id] ? (
                        <select className="select-cont">
                          <option value={userStatus}>active</option>
                          <option value={userStatus}>deactivate</option>
                        </select>
                      ) : (
                        <p>active</p>
                      )}
                    </td>
                    <td>
                      {edit[index.id] ? (
                        <div className="action-btn">
                          <button
                            className="btn-css"
                            onClick={() => handleEdit(index.id)}
                          >
                            <Save></Save>
                          </button>
                          <button
                            className="btn-css"
                            onClick={() => handleEdit(index.id)}
                          >
                            <Cancel></Cancel>
                          </button>
                        </div>
                      ) : (
                        <button
                          className="btn-css"
                          onClick={() => handleEdit(index.id)}
                        >
                          <Edit></Edit>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </table>
              <div className="pagination userlist-page">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={currentPage === i ? "active" : ""}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <Typography variant="body1" color="textSecondary">
              <div className="nothing-con">
                <img className="nothing-img" src={nothing} alt="Nothing" />
                <p className="nothing-p">No user registered in this campus.</p>
              </div>
            </Typography>
          )}
        </div>
      </div>
    </>
  );
}

export default UserList;
