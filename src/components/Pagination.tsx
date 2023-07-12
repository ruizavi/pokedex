import { useContext } from "react";
import { PokemonContext, IPokemonContext } from "../context/pokemonContext";
import Arrow from "./Arrow";

const PaginationPage = () => {
  const { pagination, changePage } = useContext(
    PokemonContext
  ) as IPokemonContext;

  const getPageRange = () => {
    const rangeSize = 1;
    const totalPages = pagination.total;
    const currentPage = pagination.page + 1;

    let rangeStart = Math.max(1, currentPage - rangeSize);
    let rangeEnd = Math.min(totalPages, currentPage + rangeSize);

    const pages = [];

    if (currentPage - rangeSize > 1) {
      pages.push(
        <span className="pagination-item" key={1} onClick={() => changePage(0)}>
          1
        </span>
      );

      if (currentPage - rangeSize > 2) {
        pages.push(
          <span className="pagination-item-ellipsis" key="start-ellipsis">
            ...
          </span>
        );
      }
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(
        <span
          className={`pagination-item ${
            pagination.page === i - 1 ? "pagination-item-active" : ""
          }`}
          key={i}
          onClick={() => changePage(i - 1)}
        >
          {i}
        </span>
      );
    }

    if (currentPage + rangeSize < totalPages) {
      if (currentPage + rangeSize + 1 < totalPages) {
        pages.push(
          <span className="pagination-item-ellipsis" key="end-ellipsis">
            ...
          </span>
        );
      }

      pages.push(
        <span
          className="pagination-item"
          key={totalPages}
          onClick={() => changePage(totalPages - 1)}
        >
          {totalPages}
        </span>
      );
    }

    return pages;
  };

  return <>{getPageRange()}</>;
};

const Pagination = () => {
  const { pagination, pageDown, pageUp } = useContext(
    PokemonContext
  ) as IPokemonContext;

  return (
    <div className="pagination">
      <button onClick={pageDown} disabled={pagination.page === 0}>
        <Arrow />
      </button>
      <div className="pagination-list">
        <PaginationPage />
      </div>
      <button
        onClick={pageUp}
        disabled={pagination.page === pagination.total - 1}
      >
        <Arrow degree={180} />
      </button>
    </div>
  );
};

export default Pagination;
