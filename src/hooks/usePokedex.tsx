import { useCallback, useEffect, useState } from "react";
import { PokemonMin, IPagination, IPaginationResponse, PokemonResponse } from "..";
import api from "../libs/axios";

function usePokedex() {
  const [data, setData] = useState<PokemonMin[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
    limit: 52,
    offset: 0,
    page: 0,
    total: 1,
  });

  useEffect(() => {
    const fetching = async () => {
      const { data } = await api.get<IPaginationResponse<PokemonResponse>>(
        `?limit=${pagination.limit}&offset=${pagination.offset}`
      );

      setPagination({
        ...pagination,
        total: Math.ceil(data.count / pagination.limit),
      });

      setData(
        data.results.map((p) => ({
          name: p.name,
          id: p.url
            .replace("https://pokeapi.co/api/v2/pokemon/", "")
            .replace("/", ""),
        }))
      );
    };

    fetching().catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page]);

  const pageUp = useCallback(
    () =>
      setPagination({
        ...pagination,
        page: pagination.page + 1,
        offset: pagination.offset + pagination.limit,
      }),
    [pagination.page]
  );

  const pageDown = useCallback(
    () =>
      setPagination({
        ...pagination,
        page: pagination.page - 1,
        offset: pagination.offset - pagination.limit,
      }),
    [pagination.page]
  );

  const changePage = useCallback(
    (i: number) =>
      setPagination({
        ...pagination,
        page: i,
        offset: pagination.limit * i,
      }),
    [pagination.page]
  );

  return { data, pagination, pageUp, pageDown, changePage };
}

export default usePokedex;
