import React from "react";

const SearchBar = ({ onSearch }) => {
    return (
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
            <input
                type="text"
                placeholder="Search for items..."
                onChange={(e) => onSearch(e.target.value)}
                style={{
                    padding: "10px",
                    width: "50%",
                    fontSize: "16px",
                    borderRadius: "5px",
                    border: "1px solid white",
                    backgroundColor:"transparent",
                    color:"white"
                }}
            />
        </div>
    );
};

export default SearchBar;
