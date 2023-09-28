const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon";

// controllers/pokemonController.js
const getPokemon = async () => {
  // Lógica para obtener todos los pokemones
  try {
    const response = await axios(URL);
    const pokemonList = response.data.results;
    if (!pokemonList.length) {
      throw new Error("No Pokémon found in en GetPokemon controller");
    }
    return pokemonList;
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//llama por id y name
const getPokemon_ById = async (id) => {
  // Lógica para traer pokemon por id
  try {
    const { data } = await axios(`${URL}/${id}`);
    const { name, height, types, weight, stats, abilities, sprites } = data;
    const typesArray = types.map((type) => type.type.name);
    if (name) {
      const pokemonFound = {
        name,
        height,
        weight,
        type: typesArray,
        hp: stats[0]?.base_stat,
        skills: abilities[0]?.ability.name,
        image: sprites?.back_default,
      };
      return pokemonFound;
    } else {
      return res.status(404).json("this pokemon does not exist");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// Exporta las funciones para su uso en las rutas
module.exports = {
  getPokemon,
  getPokemon_ById,
};
