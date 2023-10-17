import { useDispatch } from "react-redux";
import Styles from "./card.styles.module.css";
import { useNavigate } from "react-router-dom";
import { deletePokemon } from "../../redux/action";
import Swal from "sweetalert2";

export default function Card({ id, image, name, types }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //completing number id with 4 zeros
  let id_ = String(id).padStart(4, "0");
  //if number is more than 4 digits should cut the number in 4
  let numeroId = id_.substring(0, 4);

  const handleDelete = () => {
    // show alert confirmation
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      background: "#1A1A1A",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // delete pokemon if is confirmed
        dispatch(deletePokemon(id));
        Swal.fire({
          title: "Deleted!",
          text: "Your pokemon has been deleted",
          background: "#1A1A1A",
          confirmButtonColor: "#3085d6",
        });
      }
    });
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

        <div>
          {types?.map((el) => (
            <p key={el.name}> {el.name} </p>
          ))}
        </div>

        {typeof id !== "number" && <button onClick={handleDelete}>X</button>}
        {/* if id is Nan render button delete  */}
      </div>
    </>
  );
}
