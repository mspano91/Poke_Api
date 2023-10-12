import Style from "../pagination/pagination.styles.module.css";

function Pagination({
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
  pagination_butttons,
}) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className={Style.pagContainer}>
      <button onClick={onPrevPage} disabled={currentPage === 1}>
        PREV PAGE
      </button>
      {pages.map((page) => (
        <button key={page} onClick={() => pagination_butttons(page)}>
          {page}
        </button>
      ))}
      <button onClick={onNextPage} disabled={currentPage === totalPages}>
        NEXT PAGE
      </button>
    </div>
  );
}

export default Pagination;
