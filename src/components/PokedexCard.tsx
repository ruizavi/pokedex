import { useState, useEffect, useContext } from "react";
import { Pokemon } from "../interface/pokemon";
import api from "../libs/axios";
import { IPokemonContext, PokemonContext } from "../context/pokemonContext";
import Loader from "./Loader";

interface PokedexRowProps {
  id: string;
}

const usePokemon = (id: string) => {
  const { selectPokemon } = useContext(PokemonContext) as IPokemonContext;
  const [data, setData] = useState<Pokemon>();
  const [isFetching, setIsFetching] = useState<boolean>(true);

  useEffect(() => {
    const fetching = async () => {
      const { data } = await api.get<Pokemon>(`/${id}`);

      setData(data);

      setIsFetching(false);
    };

    fetching().catch();
  }, [id, isFetching]);

  return { data, isFetching, selectPokemon };
};

const PokedexCard = ({ id }: PokedexRowProps) => {
  const { data, isFetching, selectPokemon } = usePokemon(id);

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
