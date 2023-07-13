import { Pokemon } from "..";

interface Props {
  pokemon: Pokemon | undefined;
  close: () => void;
}

function PokemonModal({ pokemon, close }: Props) {
  return (
    <div className="modal">
      <button onClick={close}>x</button>
      <img src={pokemon?.sprites.front_default} />
      <div>
        <h1>{pokemon?.name}</h1>
        <ul>
          {pokemon?.types.map((t, i) => (
            <li key={i} className={t.type.name}>
              {t.type.name}
            </li>
          ))}
        </ul>
      </div>
      {pokemon?.name}
    </div>
  );
}

export default PokemonModal;
