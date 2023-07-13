import usePokedex from "../hooks/usePokedex";
import Pagination from "./Pagination";
import PokedexGrid from "./PokedexGrid";



function Pokedex() {
  const { pagination, pageUp, pageDown, changePage, data } = usePokedex();

  return (
    <>
      <PokedexGrid data={data} />
      <Pagination
        changePage={changePage}
        pageDown={pageDown}
        pageUp={pageUp}
        current={pagination.page}
        total={pagination.total}
      />
    </>
  );
}

export default Pokedex;
