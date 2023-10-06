import Cards from "../../components/cards/Cards";
import NavBar from "../../components/navBar/NavBar";
import Styles from "../../views/home/home.styles.module.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonsAction } from "../../redux/action";
import Pagination from "../../components/pagination/Pagination";

function Home() {
  const dispatch = useDispatch();

  //trae la info
  useEffect(() => {
    dispatch(getPokemonsAction());
  }, [dispatch]);

  const pokemons = useSelector((state) => state.pokemons); //traemos los pokemons del estado global
  const [currentPage, setCurrentPage] = useState(1);

  //le damos la logica de como debe renderizar cada pagina
  const pokemonsForPage = 8;
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
    <div className={Styles.home_container}>
      <NavBar />
      <Cards currentPokemons={currentPokemons} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(pokemons.length / pokemonsForPage)}
        onNextPage={nextPage}
        onPrevPage={prevPage}
      />
    </div>
  );
}

export default Home;
