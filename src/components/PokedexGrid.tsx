import { useEffect, useState } from "react";
import api from "../libs/axios";
import { Pagination } from "../interface/pagination";
import { Pokemon, PokemonResponse } from "../interface/pokemon";

const PokedexGrid = () => {
  const [pagination, setPagination] = useState<{
    limit: number;
    offset: number;
    page: number;
    total: number;
  }>({
    limit: 24,
    offset: 0,
    page: 0,
    total: 1,
  });

  const [result, setResult] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetching = async () => {
      const { data } = await api.get<Pagination<PokemonResponse>>(
        `?limit=${pagination.limit}&offset=${pagination.offset}`
      );

      setPagination({
        ...pagination,
        total: Math.floor(data.count / pagination.limit),
      });

      setResult(
        data.results.map((p) => ({
          name: p.name,
          id: Number(
            p.url
              .replace("https://pokeapi.co/api/v2/pokemon/", "")
              .replace("/", "")
          ),
        }))
      );
    };

    fetching().catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page]);

  const pageUp = () =>
    setPagination({
      ...pagination,
      page: pagination.page + 1,
      offset: pagination.offset + pagination.limit,
    });

  const pageDown = () =>
    setPagination({
      ...pagination,
      page: pagination.page - 1,
      offset: pagination.offset - pagination.limit,
    });

  return (
    <div className="flex justify-around">
      {result.map((p) => (
        <p key={p.id}>{p.name}</p>
      ))}
      <button onClick={pageUp}>+1</button>
      <button onClick={pageDown}>-1</button>
    </div>
  );
};

export default PokedexGrid;
