import { useNavigate } from "react-router-dom";
import Styles from "./navBar.styles.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonBy_nav } from "../../redux/action";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchState, setSearchState] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getPokemonBy_nav(searchState));
  };

  const handleInput = (event) => {
    setSearchState(event.target.value); // Actualiza el estado con el valor del input
  };

  return (
    <div className={Styles.searchContainer}>
      <img onClick={() => navigate(`/`)} src="/assets/pokedex.png" alt="" />
      <form onSubmit={handleSubmit} className={Styles.form}>
        <input
          type="text"
          value={searchState}
          onChange={handleInput}
          placeholder="    Search your pokemon"
        />
        <button className={Styles.btn}>Search</button>

        <button onClick={() => navigate(`/create`)} className={Styles.btn}>
          Create
        </button>
      </form>
    </div>
  );
}
