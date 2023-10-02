import Styles from "./cards.styles.module.css";
import Card from "../card/Card";
import { useSelector } from "react-redux";

export default function Cards() {
  const pokemons = useSelector((state) => state.pokemons);
  return (
    <div className={Styles.cards_container}>
      {pokemons.length
        ? pokemons?.map(
            ({ id, name, height, types, weight, hp, skills, image }) => {
              return (
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
              );
            }
          )
        : null}
    </div>
  );
}
