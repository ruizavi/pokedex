import { useState, useEffect, useContext } from "react";
import { Pokemon } from "../interface/pokemon";
import api from "../libs/axios";
import { IPokemonContext, PokemonContext } from "../context/pokemonContext";

interface PokedexRowProps {
  id: string;
}
const PokedexCard = ({ id }: PokedexRowProps) => {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const { selectPokemon } = useContext(PokemonContext) as IPokemonContext;

  useEffect(() => {
    const fetching = async () => {
      const { data } = await api.get<Pokemon>(`/${id}`);

      setPokemon(data);
    };

    fetching().catch();
  }, [id]);

  return (
    <>
      <div
        className={`pokedex-card ${pokemon?.types[0].type.name ?? ""}`}
        onClick={() => selectPokemon(pokemon as Pokemon)}
      >
        <img
          src={pokemon?.sprites.front_default}
          alt={`pokemon`}
          title="..."
          loading="lazy"
        />
        <p>{pokemon?.name}</p>
      </div>
    </>
  );
};

export default PokedexCard;
