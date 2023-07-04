import Pokedex from "./components/PokedexGrid";
import PokemonProvider from "./context/pokemonContext";

const App = () => {
  return (
    <PokemonProvider>
      <div
        style={{ overflowY: "hidden", height: "100vh", position: "relative" }}
      >
        <Pokedex />
      </div>
    </PokemonProvider>
  );
};

export default App;
