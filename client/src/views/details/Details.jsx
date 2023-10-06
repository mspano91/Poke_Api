import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonDetail } from "../../redux/action";

function Details() {
  const navigate = useNavigate();
  const { id } = useParams();
  //este es el id que ingresa por url cada vez que picamos la card

  const dispatch = useDispatch();
  const pokemonDetails = useSelector((state) => state.pokemonDetails);

  useEffect(() => {
    dispatch(getPokemonDetail(id));
  }, [id]);

  let numeroId = String(pokemonDetails.id).padStart(4, "0"); //rellenamos de ceros el numero ID

  return (
    <>
      <button onClick={() => navigate("/home")}>back</button>
      {pokemonDetails ? (
        <div>
          <h1>
            #{numeroId}-{pokemonDetails.name}
          </h1>
          <img src={pokemonDetails.image} alt="" />
          <p>
            Type:
            {pokemonDetails.types?.map((el) => (
              <span key={el.name}> {el.name} </span>
            ))}
          </p>
          <p>Weight: {pokemonDetails.weight} lbs</p>
          <p>Height: {pokemonDetails.height}</p>
          <p>Hp: {pokemonDetails.hp}</p>
          <p>Skills: {pokemonDetails.skills}</p>
          <p>Speed: {pokemonDetails.speed}</p>
          <p>Defense: {pokemonDetails.defense}</p>
          <p>Attack: {pokemonDetails.attack}</p>
        </div>
      ) : null}
    </>
  );
}

export default Details;
