import React from "react";
import Styles from "../FilterBtns/filter.styles.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getPokemonTypes } from "../../redux/action";
import { useEffect } from "react";
import {
  filterTypes,
  orderpokemons_ByName,
  resetAllPokemons,
  // orderPokemons_Byid,
  orderPokemons_ByAtack,
  orderPokemon_ByOrigin,
} from "../../redux/action";

export default function Filters() {
  const types = useSelector((state) => state.types);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemonTypes());
  }, []);

  const handleOrder_ByName = (event) => {
    dispatch(orderpokemons_ByName(event.target.value));
  };

  // const handleOrderById = (event) => {
  //   dispatch(orderPokemons_Byid(event.target.value));
  // };

  const handleFilter = (event) => {
    dispatch(filterTypes(event.target.value));
  };

  const HandlerReset = () => {
    dispatch(resetAllPokemons());
  };

  const handleOrderByAtack = (event) => {
    dispatch(orderPokemons_ByAtack(event.target.value));
  };

  const HandlePokemon_ByOrigin = (event) => {
    dispatch(orderPokemon_ByOrigin(event.target.value));
  };
  return (
    <div className={Styles.filters}>
      <button onClick={HandlerReset}>clear</button>

      {/* ordenamiento creciente y decreciente */}
      <select name="order" id="" onChange={handleOrder_ByName}>
        {[
          { name: "Name +", value: "I" },
          { name: "Name -", value: "D" },
        ].map((order) => (
          <option key={order.name} value={order.value}>
            {order.name}
          </option>
        ))}
      </select>
      {/* 
      ordenamiento creciente y decreciente POR ID
      <select name="order" id="" onChange={handleOrderById}>
        {[
          { name: "ID +", value: "Y" },
          { name: "ID -", value: "D" },
        ].map((order) => (
          <option key={order.name} value={order.value}>
            {order.name}
          </option>
        ))}
      </select> */}

      {/* ordenamiento creciente y decreciente POR attack */}
      <select name="order" id="" onChange={handleOrderByAtack}>
        {[
          { name: "Atack +", value: "X" },
          { name: "Atack -", value: "D" },
        ].map((order) => (
          <option key={order.name} value={order.value}>
            {order.name}
          </option>
        ))}
      </select>

      {/* ordenamiento creciente y decreciente through API o DB */}
      <select name="order" id="" onChange={HandlePokemon_ByOrigin}>
        {[
          { name: "PokeApi", value: "Number" },
          { name: "Data base", value: "String" },
        ].map((order) => (
          <option key={order.name} value={order.value}>
            {order.name}
          </option>
        ))}
      </select>

      {/* ordenamiento por tipos */}
      <select name="types" id="" onChange={handleFilter}>
        <option value="">types</option>

        {types.map((type) => (
          <option key={type.id} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>
    </div>
  );
}
