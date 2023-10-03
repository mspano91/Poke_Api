import {
  GET_ALL_POKEMONS,
  GET_POKEMONS_ERROR,
  GET_POKEMON_DETAIL,
} from "./action";

let initialState = { pokemons: [], error: null, pokemonDetails: {} };

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        error: null,
      };
    case GET_POKEMONS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case GET_POKEMON_DETAIL:
      return {
        ...state,
        pokemonDetails: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
