import {
  GET_ALL_POKEMONS,
  GET_POKEMONS_ERROR,
  GET_POKEMON_DETAIL,
  GET_POKEMON_TYPES,
  POST_NEW_POKEMON,
  DELETE_POKEMON,
  GET_POKEMON_NAV,
  RESET_POKEMONS,
} from "./action";

let initialState = {
  pokemons: [],
  error: null,
  pokemonDetails: {},
  types: [],
  pokemonsCopy: [],
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        pokemonsCopy: action.payload,
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
    case GET_POKEMON_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case POST_NEW_POKEMON:
      return {
        ...state,
        pokemons: [...state.pokemons, action.payload],
        pokemonsCopy: [...state.pokemons, action.payload],

        error: null,
      };

    case DELETE_POKEMON:
      return {
        ...state,
        pokemons: state.pokemons.filter((el) => el.id !== action.payload),
        pokemonsCopy: state.pokemons.filter((el) => el.id !== action.payload),
        //el payload me trae el id del que elimine
        error: null,
      };
    case GET_POKEMON_NAV:
      return {
        ...state,
        pokemons: [action.payload],
      };

    case RESET_POKEMONS:
      return {
        ...state,
        pokemons: state.pokemonsCopy,
      };
    default:
      return state;
  }
};

export default Reducer;
