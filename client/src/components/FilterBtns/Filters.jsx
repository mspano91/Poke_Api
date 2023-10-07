import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPokemonTypes } from "../../redux/action";
import { useEffect } from "react";
import {
  filterTypes,
  orderpokemons,
  resetAllPokemons,
  orderpokemonsByid,
  orderpokemonsByAtack,
} from "../../redux/action";

export default function Filters() {
  const types = useSelector((state) => state.types);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemonTypes());
  }, []);

  const handleOrder = (event) => {
    dispatch(orderpokemons(event.target.value));
  };

  const handleOrderById = (event) => {
    dispatch(orderpokemonsByid(event.target.value));
  };

  const handleFilter = (event) => {
    dispatch(filterTypes(event.target.value));
  };

  const HandlerReset = () => {
    dispatch(resetAllPokemons());
  };

  const handleOrderByAtack = (event) => {
    dispatch(orderpokemonsByAtack(event.target.value));
  };
  return (
    <div>
      <button onClick={HandlerReset}>clear</button>

      {/* ordenamiento creciente y decreciente */}
      <select name="order" id="" onChange={handleOrder}>
        {[
          { name: "name incre", value: "I" },
          { name: "name decre", value: "D" },
        ].map((order) => (
          <option key={order.name} value={order.value}>
            {order.name}
          </option>
        ))}
      </select>

      {/* ordenamiento creciente y decreciente POR ID */}
      <select name="order" id="" onChange={handleOrderById}>
        {[
          { name: "ID incre", value: "Y" },
          { name: "ID decre", value: "D" },
        ].map((order) => (
          <option key={order.name} value={order.value}>
            {order.name}
          </option>
        ))}
      </select>

      {/* ordenamiento creciente y decreciente POR atack */}
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
