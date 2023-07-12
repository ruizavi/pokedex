import { Pokemon } from "../interface/pokemon";
import Loader from "./Loader";
import usePokemon from "../hooks/usePokemon";
import { useContext } from "react";
import { IPokemonContext, PokemonContext } from "../context/pokemonContext";

interface PokedexRowProps {
  id: string;
}

const PokedexCard = ({ id }: PokedexRowProps) => {
  const { data, isFetching } = usePokemon(id);
  const { selectPokemon } = useContext(PokemonContext) as IPokemonContext;

  return isFetching ? (
    <Loader />
  ) : (
    <div
      className={`pokedex-card ${data?.types[0].type.name ?? ""}`}
      onClick={() => selectPokemon(data as Pokemon)}
    >
      <img
        src={data?.sprites.front_default}
        alt={`pokemon`}
        title="..."
        loading="lazy"
      />
      <p>{data?.name}</p>
    </div>
  );
};

export default PokedexCard;
