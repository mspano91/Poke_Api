import { createDispatchHook, useDispatch } from "react-redux";
import Styles from "./card.styles.module.css";
import { useNavigate } from "react-router-dom";
import { deletePokemon } from "../../redux/action";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //rellenamos de ceros hasta 4 digitos si no los tiene
  let id_ = String(id).padStart(4, "0");
  //si el numero tiene mas de 4 digitos lo cortamos en 4
  let numeroId = id_.substring(0, 4);

  const handleDelete = () => {
    dispatch(deletePokemon(id));
  };

  return (
    <>
      <div className={Styles.cardContainer}>
        <div onClick={() => navigate(`/detail/${id}`)}>
          <img className={Styles.imagen} src={image} alt="" />
        </div>
        <div className={Styles.details}>
          <h1>#{numeroId}</h1>
          <h2>{name}</h2>
        </div>
        <div>
          <p>
            {types?.map((el) => (
              <span key={el.name}> {el.name} </span>
            ))}
          </p>
        </div>
        {typeof id !== "number" && <button onClick={handleDelete}>X</button>}
        {/* si el id no es numero entonces renderizame el boton  */}
      </div>
    </>
  );
}
