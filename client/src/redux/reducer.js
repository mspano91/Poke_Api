import {
  GET_ALL_POKEMONS,
  GET_POKEMONS_ERROR,
  GET_POKEMON_DETAIL,
  GET_POKEMON_TYPES,
  POST_NEW_POKEMON,
  DELETE_POKEMON,
  GET_POKEMON_NAV,
  RESET_POKEMONS,
  FILTER_TYPES,
  ORDER_POKEMONS,
  ORDER_POKEMONS_By_Id,
  ORDER_POKEMONS_By_Atack,
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
    case FILTER_TYPES:
      const backup = [...state.pokemonsCopy];
      return {
        ...state,
        pokemons: backup.filter((el) =>
          el.types.some((tipo) => tipo.name === action.payload)
        ),
      };
    case ORDER_POKEMONS:
      const allOrder = [...state.pokemons];
      return {
        ...state,
        pokemons:
          action.payload === "I"
            ? allOrder.sort((a, b) => a.name.localeCompare(b.name))
            : allOrder.sort((a, b) => b.name.localeCompare(a.name)),
      };
    case ORDER_POKEMONS_By_Id:
      const allbyID = [...state.pokemons];
      return {
        ...state,
        pokemons:
          action.payload === "Y"
            ? allbyID.sort((a, b) => a.id - b.id)
            : allbyID.sort((a, b) => b.id - a.id),
      };
    case ORDER_POKEMONS_By_Atack:
      const allbyAtack = [...state.pokemons];
      console.log(allbyAtack);
      return {
        ...state,
        pokemons:
          action.payload === "X"
            ? allbyAtack.sort((a, b) => b.atack - a.atack)
            : allbyAtack.sort((a, b) => a.atack - b.atack),
      };
    default:
      return state;
  }
};

export default Reducer;
