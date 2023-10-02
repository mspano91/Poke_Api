import axios from "axios";

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_POKEMONS_ERROR = "GET_POKEMONS_ERROR";

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
        payload: error.message, // Puedes ajustar esto según tus necesidades
      });
    }
  };
};

//el action lo llamamos en el useState del home para conectar el back con el front
