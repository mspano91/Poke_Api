import Style from "../pagination/pagination.styles.module.css";

function Pagination({
  currentPage,
  totalPages,
  nextPage,
  prevPage,
  pagination_butttons,
}) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  // we made a array of total page

  return (
    <div className={Style.pagContainer}>
      <button onClick={prevPage} disabled={currentPage === 1}>
        PREV PAGE
      </button>
      {pages.map((page) => (
        <button key={page} onClick={() => pagination_butttons(page)}>
          {page}
        </button>
      ))}
      <button onClick={nextPage} disabled={currentPage === totalPages}>
        NEXT PAGE
      </button>
    </div>
  );
}

export default Pagination;
