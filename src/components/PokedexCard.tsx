import { Pokemon } from "../interface/pokemon";
import Loader from "./Loader";
import usePokemon from "../hooks/usePokemon";

interface PokedexRowProps {
  id: string;
}

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
