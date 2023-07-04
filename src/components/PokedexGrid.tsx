import { useContext } from "react";
import PokedexCard from "./PokedexCard";
import Pagination from "./Pagination";
import { IPokemonContext, PokemonContext } from "../context/pokemonContext";

const Pokedex = () => {
  const { pokemons, pagination, pageDown, pageUp, changePage } = useContext(
    PokemonContext
  ) as IPokemonContext;

  return (
    <>
      <div className="pokedex-grid">
        {pokemons.map((p, i) => (
          <PokedexCard id={p.id} key={i} />
        ))}
      </div>
      <Pagination
        pageUp={pageUp}
        pageDown={pageDown}
        changePage={changePage}
        totalPages={pagination.total}
        current={pagination.page}
      />
      {/* <div className="modal">
      </div> */}
    </>
  );
};

export default Pokedex;
