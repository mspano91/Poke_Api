import Styles from "./cards.styles.module.css";
import Card from "../card/Card";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Pagination from "../pagination/Pagination"; // Importa el componente de paginación

export default function Cards({}) {
  const pokemons = useSelector((state) => state.pokemons); //traemos los pokemons del estado global
  const [currentPage, setCurrentPage] = useState(1);

  //le damos la logica de como debe renderizar cada pagina
  const pokemonsForPage = 10;
  const start = (currentPage - 1) * pokemonsForPage;

  const end = start + pokemonsForPage;

  const currentPokemons = pokemons.slice(start, end);

  const nextPage = () => {
    //aumentamos en 1 el useState
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    // comprobamos si la página actual es mayor que 1 antes de disminuir la página.
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

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
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(pokemons.length / pokemonsForPage)}
        onNextPage={nextPage}
        onPrevPage={prevPage}
      />
    </div>
  );
}
