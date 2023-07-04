import { useContext } from "react";
import { IPokemonContext, PokemonContext } from "../context/pokemonContext";

const PokemonModal = () => {
  const { pokemon, selectPokemon } = useContext(
    PokemonContext
  ) as IPokemonContext;

  return (
    <div className="modal">
      <button onClick={() => selectPokemon(null)}>x</button>
      {pokemon?.name}
    </div>
  );
};

export default PokemonModal;
