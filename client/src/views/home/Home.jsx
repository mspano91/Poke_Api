import Cards from "../../components/cards/Cards";
import NavBar from "../../components/navBar/NavBar";
import Styles from "../../views/home/home.styles.module.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemonsAction,
  resetAllPokemons,
  resetDetails,
} from "../../redux/action";
import Pagination from "../../components/pagination/Pagination";
import Filters from "../../components/FilterBtns/Filters";
import Loading from "../../components/loading/Loading";

function Home() {
  const dispatch = useDispatch();

  const pokemons = useSelector((state) => state.pokemons); //takin global state redux
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  //pagination
  const pokemonsForPage = 8;
  const start = (currentPage - 1) * pokemonsForPage;
  const end = start + pokemonsForPage;
  const currentPokemons = pokemons.slice(start, end);

  const prevPage = () => {
    // comprobamos si la página actual es mayor que 1 antes de disminuir la página.
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  const nextPage = () => {
    //aumentamos en 1 el useState
    setCurrentPage((prevPage) => prevPage + 1);
    console.log(currentPage);
  };

  const pagination_butttons = (page) => {
    setCurrentPage(page);
  };

  const HandlerReset = () => {
    dispatch(resetAllPokemons());
  };

  //
  useEffect(() => {
    const fetchData = async () => {
      dispatch(resetDetails()); //aca vaciamos el array de details para que cuando me renderiza el nuevo se borre el anterior antes y no lo renderice
      try {
        if (!pokemons.length) {
          await dispatch(getPokemonsAction());
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch, pokemons]);

  useEffect(() => {
    setCurrentPage(1);
  }, [pokemons.length]);

  return (
    <div className={Styles.home_container}>
      {isLoading ? (
        // show me loading while isLoading is true
        <Loading />
      ) : currentPokemons.length ? (
        <div>
          <NavBar />
          <Filters />
          <Cards currentPokemons={currentPokemons} />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(pokemons.length / pokemonsForPage)}
            nextPage={nextPage}
            prevPage={prevPage}
            pagination_butttons={pagination_butttons}
          />
        </div>
      ) : (
        <div className={Styles.notFound}>
          <img src="https://i.pinimg.com/originals/4f/d0/c0/4fd0c049c173c9beb5a0101a84deb6f9.gif"></img>
          <h1>ohoh Not Found!</h1>
          <button onClick={HandlerReset}>exit?</button>
        </div>
      )}
    </div>
  );
}

export default Home;
