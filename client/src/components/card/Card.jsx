import Styles from "./card.styles.module.css";

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
  return (
    <div className={Styles.cardContainer}>
      <h1>
        #{id}-{name.toUpperCase()}
      </h1>
      <img src={image} alt="" />
      <p>
        Type:
        {types?.map((el) => (
          <span> {el} </span>
        ))}
      </p>
      <p>Weight: {weight} lbs</p>
      <p>Height: {height}</p>
      <p>Hp:{hp}</p>
      {/* <p>Skills: {skills}</p> */}
    </div>
  );
}
