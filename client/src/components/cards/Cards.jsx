import Styles from "./cards.styles.module.css";
import Card from "../card/Card";

export default function Cards({ currentPokemons }) {
  return (
    <div className={Styles.cards_container}>
      {currentPokemons.length
        ? currentPokemons.map(
            ({ id, name, height, types, weight, hp, skills, image }) => (
              <Card
                key={id}
                id={id}
                name={name}
                weight={weight}
                types={types}
                height={height}
                hp={hp}
                skills={skills}
                image={image}
              />
            )
          )
        : null}
    </div>
  );
}
