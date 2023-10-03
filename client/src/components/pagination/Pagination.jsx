import React from "react";

function Pagination({ currentPage, totalPages, onNextPage, onPrevPage }) {
  return (
    <div>
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
