import Pokedex from "./components/Pokedex";

const App = () => {
  return (
    <div style={{ overflowY: "hidden", height: "100vh", position: "relative" }}>
      <Pokedex />
    </div>
  );
};

export default App;
