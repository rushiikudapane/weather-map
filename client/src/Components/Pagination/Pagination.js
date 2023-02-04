//code for page change buttons

import React from "react";
import "./Pagination.css";

const Pagination = ({ setCurrentPage }) => {
  let pages = [];
  //to set total number of pages
  for (let i = 1; i <= 3; i++) {
    pages.push(i);
  }
  return (
    <div>
      {pages.map((page, index) => {
        return (
          <button
            className="btn"
            key={index}
            onClick={() => setCurrentPage(page)} //to set current page
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
