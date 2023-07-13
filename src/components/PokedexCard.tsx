import Loader from "./Loader";

interface Props {
  image: string;
  name: string;
  type: string;
  isFetching: boolean;
  open: () => void;
}

function PokedexCard({ image, name, type, isFetching, open }: Props) {
  return isFetching ? (
    <Loader />
  ) : (
    <div className={`pokedex-card ${type}`} onClick={open}>
      <img src={image} alt={name} title={name} width={96} height={96}/>
      <p>{name}</p>
    </div>
  );
}

export default PokedexCard;
