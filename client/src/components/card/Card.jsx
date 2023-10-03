import Styles from "./card.styles.module.css";
import { Link } from "react-router-dom";

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
  let numeroId = String(id).padStart(4, "0");

  return (
    <Link className="detail" to={`/detail/${id}`}>
      <div className={Styles.cardContainer}>
        <h1>
          #{numeroId}-{name}
        </h1>
        <img src={image} alt="" />
        <p>
          Type:
          {types?.map((el) => (
            <span key={el}> {el} </span>
          ))}
        </p>
        <p>Hp:{hp}</p>
        {/* <p>Skills: {skills}</p> */}
      </div>
    </Link>
  );
}
