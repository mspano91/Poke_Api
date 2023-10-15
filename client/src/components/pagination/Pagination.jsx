import Style from "../pagination/pagination.styles.module.css";

function Pagination({
  currentPage,
  totalPages,
  nextPage,
  prevPage,
  pagination_butttons,
}) {
  // Define cuántos botones deseas mostrar.
  const maxButtons = 5;

  // Calcula un rango de páginas centrado en la página actual.
  const halfMaxButtons = Math.floor(maxButtons / 2);
  let start = Math.max(1, currentPage - halfMaxButtons);
  let end = Math.min(totalPages, start + maxButtons - 1);
  // Ajusta el rango si estás cerca del inicio o el final.
  if (end - start + 1 < maxButtons) {
    start = Math.max(1, end - maxButtons + 1);
  }

  const pages = Array.from(
    { length: end - start + 1 },
    (_, index) => start + index
  );

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
