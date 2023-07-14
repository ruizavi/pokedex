import { useCallback, useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { Pokemon } from "..";
import PokemonModal from "./PokemonModal";
import api from "../libs/axios";

function Search() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<Pokemon>();
  const [open, setOpen] = useState(false);

  const debounced = useDebounce(search.toLocaleLowerCase(), 500);

  useEffect(() => {
    if (search === "") return;

    const fetching = async () => {
      const { data } = await api.get<Pokemon>(`/${search}`);

      return data;
    };

    fetching()
      .then((data) => {
        setData(data);
        setOpen(true);
      })
      .catch(() => alert(`Pokemon ${search} not found`));
  }, [debounced]);

  const closeModal = useCallback(() => setOpen(false), []);

  return (
    <>
      <input
        placeholder="Pikachu..."
        className="pokemon-search"
        type="text"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      {open ? <PokemonModal pokemon={data} close={closeModal} /> : null}
    </>
  );
}

export default Search;
