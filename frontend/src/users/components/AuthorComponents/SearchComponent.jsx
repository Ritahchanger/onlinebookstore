import React from "react";
import "./SearchComponent.css";

const SearchComponent = ({ searchTerm, filterType, handleSearchChange, handleFilterChange }) => {
  return (
    <div className="search_component">
      <div className="row">
        <form className="search">
          <input
            type="text"
            name="search"
            id=""
            placeholder="Search author by author name.."
            value={searchTerm}
            onChange={handleSearchChange} // Use handleSearchChange function passed as prop
          />
            <i className="fa-solid fa-magnifying-glass"></i>
        </form>
        {/* <div className="filter_form">
          <p className="small-header">Filter by</p>
          <select
            name="filterBy"
            id="#"
            value={filterType}
            onChange={handleFilterChange} // Use handleFilterChange function passed as prop
          >
            <option value="gender">Author Gender</option>
            <option value="career">Authors Name</option>
          </select>
        </div> */}
      </div>
    </div>
  );
};

export default SearchComponent;
