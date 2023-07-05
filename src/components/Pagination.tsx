import { useContext } from "react";
import { PokemonContext, IPokemonContext } from "../context/pokemonContext";
import Arrow from "./Arrow";

const Pagination = () => {
  const { pagination, pageDown, pageUp, changePage } = useContext(
    PokemonContext
  ) as IPokemonContext;

  return (
    <div className="pagination">
      <button onClick={pageDown} disabled={pagination.page === 0}>
        <Arrow />
      </button>
      <div className="pagination-list">
        {Array(pagination.total)
          .fill(0)
          .map((_, i) => (
            <span
              className={`pagination-item ${
                pagination.page === i ? "pagination-item-active" : ""
              }`}
              key={i}
              onClick={() => changePage(i)}
            >
              {i + 1}
            </span>
          ))}
      </div>
      <button
        onClick={pageUp}
        disabled={pagination.page == pagination.total - 1}
      >
        <Arrow degree={180} />
      </button>
    </div>
  );
};

export default Pagination;
