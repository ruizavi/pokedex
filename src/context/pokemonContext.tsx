import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { PokemonMin, PokemonResponse } from "../interface/pokemon";
import api from "../libs/axios";
import { IPagination, IPaginationResponse } from "../interface/pagination";

export interface IPokemonContext {
  pokemons: PokemonMin[];
  pagination: IPagination;
  pageUp: () => void;
  pageDown: () => void;
  changePage: (i: number) => void;
}

export const PokemonContext = createContext<IPokemonContext | null>(null);

const PokemonProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [pagination, setPagination] = useState<IPagination>({
    limit: 52,
    offset: 0,
    page: 0,
    total: 1,
  });

  const [pokemons, setResult] = useState<PokemonMin[]>([]);

  useEffect(() => {
    const fetching = async () => {
      const { data } = await api.get<IPaginationResponse<PokemonResponse>>(
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
    <PokemonContext.Provider
      value={{ pokemons, pagination, pageDown, pageUp, changePage }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;
