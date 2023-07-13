import { useState, useEffect, useCallback } from "react";
import api from "../libs/axios";
import { Pokemon } from "..";

const usePokemon = (id: string) => {
  const [data, setData] = useState<Pokemon>();
  const [isFetching, setIsFetching] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetching = async () => {
      const { data } = await api.get<Pokemon>(`/${id}`);

      setData(data);

      setIsFetching(false);
    };

    fetching().catch();
  }, [id, isFetching]);

  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  return { data, isFetching, openModal, closeModal, open };
};

export default usePokemon;
