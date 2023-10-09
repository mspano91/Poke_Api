import axios from "axios";

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_POKEMONS_ERROR = "GET_POKEMONS_ERROR";
export const GET_POKEMON_DETAIL = "GET_POKEMON_DETAIL";
export const GET_POKEMON_TYPES = "GET_POKEMON_TYPES";
export const POST_NEW_POKEMON = "POST_NEW_POKEMON";
export const DELETE_POKEMON = "DELETE_POKEMON";
export const GET_POKEMON_NAV = "GET_POKEMON_NAV";
export const RESET_POKEMONS = "RESET_POKEMONS";
export const ORDER_POKEMONS = "RDER_POKEMONS";
export const FILTER_TYPES = "FILTER_TYPES";
export const ORDER_POKEMONS_By_Id = "ORDER_POKEMONS_By_Id";
export const ORDER_POKEMONS_By_Atack = "ORDER_POKEMONS_By_Atack";
export const ORDER_POKEMONS_By_Origin = "ORDER_POKEMONS_By_Origin";

export const getPokemonsAction = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios("/pokemon");
      //seteamos la url en app,
      //entonces poniendo /pokemon conecta con el back
      return dispatch({
        type: GET_ALL_POKEMONS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_POKEMONS_ERROR,
        payload: console.log("no anda el action de getPokemonsAction"), // Puedes ajustar esto según tus necesidades
      });
    }
  };
};

export const getPokemonDetail = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`/pokemon/${id}`);
      return dispatch({
        type: GET_POKEMON_DETAIL,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_POKEMONS_ERROR,
        payload: console.log("no anda el action de getPokemonDetail"), // Puedes ajustar esto según tus necesidades
      });
    }
  };
};

export const getPokemonBy_nav = (name) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/pokemon/nav/${name}`);
      return dispatch({
        type: GET_POKEMON_NAV,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      return {
        type: GET_POKEMONS_ERROR,
        payload: alert("this pokemon does not exist"), // Puedes ajustar esto según tus necesidades
      };
    }
  };
};

//el action lo llamamos en el useState del home para conectar el back con el front

export const getPokemonTypes = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`/type`);
      return dispatch({
        type: GET_POKEMON_TYPES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_POKEMONS_ERROR,
        payload: console.log("no anda el action de GetTypes"),
      });
    }
  };
};

export const postNewPokemon = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/pokemon/create`, formData);
      console.log(data);
      return dispatch({
        type: POST_NEW_POKEMON,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_POKEMONS_ERROR,
        payload: console.log("no anda el action de postNewPokemon"),
      });
    }
  };
};

export const deletePokemon = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/pokemon/delete/${id}`);
      return dispatch({
        type: DELETE_POKEMON,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_POKEMONS_ERROR,
        payload: console.log("no anda el action de deletePokemon"), // Puedes ajustar esto según tus necesidades
      });
    }
  };
};

export const resetAllPokemons = () => {
  return {
    type: RESET_POKEMONS,
  };
};

export const filterTypes = (name) => {
  return {
    type: FILTER_TYPES,
    payload: name,
  };
};

export const orderpokemons_ByName = (order) => {
  return { type: ORDER_POKEMONS, payload: order };
};

export const orderPokemons_Byid = (order) => {
  return { type: ORDER_POKEMONS_By_Id, payload: order };
};

export const orderPokemons_ByAtack = (order) => {
  return { type: ORDER_POKEMONS_By_Atack, payload: order };
};

export const orderPokemon_ByOrigin = (order) => {
  return {
    type: ORDER_POKEMONS_By_Origin,
    payload: order,
  };
};
