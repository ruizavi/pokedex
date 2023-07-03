import Pokedex from "./components/PokedexGrid";

const App = () => {
  return (
    <div style={{ overflowY: "hidden", height: "100vh" }}>
      <Pokedex />
    </div>
  );
};

export default App;
