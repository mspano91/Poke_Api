import { useDispatch } from "react-redux";
import Styles from "./card.styles.module.css";
import { useNavigate } from "react-router-dom";
import { deletePokemon } from "../../redux/action";
import { useState } from "react";

export default function Card({
  id,
  image,
  name,
  height,
  types,
  weight,
  hp,
  skills,
}) {
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //rellenamos de ceros hasta 4 digitos si no los tiene
  let id_ = String(id).padStart(4, "0");
  //si el numero tiene mas de 4 digitos lo cortamos en 4
  let numeroId = id_.substring(0, 4);

  const handleDelete = () => {
    // Muestra la alerta de confirmación
    setShowAlert(true);
  };

  const handleConfirmDelete = () => {
    // Realiza la eliminación solo si el usuario confirma
    dispatch(deletePokemon(id));
    setShowAlert(false);
  };

  const handleCancelDelete = () => {
    // Cancela la eliminación si el usuario cancela
    setShowAlert(false);
  };

  const colorsTypes = {
    default: Styles.cardContainer,
    normal: Styles.cardNormal,
    fighting: Styles.cardFighting,
    flying: Styles.cardFlying,
    poison: Styles.cardPoison,
    ground: Styles.cardGround,
    rock: Styles.cardRock,
    bug: Styles.cardBug,
    ghost: Styles.cardGhost,
    steel: Styles.cardSteel,
    fire: Styles.cardFire,
    water: Styles.cardWater,
    electric: Styles.cardElectric,
    grass: Styles.cardGrass,
    psychic: Styles.cardPsychic,
    ice: Styles.cardIce,
    dragon: Styles.carddragon,
    dark: Styles.cardDark,
    fairy: Styles.cardFairy,
  };

  // Usamos 'hasWaterType' para determinar la clase
  const containerClassName = colorsTypes[types[0].name] || Styles.cardContainer;

  return (
    <>
      <div className={containerClassName}>
        <div onClick={() => navigate(`/detail/${id}`)}>
          <img className={Styles.imagen} src={image} alt="" />
        </div>

        <div className={Styles.details}>
          <h1>#{numeroId}</h1>
          <h2>{name}</h2>
        </div>
        <div className={Styles.Ptypes}>
          {types?.map((el) => (
            <p key={el.name}> {el.name} </p>
          ))}
        </div>
        {typeof id !== "number" && <button onClick={handleDelete}>X</button>}
        {/* si el id no es numero entonces renderizame el boton  */}
      </div>

      {/* //alerta de eliminar card */}
      {showAlert && (
        <div className={Styles.confirmation}>
          <p>¿Estás seguro de que deseas eliminar esta tarjeta?</p>
          <button onClick={handleConfirmDelete}>Sí</button>
          <button onClick={handleCancelDelete}>No</button>
        </div>
      )}
    </>
  );
}
