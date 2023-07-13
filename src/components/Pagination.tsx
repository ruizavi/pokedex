import Arrow from "./Arrow";

interface Props {
  pageDown: () => void;
  pageUp: () => void;
  changePage: (p: number) => void;
  current: number;
  total: number;
}

type PaginationPageProps = Omit<Props, "pageDown" | "pageUp">;

function Pagination({ changePage, current, pageDown, pageUp, total }: Props) {
  return (
    <div className="pagination">
      <button onClick={pageDown} disabled={current === 0}>
        <Arrow />
      </button>
      <div className="pagination-list">
        <PaginationPage
          changePage={changePage}
          current={current}
          total={total}
        />
      </div>
      <button onClick={pageUp} disabled={current === total - 1}>
        <Arrow degree={180} />
      </button>
    </div>
  );
}

function PaginationPage({ changePage, current, total }: PaginationPageProps) {
  const getPageRange = () => {
    const rangeSize = 1;
    const totalPages = total;
    const currentPage = current + 1;

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
            current === i - 1 ? "pagination-item-active" : ""
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
}

export default Pagination;
