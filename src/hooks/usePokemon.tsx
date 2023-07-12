import { useState, useEffect } from "react";
import { Pokemon } from "../interface/pokemon";
import api from "../libs/axios";

const usePokemon = (id: string) => {
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

  return { data, isFetching };
};

export default usePokemon;
