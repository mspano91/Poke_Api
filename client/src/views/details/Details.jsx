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

  console.log(pokemonDetails);

  //rellenamos de ceros hasta 4 digitos si no los tiene
  let id_ = String(id).padStart(4, "0");
  //si el numero tiene mas de 4 digitos lo cortamos en 4
  let numeroId = id_.substring(0, 4);

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
    flying: Styles.details_flying,
    psychic: Styles.details_psychic,
    ghost: Styles.details_ghost,
    ice: Styles.details_ice,
    rock: Styles.details_rock,
    dragon: Styles.details_dragon,
    dark: Styles.details_dark,
    steel: Styles.details_steel,
  };

  // Usamos 'hasWaterType' para determinar la clase
  const containerClassName =
    pokemonDetails.types && pokemonDetails.types.length > 0
      ? colorsDetail[pokemonDetails.types[0].name]
      : "";

  return (
    <>
      {pokemonDetails.id ? (
        <div className={containerClassName}>
          <h1 className={Styles.name}>
            #{numeroId}-{pokemonDetails.name}
          </h1>
          <div className={`${Styles.ConfiAll} ${Styles["slide-in"]}`}>
            {/* ${Styles["slide-in"] aca estamos haciendo la animacion del detail */}
            <div className={Styles.name_id}>
              <img src={pokemonDetails.image} alt="" />
            </div>
            <div className={Styles.information}>
              <p className={Styles.hp}>HP: {pokemonDetails.hp}</p>
              <p>
                {pokemonDetails.types?.map((el) => (
                  <span className={Styles.hp} key={el.name}>
                    {" "}
                    {el.name}{" "}
                  </span>
                ))}
              </p>
              <p>Speed: {pokemonDetails.speed}</p>
              <p>Attack: {pokemonDetails.attack}</p>
              <p>Height: {pokemonDetails.height}</p>
              <p>Defense: {pokemonDetails.defense}</p>
              <p>Skills: {pokemonDetails.skills}</p>
              <p>Weight: {pokemonDetails.weight} lbs</p>
            </div>
          </div>
          <button className={Styles.btn} onClick={() => navigate("/home")}>
            Back
          </button>
        </div>
      ) : null}
    </>
  );
}

export default Details;
