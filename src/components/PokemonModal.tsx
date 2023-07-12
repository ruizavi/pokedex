import { useContext } from "react";
import { IPokemonContext, PokemonContext } from "../context/pokemonContext";

const PokemonModal = () => {
  const { pokemon, selectPokemon } = useContext(
    PokemonContext
  ) as IPokemonContext;

  return (
    <div className="modal">
      <button onClick={() => selectPokemon(null)}>x</button>
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
};

export default PokemonModal;
