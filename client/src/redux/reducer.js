import { GET_ALL_POKEMONS, GET_POKEMONS_ERROR } from "./action";

let initialState = { pokemons: [], error: null };

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
    default:
      return state;
  }
};

export default Reducer;
