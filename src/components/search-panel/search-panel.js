import React from "react";

import "./search-panel.css";

const SearchPanel = ({ searchStateChange }) => {
    return (
        <input
            type="text"
            className="form-control search-input"
            placeholder="type to search"
            onChange={searchStateChange}
        />
    );
};

export default SearchPanel;
