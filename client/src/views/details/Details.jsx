import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonDetail } from "../../redux/action";
import Styles from "../details/details.styles.module.css";

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

  const colorsDetail = {
    water: Styles.details_Water,
    fire: Styles.details_fire,
    electric: Styles.details_electric,
    grass: Styles.details_grass,
    bug: Styles.details_bug,
    normal: Styles.details_normal,
    poison: Styles.details_poison,
    ground: Styles.details_ground,
    fairy: Styles.details_fairy,
    fighting: Styles.details_fighting,
    psychic: Styles.details_psychic,
    ghost: Styles.details_ghost,
    ice: Styles.details_ice,
    rock: Styles.details_rock,
    dragon: Styles.details_dragon,
  };

  // Usamos 'hasWaterType' para determinar la clase
  const containerClassName =
    pokemonDetails.types && pokemonDetails.types.length > 0
      ? colorsDetail[pokemonDetails.types[0].name]
      : "";

  return (
    <>
      {pokemonDetails ? (
        <div className={containerClassName}>
          <div className={Styles.ConfiAll}>
            <div className={Styles.name_id}>
              <h1>
                #{numeroId}-{pokemonDetails.name}
              </h1>
              <img src={pokemonDetails.image} alt="" />
            </div>
            <div className={Styles.information}>
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
          </div>
          <button className={Styles.btn} onClick={() => navigate("/home")}>
            back
          </button>
        </div>
      ) : null}
    </>
  );
}

export default Details;
