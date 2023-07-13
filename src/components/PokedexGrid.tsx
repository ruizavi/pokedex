import { PokemonMin } from "..";
import Pokemon from "./Pokemon";

interface Props {
  data: PokemonMin[];
}

function PokedexGrid({ data }: Props) {
  return (
    <div className="pokedex-grid">
      {data.map((p, i) => (
        <Pokemon id={p.id} key={i} />
      ))}
    </div>
  );
}

export default PokedexGrid;
