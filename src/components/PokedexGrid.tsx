import { useContext } from "react";
import { PokemonContext, IPokemonContext } from "../context/pokemonContext";
import PokedexCard from "./PokedexCard";

const PokedexGrid = () => {
  const { pokemons } = useContext(PokemonContext) as IPokemonContext;
  
  return (
    <div className="pokedex-grid">
      {pokemons.map((p, i) => (
        <PokedexCard id={p.id} key={i} />
      ))}
    </div>
  );
};

export default PokedexGrid;
