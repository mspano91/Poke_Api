import Cards from "../../components/cards/Cards";
import NavBar from "../../components/navBar/NavBar";
import Styles from "../../views/home/home.styles.module.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonsAction, resetAllPokemons } from "../../redux/action";
import Pagination from "../../components/pagination/Pagination";
import Filters from "../../components/FilterBtns/Filters";
import Loading from "../../components/loading/Loading";

function Home() {
  const dispatch = useDispatch();

  const pokemons = useSelector((state) => state.pokemons); //traemos los pokemons del estado global
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  //le damos la logica de como debe renderizar cada pagina
  const pokemonsForPage = 12;
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

  const HandlerReset = () => {
    dispatch(resetAllPokemons());
  };
  //trae la info

  //
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!pokemons.length) {
          await dispatch(getPokemonsAction());
        }
      } catch (error) {
        // Manejo de errores si la solicitud falla
        console.error("Error al obtener los datos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); // Llama a fetchData directamente sin esperar en el setTimeout
  }, [dispatch, pokemons]);

  return (
    <div className={Styles.home_container}>
      {isLoading ? (
        // mostramos el loading mientras el estado isLoading sea true
        <Loading />
      ) : currentPokemons.length ? (
        <div>
          <NavBar />
          <Filters />
          <Cards currentPokemons={currentPokemons} />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(pokemons.length / pokemonsForPage)}
            onNextPage={nextPage}
            onPrevPage={prevPage}
          />
        </div>
      ) : (
        <div className={Styles.notFound}>
          <img src="https://i.pinimg.com/originals/4f/d0/c0/4fd0c049c173c9beb5a0101a84deb6f9.gif"></img>
          <h1>ohoh Not Found!</h1>
          <button onClick={HandlerReset}>¿buged?</button>
        </div>
      )}
    </div>
  );
}

export default Home;
