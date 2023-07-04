import { useContext } from "react";
import Pagination from "./Pagination";
import { IPokemonContext, PokemonContext } from "../context/pokemonContext";
import PokemonModal from "./PokemonModal";
import PokedexGrid from "./PokedexGrid";

const Pokedex = () => {
  const { pokemon } = useContext(PokemonContext) as IPokemonContext;

  return (
    <>
      <PokedexGrid />
      <Pagination />
      {pokemon !== null ? <PokemonModal /> : null}
    </>
  );
};

export default Pokedex;
