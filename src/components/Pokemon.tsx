import usePokemon from "../hooks/usePokemon";
import PokedexCard from "./PokedexCard";
import PokemonModal from "./PokemonModal";

interface Props {
  id: string;
}

function Pokemon({ id }: Props) {
  const { data, isFetching, open, closeModal, openModal } = usePokemon(id);

  return (
    <>
      <PokedexCard
        open={openModal}
        isFetching={isFetching}
        image={data?.sprites.front_default || ""}
        name={data?.name || ""}
        type={data?.types[0].type.name || ""}
      />
      {open ? <PokemonModal pokemon={data} close={closeModal} /> : null}
    </>
  );
}

export default Pokemon;
