import React from "react";
import Style from "../pagination/pagination.styles.module.css";

function Pagination({ currentPage, totalPages, onNextPage, onPrevPage }) {
  return (
    <div className={Style.pagContainer}>
      <button onClick={onPrevPage} disabled={currentPage === 1}>
        PREV PAGE
      </button>
      <button onClick={onNextPage} disabled={currentPage === totalPages}>
        NEXT PAGE
      </button>
    </div>
  );
}

export default Pagination;
