import Cards from "../../components/cards/Cards";
import NavBar from "../../components/navBar/NavBar";
import Styles from "../../views/home/home.styles.module.css";
// import Pagination from "../../components/pagination/pagination";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonsAction } from "../../redux/action";

function Home() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);

  useEffect(() => {
    dispatch(getPokemonsAction());
    // return(()=>{
    //   clearAll()
    // })
  }, [dispatch]);

  return (
    <div className={Styles.home_container}>
      <NavBar />
      <h1>estas en el home</h1>
      <Cards />
      {/* <Pagination /> */}
    </div>
  );
}

export default Home;
