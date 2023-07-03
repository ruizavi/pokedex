import { useEffect, useState } from "react";
import api from "../libs/axios";
import { PokemonResponse } from "../interface/pokemon";
import PokedexCard from "./PokedexCard";
import Pagination from "./Pagination";
import { IPagination } from "../interface/pagination";

const Pokedex = () => {
  const [pagination, setPagination] = useState<{
    limit: number;
    offset: number;
    page: number;
    total: number;
  }>({
    limit: 52,
    offset: 0,
    page: 0,
    total: 1,
  });

  const [result, setResult] = useState<{ name: string; id: string }[]>([]);

  useEffect(() => {
    const fetching = async () => {
      const { data } = await api.get<IPagination<PokemonResponse>>(
        `?limit=${pagination.limit}&offset=${pagination.offset}`
      );

      setPagination({
        ...pagination,
        total: Math.ceil(data.count / pagination.limit),
      });

      setResult(
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

  const changePage = (i: number) => {
    setPagination({
      ...pagination,
      page: i,
      offset: pagination.limit * i,
    });
  };

  return (
    <>
      <div className="pokedex-grid">
        {result.map((p, i) => (
          <PokedexCard id={p.id} key={i} />
        ))}
      </div>
      <Pagination
        pageUp={pageUp}
        pageDown={pageDown}
        changePage={changePage}
        totalPages={pagination.total}
        current={pagination.page}
      />
      {/* <div className="modal">
      </div> */}
    </>
  );
};

export default Pokedex;
