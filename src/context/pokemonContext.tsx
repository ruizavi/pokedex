import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { Pokemon, PokemonMin, PokemonResponse } from "../interface/pokemon";
import api from "../libs/axios";
import { IPagination, IPaginationResponse } from "../interface/pagination";
import usePagination from "../hooks/usePagination";

export interface IPokemonContext {
  pokemons: PokemonMin[];
  pokemon: Pokemon | null;
  pagination: IPagination;
  pageUp: () => void;
  pageDown: () => void;
  changePage: (i: number) => void;
  selectPokemon: (p: Pokemon | null) => void;
}

export const PokemonContext = createContext<IPokemonContext | null>(null);

const PokemonProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { pagination, pageDown, pageUp, changePage, changeState } =
    usePagination();

  const [pokemons, setPokemons] = useState<PokemonMin[]>([]);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const fetching = async () => {
      const { data } = await api.get<IPaginationResponse<PokemonResponse>>(
        `?limit=${pagination.limit}&offset=${pagination.offset}`
      );

      changeState({
        ...pagination,
        total: Math.ceil(data.count / pagination.limit),
      });

      setPokemons(
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

  const selectPokemon = (p: Pokemon | null) => {
    setPokemon(p);
  };

  return (
    <PokemonContext.Provider
      value={{
        pokemons,
        pokemon,
        pagination,
        pageDown,
        pageUp,
        changePage,
        selectPokemon,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;
