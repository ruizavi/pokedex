import Arrow from "./Arrow";

interface PaginationProps {
  pageUp: () => void;
  pageDown: () => void;
  changePage: (i: number) => void;
  totalPages: number;
  current: number;
}

const Pagination = ({
  changePage,
  pageDown,
  pageUp,
  totalPages,
  current,
}: PaginationProps) => {
  return (
    <div className="pagination">
      <button onClick={pageDown} disabled={current === 0}>
        <Arrow />
      </button>
      <div className="pagination-list">
        {Array(totalPages)
          .fill(0)
          .map((_, i) => (
            <span
              className={`pagination-item ${
                current === i ? "pagination-item-active" : ""
              }`}
              key={i}
              onClick={() => changePage(i)}
            >
              {i + 1}
            </span>
          ))}
      </div>
      <button onClick={pageUp} disabled={current === totalPages - 1}>
        <Arrow degree={180} />
      </button>
    </div>
  );
};

export default Pagination;
