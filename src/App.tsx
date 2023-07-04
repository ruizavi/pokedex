import Pokedex from "./components/Pokedex";
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
