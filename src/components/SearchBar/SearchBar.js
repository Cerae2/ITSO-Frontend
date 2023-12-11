import { SearchOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import "./searchbar.css";
import { Button } from "@mui/material";

function SearchBar({ onChange }) {
  return (
    <div className="search-container">
      <input
        onChange={onChange}
        className="search-input"
        placeholder="search..."
      ></input>
      <Button
        style={{
          height: 50,
          width: 100,
          color: "#FFC000",
          backgroundColor: "#16194d",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 0,
        }}
      >
        <SearchOutlined
          className="icon-search"
          style={{ color: "#FFC000", fontSize: 30 }}
        ></SearchOutlined>
      </Button>
    </div>
  );
}

export default SearchBar;
