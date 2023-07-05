import { useContext, useState, useEffect } from "react";
import { PokemonContext, IPokemonContext } from "../context/pokemonContext";
import { Pokemon } from "../interface/pokemon";
import api from "../libs/axios";

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

export default usePokemon;
