import { Pokemon } from "..";
import Close from "./Close";

interface Props {
  pokemon: Pokemon | undefined;
  close: () => void;
}

function PokemonModal({ pokemon, close }: Props) {
  return (
    <div className="modal-container" onClick={close}>
      <div className="modal">
        <button onClick={close}>
          <Close size="16px" />
        </button>
        <img src={pokemon?.sprites.front_default} />
        <h1>{pokemon?.name}</h1>
        <ul>
          {pokemon?.types.map((t, i) => (
            <li key={i} className={t.type.name}>
              {t.type.name}
            </li>
          ))}
        </ul>
        <div id="pokemon-stats">
          {pokemon?.stats.map((s) => (
            <p key={s.stat.url}>
              {s.stat.name}: {s.base_stat}
            </p>
          ))}
        </div>
        <p>Base experience: {pokemon?.base_experience}</p>
        <p>Height: {pokemon?.height}</p>
      </div>
    </div>
  );
}

export default PokemonModal;
