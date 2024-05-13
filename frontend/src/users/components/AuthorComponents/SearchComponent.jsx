import React from "react";

import "./SearchComponent.css";

const SearchComponent = () => {
  return (
    <div className="seach_component">
      <div className="row">
        <form className="search">
          <input type="text" name="search" id="" placeholder="Author name..." />
          <button type="submit">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
        <div className="filter_form">
          <p className="small-header">Filter by</p>
          <select name="filterBy" id="#">
            <option value="nationality">Nationality</option>
            <option value="gender">Author Gender</option>
            <option value="career">Authors Career</option>
            <option value="awards">Literacy Awards</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
